import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import { UserCard } from "../../cards/user/UserCard";
import { MultiCheckbox } from "../../components/checkbox/MultiCheckbox";

import globalStyles from "../../App.module.sass";
import modalStyles from "../Modal.module.sass";
import styles from "./AmbassadorsModal.module.sass";

import { IUser } from "../../types/user/user";
import { CheckboxState } from "../../enums/local/checkboxState";

import { Close as CloseIcon } from "../../assets/svgComponents/Close";

interface IEditAmbassadorRequestsModalProps {
  isShow: boolean;
  onClose: Function;
}

export const EditAmbassadorRequestsModal: React.FC<
  IEditAmbassadorRequestsModalProps
> = ({ isShow, onClose }) => {
  const { t } = useTranslation();
  const { acceptAmbassador } = useActions();
  const ambassadorRequests = useTypedSelector(
    (state) => state.ambassadorReducer.ambassadorRequestList,
  );
  const [currentRequests, setCurrentRequests] = useState(ambassadorRequests);

  useEffect(() => {
    const contentDiv = document.getElementById(
      "edit_ambassador_requests_content",
    );
    contentDiv?.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentRequests(ambassadorRequests);
  }, [isShow]);

  function acceptAmbassadors(requests: IUser[]) {
    requests.forEach((ambassador: IUser) =>
      acceptAmbassador({ ambassadorId: ambassador.id, isAccept: true }),
    );
  }

  function cancelAmbassadors(requests: IUser[]) {
    requests.forEach((ambassador: IUser) =>
      acceptAmbassador({ ambassadorId: ambassador.id, isAccept: false }),
    );
  }

  return (
    <div className={`${modalStyles.modal} ${isShow ? modalStyles.active : ""}`}>
      <div
        className={`${modalStyles.overlay} ${isShow ? modalStyles.active : ""}`}
        onClick={() => onClose()}
      />
      <div className={`${modalStyles.modal_content} ${styles.modal_content}`}>
        <div className={modalStyles.head}>
          <h4>{t("ambassadors.requests_for_ambassadorship")}</h4>
          <div className={modalStyles.close} onClick={() => onClose()}>
            <CloseIcon />
          </div>
        </div>
        <div className={styles.ambassadors_container}>
          <div
            className={styles.ambassadors_content}
            id="edit_ambassador_requests_content"
          >
            <div className={styles.ambassadors_selector}>
              <div className={styles.checkbox}>
                <MultiCheckbox
                  checkboxState={
                    currentRequests.filter(
                      (ambassador: IUser) => ambassador.isSelected,
                    ).length === 0
                      ? CheckboxState.NotChecked
                      : currentRequests.filter(
                            (ambassador: IUser) => ambassador.isSelected,
                          ).length === currentRequests.length
                        ? CheckboxState.AllChecked
                        : CheckboxState.AnyChecked
                  }
                  onChangeStatus={(status: CheckboxState) =>
                    setCurrentRequests(
                      currentRequests.map((tmpItem) => {
                        return {
                          ...tmpItem,
                          isSelected: status === CheckboxState.AllChecked,
                        };
                      }),
                    )
                  }
                />
              </div>
              {t("global.select_all")}
            </div>
            {currentRequests.map((ambassador: IUser, index: number) => (
              <div className={styles.ambassador_item} key={index}>
                <UserCard
                  userItem={ambassador}
                  isCheckedItem={true}
                  isRequestItem={true}
                  onCheckedChange={(status: boolean) =>
                    setCurrentRequests(
                      currentRequests.map((tmpAmbassador: IUser) => {
                        if (tmpAmbassador.id === ambassador.id) {
                          return { ...tmpAmbassador, isSelected: status };
                        } else {
                          return tmpAmbassador;
                        }
                      }),
                    )
                  }
                  onCancelRequest={() =>
                    acceptAmbassador({
                      ambassadorId: ambassador.id,
                      isAccept: false,
                    })
                  }
                  onAcceptRequest={() =>
                    acceptAmbassador({
                      ambassadorId: ambassador.id,
                      isAccept: true,
                    })
                  }
                />
              </div>
            ))}
          </div>
        </div>
        <div className={modalStyles.actions}>
          <div
            className={styles.selected_count}
          >{`${currentRequests.filter((ambassador: IUser) => ambassador.isSelected).length} ${t("global.selected")}`}</div>
          <div className={modalStyles.buttons}>
            <button
              className={`${globalStyles.small} ${globalStyles.inverted}`}
              type="button"
              disabled={
                currentRequests.filter(
                  (ambassador: IUser) => ambassador.isSelected,
                ).length === 0
              }
              onClick={() =>
                cancelAmbassadors(
                  currentRequests.filter(
                    (ambassador: IUser) => ambassador.isSelected,
                  ),
                )
              }
            >
              <span>{t("ambassadors.reject")}</span>
            </button>
            <button
              className={globalStyles.small}
              type="button"
              disabled={
                currentRequests.filter(
                  (ambassador: IUser) => ambassador.isSelected,
                ).length === 0
              }
              onClick={() =>
                acceptAmbassadors(
                  currentRequests.filter(
                    (ambassador: IUser) => ambassador.isSelected,
                  ),
                )
              }
            >
              <span>{t("ambassadors.approve")}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
