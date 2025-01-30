import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import globalStyles from "../../App.module.sass";
import modalStyles from "../Modal.module.sass";
import styles from "./employersModal.module.sass";

import { initEmployee } from "../../types/employee/initEmployee";

import { Close as CloseIcon } from "../../assets/svgComponents/Close";

interface IAddEmployeeModalProps {
  isShow: boolean;
  onCancel: Function;
  onSave: Function;
  onClose: Function;
}

export const AddEmployeeModal: React.FC<IAddEmployeeModalProps> = ({
  isShow,
  onCancel,
  onSave,
  onClose,
}) => {
  const { t } = useTranslation();
  const [currentEmployee, setCurrentEmployee] = useState(initEmployee());

  return (
    <div className={`${modalStyles.modal} ${isShow ? modalStyles.active : ""}`}>
      <div
        className={`${modalStyles.overlay} ${isShow ? modalStyles.active : ""}`}
        onClick={() => onClose()}
      />
      <div className={`${modalStyles.modal_content} ${styles.modal_content}`}>
        <div className={modalStyles.head}>
          <h4>{t("employers.adding_employee")}</h4>
          <div className={modalStyles.close} onClick={() => onClose()}>
            <CloseIcon />
          </div>
        </div>
        <div className={styles.employers_container}>
          <div className={styles.employers_content}>
            <form>
              <div className={styles.form_info}>
                {t("employers.adding_description")}
              </div>
              <input
                placeholder={"E-mail"}
                type="text"
                required
                onChange={(event) =>
                  setCurrentEmployee({
                    ...currentEmployee,
                    email: event.target.value.trim(),
                  })
                }
                value={currentEmployee.email}
              />
              <input
                placeholder={t("employers.post")}
                type="text"
                required
                onChange={(event) =>
                  setCurrentEmployee({
                    ...currentEmployee,
                    profession: event.target.value.trim(),
                  })
                }
                value={currentEmployee.profession}
                maxLength={56}
              />
              <div
                className={styles.role_length}
              >{`${currentEmployee.profession == undefined ? 0 : currentEmployee.profession.length}/56`}</div>
            </form>
          </div>
        </div>
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
            <button
              className={globalStyles.small}
              type="button"
              onClick={() => onSave(currentEmployee)}
            >
              <span>{t("employers.add_employee")}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
