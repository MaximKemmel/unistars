import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { UserCard } from "../../cards/user/UserCard";
import { Checkbox } from "../../components/checkbox/Checkbox";

import globalStyles from "../../App.module.sass";
import modalStyles from "../Modal.module.sass";
import styles from "./employersModal.module.sass";

import { employeeRights } from "../../data/employeeRights";

import { IUser } from "../../types/user/user";
import { IEmployeeRight } from "../../types/employee/employeeRight";

import { Close as CloseIcon } from "../../assets/svgComponents/Close";

interface IEditEmployeeRightsModalProps {
  isShow: boolean;
  employee: IUser;
  onSave: Function;
  onClose: Function;
}

export const EditEmployeeRightsModal: React.FC<
  IEditEmployeeRightsModalProps
> = ({ isShow, employee, onSave, onClose }) => {
  const { i18n, t } = useTranslation();
  const [currentEmployee, setCurrentEmployee] = useState(employee);

  useEffect(() => {
    setCurrentEmployee(employee);
    if (
      currentEmployee.permissions === undefined &&
      !Array.isArray(currentEmployee.permissions)
    ) {
      setCurrentEmployee({ ...employee, permissions: [] });
    }
  }, [isShow]);

  return (
    <div className={`${modalStyles.modal} ${isShow ? modalStyles.active : ""}`}>
      <div
        className={`${modalStyles.overlay} ${isShow ? modalStyles.active : ""}`}
        onClick={() => onClose()}
      />
      <div className={`${modalStyles.modal_content} ${styles.modal_content}`}>
        <div className={modalStyles.head}>
          <h4>{t("employers.employees_rights_settings")}</h4>
          <div className={modalStyles.close} onClick={() => onClose()}>
            <CloseIcon />
          </div>
        </div>
        <div className={styles.employers_container}>
          <div className={styles.employers_content}>
            <div className={`${styles.employer_item} ${styles.bordered}`}>
              <UserCard userItem={employee} />
            </div>
            <div className={styles.rights_options}>
              {employeeRights.map((right: IEmployeeRight, index: number) => (
                <div className={styles.rights_option} key={index}>
                  <div className={styles.checkbox}>
                    {currentEmployee.permissions != undefined &&
                    Array.isArray(currentEmployee.permissions) ? (
                      <Checkbox
                        isChecked={
                          currentEmployee.permissions.filter(
                            (tmpRight: string) => tmpRight === right.type,
                          ).length > 0
                        }
                        onChangeStatus={(status: boolean) =>
                          setCurrentEmployee({
                            ...currentEmployee,
                            permissions: status
                              ? currentEmployee.permissions?.length === 0
                                ? [right.type]
                                : [...currentEmployee.permissions!, right.type]
                              : currentEmployee.permissions?.filter(
                                  (tmpRight: string) => tmpRight !== right.type,
                                )!,
                          })
                        }
                      />
                    ) : null}
                  </div>
                  {i18n.resolvedLanguage === "ru"
                    ? right.name
                    : right.nameEnglish}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={modalStyles.actions}>
          <div />
          <div className={modalStyles.buttons}>
            <button
              className={`${globalStyles.small} ${globalStyles.inverted}`}
              type="button"
              onClick={() => onClose()}
            >
              <span>{t("global.cancel")}</span>
            </button>
            <button
              className={globalStyles.small}
              type="button"
              onClick={() => onSave(currentEmployee)}
            >
              <span>{t("global.save_changes")}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
