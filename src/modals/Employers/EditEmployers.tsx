import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useTypedSelector } from "../../hooks/useTypedSelector";

import { UserCard } from "../../cards/user/UserCard";
import { MultiCheckbox } from "../../components/checkbox/MultiCheckbox";

import globalStyles from "../../App.module.sass";
import modalStyles from "../Modal.module.sass";
import styles from "./EmployersModal.module.sass";

import { IUser } from "../../types/user/user";
import { CheckboxState } from "../../enums/local/checkboxState";

import { Close as CloseIcon } from "../../assets/svgComponents/Close";
import { Trash as TrashIcon } from "../../assets/svgComponents/Trash";

interface IEditEmployersModalProps {
  isShow: boolean;
  onDelete: Function;
  onCancel: Function;
  onClose: Function;
}

export const EditEmployersModal: React.FC<IEditEmployersModalProps> = ({
  isShow,
  onDelete,
  onCancel,
  onClose,
}) => {
  const { t } = useTranslation();
  const employers = useTypedSelector(
    (state) => state.employeeReducer.employeeList,
  );
  const [currentEmployers, setCurrentEmployers] = useState(employers);

  useEffect(() => {
    setCurrentEmployers(employers);
  }, [employers]);

  return (
    <div className={`${modalStyles.modal} ${isShow ? modalStyles.active : ""}`}>
      <div
        className={`${modalStyles.overlay} ${isShow ? modalStyles.active : ""}`}
        onClick={() => onClose()}
      />
      <div className={`${modalStyles.modal_content} ${styles.modal_content}`}>
        <div className={modalStyles.head}>
          <h4>{t("employers.employers")}</h4>
          <div className={modalStyles.close} onClick={() => onClose()}>
            <CloseIcon />
          </div>
        </div>
        {isShow ? (
          <div className={styles.employers_container}>
            <div className={styles.employers_content}>
              <div className={styles.employers_selector}>
                <div className={styles.checkbox}>
                  <MultiCheckbox
                    checkboxState={
                      currentEmployers.filter(
                        (employee: IUser) => employee.isSelected,
                      ).length === 0
                        ? CheckboxState.NotChecked
                        : currentEmployers.filter(
                              (employee: IUser) => employee.isSelected,
                            ).length === currentEmployers.length
                          ? CheckboxState.AllChecked
                          : CheckboxState.AnyChecked
                    }
                    onChangeStatus={(status: CheckboxState) =>
                      setCurrentEmployers(
                        currentEmployers.map((employee: IUser) => {
                          return {
                            ...employee,
                            isSelected: status === CheckboxState.AllChecked,
                          };
                        }),
                      )
                    }
                  />
                </div>
                {t("global.select_all")}
              </div>
              {currentEmployers.map((employee: IUser, index: number) => (
                <div className={styles.employer_item} key={index}>
                  <UserCard
                    userItem={employee}
                    isCheckedItem={true}
                    onCheckedChange={(status: boolean) =>
                      setCurrentEmployers(
                        currentEmployers.map((tmpEmployee: IUser) => {
                          if (tmpEmployee.id === employee.id) {
                            return { ...tmpEmployee, isSelected: status };
                          } else {
                            return tmpEmployee;
                          }
                        }),
                      )
                    }
                  />
                </div>
              ))}
            </div>
            <div className={styles.bottom_actions}>
              <div
                className={styles.selected_count}
              >{`${currentEmployers.filter((employee: IUser) => employee.isSelected).length} ${t("global.selected")}`}</div>
              <button
                className={`${globalStyles.inverted} ${globalStyles.small} ${globalStyles.delete}`}
                type="button"
                disabled={
                  currentEmployers.filter(
                    (employee: IUser) => employee.isSelected,
                  ).length === 0
                }
                onClick={() => onDelete()}
              >
                <TrashIcon
                  isDisabled={
                    currentEmployers.filter(
                      (employee: IUser) => employee.isSelected,
                    ).length === 0
                  }
                />
                {t("global.delete")}
              </button>
            </div>
          </div>
        ) : null}
        <div className={modalStyles.actions}>
          <div />
          <div className={modalStyles.buttons}>
            <button
              className={`${globalStyles.small} ${globalStyles.inverted}`}
              type="button"
              onClick={() => onCancel()}
            >
              <span>{t("global.cancel")}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
