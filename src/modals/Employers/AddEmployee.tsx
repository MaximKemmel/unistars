import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import validator from "validator";

import { Input } from "../../components/input/Input";

import globalStyles from "../../App.module.sass";
import modalStyles from "../Modal.module.sass";
import styles from "./EmployersModal.module.sass";

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
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    setIsButtonEnabled(
      currentEmployee.email.trim().length > 0 &&
        validator.isEmail(currentEmployee.email.trim()) &&
        currentEmployee.profession!.trim().length > 0,
    );
  }, [currentEmployee]);

  return (
    <div className={`${modalStyles.modal} ${isShow ? modalStyles.active : ""}`}>
      <div
        className={`${modalStyles.overlay} ${isShow ? modalStyles.active : ""}`}
        onClick={() => onClose()}
      />
      <div className={modalStyles.modal_content}>
        <div className={modalStyles.head}>
          <h4>{t("employers.adding_employee")}</h4>
          <div className={modalStyles.close} onClick={() => onClose()}>
            <CloseIcon />
          </div>
        </div>
        <form className={modalStyles.form}>
          <div className={modalStyles.form_content}>
            <div className={modalStyles.part_container}>
              <div className={styles.description}>
                {t("employers.adding_description")}
              </div>
              <div className={modalStyles.part}>
                <div className={modalStyles.input}>
                  <Input
                    value={currentEmployee.email}
                    onChange={(value: string) =>
                      setCurrentEmployee({
                        ...currentEmployee,
                        email: value.trim(),
                      })
                    }
                    placeholder={"E-mail"}
                    type="text"
                    isRequired={true}
                  />
                </div>
                <div className={modalStyles.input}>
                  <Input
                    value={currentEmployee.profession ?? ""}
                    onChange={(value: string) =>
                      setCurrentEmployee({
                        ...currentEmployee,
                        profession: value.trim(),
                      })
                    }
                    placeholder={t("employers.post")}
                    type="text"
                    isRequired={true}
                    maxLength={56}
                  />
                </div>
                <div
                  className={styles.role_length}
                >{`${currentEmployee.profession == undefined ? 0 : currentEmployee.profession.length}/56`}</div>
              </div>
            </div>
          </div>
        </form>
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
              disabled={!isButtonEnabled}
            >
              <span>{t("employers.add_employee")}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
