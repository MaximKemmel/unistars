import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useTypedSelector } from "../../hooks/useTypedSelector";

import { UserCard } from "../../cards/user/UserCard";
import { MultiCheckbox } from "../../components/checkbox/MultiCheckbox";

import globalStyles from "../../App.module.sass";
import modalStyles from "../Modal.module.sass";
import styles from "./AmbassadorsModal.module.sass";

import { IUser } from "../../types/user/user";
import { CheckboxState } from "../../enums/local/checkboxState";

import { Close as CloseIcon } from "../../assets/svgComponents/Close";
import { Trash as TrashIcon } from "../../assets/svgComponents/Trash";

interface IEditAmbassadorsModalProps {
  isShow: boolean;
  onDelete: Function;
  onCancel: Function;
  onClose: Function;
}

export const EditAmbassadorsModal: React.FC<IEditAmbassadorsModalProps> = ({
  isShow,
  onDelete,
  onCancel,
  onClose,
}) => {
  const { t } = useTranslation();
  const ambassadors = useTypedSelector(
    (state) => state.ambassadorReducer.ambassadorList,
  );
  const [currentAmbassadors, setCurrentAmbassadors] = useState(ambassadors);

  useEffect(() => {
    setCurrentAmbassadors(ambassadors);
  }, [ambassadors]);

  return (
    <div className={`${modalStyles.modal} ${isShow ? modalStyles.active : ""}`}>
      <div
        className={`${modalStyles.overlay} ${isShow ? modalStyles.active : ""}`}
        onClick={() => onClose()}
      />
      <div className={`${modalStyles.modal_content} ${styles.modal_content}`}>
        <div className={modalStyles.head}>
          <h4>{t("ambassadors.ambassadors")}</h4>
          <div className={modalStyles.close} onClick={() => onClose()}>
            <CloseIcon />
          </div>
        </div>
        {isShow ? (
          <div className={styles.ambassadors_container}>
            <div
              className={styles.ambassadors_content}
              id="edit_ambassadors_content"
            >
              <div className={styles.ambassadors_selector}>
                <div className={styles.checkbox}>
                  <MultiCheckbox
                    checkboxState={
                      currentAmbassadors.filter(
                        (ambassador: IUser) => ambassador.isSelected,
                      ).length === 0
                        ? CheckboxState.NotChecked
                        : currentAmbassadors.filter(
                              (ambassador: IUser) => ambassador.isSelected,
                            ).length === currentAmbassadors.length
                          ? CheckboxState.AllChecked
                          : CheckboxState.AnyChecked
                    }
                    onChangeStatus={(status: CheckboxState) =>
                      setCurrentAmbassadors(
                        currentAmbassadors.map((ambassador: IUser) => {
                          return {
                            ...ambassador,
                            isSelected: status === CheckboxState.AllChecked,
                          };
                        }),
                      )
                    }
                  />
                </div>
                {t("global.select_all")}
              </div>
              {currentAmbassadors.map((ambassador: IUser, index: number) => (
                <div className={styles.ambassador_item} key={index}>
                  <UserCard
                    userItem={ambassador}
                    isCheckedItem={true}
                    onCheckedChange={(status: boolean) =>
                      setCurrentAmbassadors(
                        currentAmbassadors.map((tmpAmbassador: IUser) => {
                          if (tmpAmbassador.id === ambassador.id) {
                            return { ...tmpAmbassador, isSelected: status };
                          } else {
                            return tmpAmbassador;
                          }
                        }),
                      )
                    }
                  />
                </div>
              ))}
            </div>
            <div className={styles.bottom_actions}>
              <div className={styles.selected_count}>{`${
                currentAmbassadors.filter(
                  (ambassador: IUser) => ambassador.isSelected,
                ).length
              } ${t("global.selected")}`}</div>
              <button
                className={`${globalStyles.inverted} ${globalStyles.small} ${globalStyles.delete}`}
                type="button"
                disabled={
                  currentAmbassadors.filter(
                    (ambassador: IUser) => ambassador.isSelected,
                  ).length === 0
                }
                onClick={() =>
                  onDelete(
                    currentAmbassadors.filter(
                      (ambassador: IUser) => ambassador.isSelected,
                    ),
                  )
                }
              >
                <TrashIcon
                  isDisabled={
                    currentAmbassadors.filter(
                      (ambassador: IUser) => ambassador.isSelected,
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
