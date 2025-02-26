import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import { AddEmployeeModal } from "../../../../modals/Employers/AddEmployee";
import { EditEmployeeRightsModal } from "../../../../modals/Employers/EditEmployeeRights";
import { EditEmployersModal } from "../../../../modals/Employers/EditEmployers";
import { EmployersModal } from "../../../../modals/Employers/Employers";
import { ConfirmDeleteModal } from "../../../../modals/ConfirmDelete/ConfirmDelete";
import { StatusInfoModal } from "../../../../modals/StatusInfo/StatusInfo";

import styles from "../../Home.module.sass";

import { initEmployee } from "../../../../types/employee/initEmployee";
import { IUser } from "../../../../types/user/user";
import { ApiStatusType } from "../../../../enums/local/apiStatusType";
import { initApiStatus } from "../../../../types/local/apiStatus";

export const EmployersContainer = () => {
  const { t } = useTranslation();
  const { getEmployeeList, postEmployee, setPostEmployeeStatus } = useActions();
  const employers = useTypedSelector(
    (state) => state.employeeReducer.employeeList,
  );
  const postEmployeeStatus = useTypedSelector(
    (state) => state.employeeReducer.postStatus,
  );
  const [deletedEmployers, setDeletedEmployers] = useState([] as IUser[]);
  const [isEmployersModalShow, setIsEmployersModalShow] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState(initEmployee());
  const [isEditEmployersModalShow, setIsEditEmployersModalShow] =
    useState(false);
  const [isEditEmployeeRightsModalShow, setIsEditEmployeeRightsModalShow] =
    useState(false);
  const [isAddEmployeeModalShow, setIsAddEmployeeModalShow] = useState(false);
  const [isConfirmDeleteModalShow, setIsConfirmDeleteModalShow] =
    useState(false);
  const [isStatusInfoModalShow, setIsStatusInfoModalShow] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isStatusSuccess, setIsStatusSuccess] = useState(true);
  const [isStatusRestore, setIsStatusRestore] = useState(false);

  useEffect(() => {
    switch (postEmployeeStatus.status) {
      case ApiStatusType.SUCCESS:
        setPostEmployeeStatus(initApiStatus());
        setIsAddEmployeeModalShow(false);
        getEmployeeList();
        setIsEmployersModalShow(true);
        setStatusMessage(t("employers.employee_was_added"));
        setIsStatusInfoModalShow(true);
        setIsStatusSuccess(true);
        setIsStatusRestore(false);
        break;
    }
  }, [postEmployeeStatus]);

  const handleOnDeleteEmployers = (employersForDelete: IUser[]) => {
    setDeletedEmployers(employersForDelete);
    console.log(deletedEmployers);
    setIsEditEmployersModalShow(false);
    setIsConfirmDeleteModalShow(true);
  };

  const handleOnConfirmDeleteEmployers = () => {
    setIsConfirmDeleteModalShow(false);
    setIsStatusInfoModalShow(true);
  };

  return (
    <>
      <div
        className={styles.main_socials_item}
        onClick={() => setIsEmployersModalShow(true)}
      >
        <div className={styles.item_value}>{employers.length}</div>
        <div className={styles.item_label}>{t("home.employers")}</div>
      </div>
      <EmployersModal
        isShow={isEmployersModalShow}
        onEdit={() => {
          setIsEmployersModalShow(false);
          setIsEditEmployersModalShow(true);
        }}
        onAdd={() => {
          setIsEmployersModalShow(false);
          setIsAddEmployeeModalShow(true);
        }}
        onEditRights={(employee: IUser) => {
          setEditedEmployee(employee);
          setIsEmployersModalShow(false);
          setIsEditEmployeeRightsModalShow(true);
        }}
        onClose={() => {
          setIsEmployersModalShow(false);
        }}
      />
      <EditEmployersModal
        isShow={isEditEmployersModalShow}
        onDelete={handleOnDeleteEmployers}
        onCancel={() => {
          setIsEditEmployersModalShow(false);
          setIsEmployersModalShow(true);
        }}
        onClose={() => setIsEditEmployersModalShow(false)}
      />
      <EditEmployeeRightsModal
        isShow={isEditEmployeeRightsModalShow}
        employee={editedEmployee}
        onSave={() => {
          setIsEditEmployeeRightsModalShow(false);
          setIsEmployersModalShow(true);
        }}
        onClose={() => setIsEditEmployeeRightsModalShow(false)}
      />
      <AddEmployeeModal
        isShow={isAddEmployeeModalShow}
        onCancel={() => {
          setIsAddEmployeeModalShow(false);
          setIsEmployersModalShow(true);
        }}
        onSave={(employee: IUser) => postEmployee({ employee: employee })}
        onClose={() => setIsAddEmployeeModalShow(false)}
      />
      <ConfirmDeleteModal
        isShow={isConfirmDeleteModalShow}
        head={t("employers.deleting_employers")}
        title={t("employers.delete_description")}
        message={""}
        onConfirm={handleOnConfirmDeleteEmployers}
        onClose={() => {
          setIsConfirmDeleteModalShow(false);
          setIsEditEmployersModalShow(true);
        }}
      />
      <StatusInfoModal
        isShow={isStatusInfoModalShow}
        message={statusMessage}
        isSuccess={isStatusSuccess}
        onClose={() => setIsStatusInfoModalShow(false)}
        isRestore={isStatusRestore}
        onRestore={() => setIsStatusInfoModalShow(false)}
      />
    </>
  );
};
