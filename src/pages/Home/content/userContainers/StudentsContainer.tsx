import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import { StudentsModal } from "../../../../modals/Students/Students";
import { EditStudentsModal } from "../../../../modals/Students/EditStudents";
import { ConfirmDeleteModal } from "../../../../modals/ConfirmDelete/ConfirmDelete";
import { StatusInfoModal } from "../../../../modals/StatusInfo/StatusInfo";

import styles from "../../Home.module.sass";

import { IUser } from "../../../../types/user/user";

export const StudentsContainer = () => {
  const { t } = useTranslation();
  const universityProfile = useTypedSelector(
    (state) => state.universityReducer.universityProfile,
  );
  const [deletedStudents, setDeletedStudents] = useState([] as number[]);
  const [isStudentsModalShow, setIsStudentsModalShow] = useState(false);
  const [isEditStudentsModalShow, setIsEditStudentsModalShow] = useState(false);
  const [isConfirmDeleteModalShow, setIsConfirmDeleteModalShow] =
    useState(false);
  const [isStatusInfoModalShow, setIsStatusInfoModalShow] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isStatusSuccess, setIsStatusSuccess] = useState(true);
  const [isStatusRestore, setIsStatusRestore] = useState(false);

  const handleOnDeleteStudents = (studentsForDelete: IUser[]) => {
    setDeletedStudents(studentsForDelete.map((student: IUser) => student.id!));

    console.log(deletedStudents);
    setStatusMessage(t("students.student_was_deleted"));
    setIsStatusSuccess(true);
    setIsStatusRestore(false);

    setIsEditStudentsModalShow(false);
    setIsConfirmDeleteModalShow(true);
  };

  const handleOnConfirmDeleteStudents = () => {
    setIsConfirmDeleteModalShow(false);
    setIsStatusInfoModalShow(true);
  };

  return (
    <>
      <div
        className={styles.main_socials_item}
        onClick={() => setIsStudentsModalShow(true)}
      >
        <div className={styles.item_value}>
          {universityProfile.studentIds !== undefined &&
          Array.isArray(universityProfile.studentIds)
            ? universityProfile.studentIds.length
            : 0}
        </div>
        <div className={styles.item_label}>{t("home.students")}</div>
      </div>

      <StudentsModal
        isShow={isStudentsModalShow}
        onEdit={() => {
          setIsStudentsModalShow(false);
          setIsEditStudentsModalShow(true);
        }}
        onClose={() => {
          setIsStudentsModalShow(false);
        }}
      />
      <EditStudentsModal
        isShow={isEditStudentsModalShow}
        onDelete={handleOnDeleteStudents}
        onCancel={() => {
          setIsEditStudentsModalShow(false);
          setIsStudentsModalShow(true);
        }}
        onClose={() => {
          setIsEditStudentsModalShow(false);
        }}
      />
      <ConfirmDeleteModal
        isShow={isConfirmDeleteModalShow}
        head={t("ambassadors.deleting_ambassadors")}
        title={t("ambassadors.delete_description")}
        message={""}
        onConfirm={handleOnConfirmDeleteStudents}
        onClose={() => {
          setIsConfirmDeleteModalShow(false);
          setIsEditStudentsModalShow(true);
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
