import React from "react";
import { useTranslation } from "react-i18next";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import { UserCard } from "../../cards/user/UserCard";

import globalStyles from "../../App.module.sass";
import modalStyles from "../Modal.module.sass";
import styles from "./AmbassadorsModal.module.sass";

import { IUser } from "../../types/user/user";

import { Close as CloseIcon } from "../../assets/svgComponents/Close";
import NothingFound from "../../assets/svg/nothing-found.svg";

interface IAmbassadorsModalProps {
  isShow: boolean;
  onAmbassadorsEdit: Function;
  onAmbassadorRequestsEdit: Function;
  onClose: Function;
}

export const AmbassadorsModal: React.FC<IAmbassadorsModalProps> = ({
  isShow,
  onAmbassadorsEdit,
  onAmbassadorRequestsEdit,
  onClose,
}) => {
  const { t } = useTranslation();
  const { acceptAmbassador } = useActions();
  const ambassadors = useTypedSelector(
    (state) => state.ambassadorReducer.ambassadorList,
  );
  const ambassadorRequests = useTypedSelector(
    (state) => state.ambassadorReducer.ambassadorRequestList,
  );

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
            <div className={styles.ambassadors_content}>
              {ambassadors.length + ambassadorRequests.length === 0 ? (
                <div className={modalStyles.empty_container}>
                  <img
                    className={modalStyles.empty_image}
                    src={NothingFound}
                    alt=""
                  />
                  <div className={modalStyles.empty_info}>
                    <div className={modalStyles.empty_title}>
                      {t("global.nothing_was_found")}
                    </div>
                    <div className={modalStyles.empty_description}>
                      {t("ambassadors.don_t_have_ambassadors")}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {ambassadorRequests.length > 0 ? (
                    <>
                      <div className={styles.head}>
                        <h4>
                          Заявки<span>{ambassadorRequests.length}</span>
                        </h4>
                        {ambassadorRequests.length > 3 ? (
                          <div
                            className={styles.head_action}
                            onClick={() => onAmbassadorRequestsEdit()}
                          >
                            {t("global.show_all")}
                          </div>
                        ) : null}
                      </div>
                      {ambassadorRequests
                        .slice(
                          0,
                          ambassadorRequests.length > 3
                            ? 3
                            : ambassadorRequests.length,
                        )
                        .map((ambassadorRequest: IUser, index: number) => (
                          <div className={styles.ambassador_item} key={index}>
                            <UserCard
                              userItem={ambassadorRequest}
                              isRequestItem={true}
                              onCancelRequest={() =>
                                acceptAmbassador({
                                  ambassadorId: ambassadorRequest.id!,
                                  isAccept: false,
                                })
                              }
                              onAcceptRequest={() =>
                                acceptAmbassador({
                                  ambassadorId: ambassadorRequest.id!,
                                  isAccept: true,
                                })
                              }
                            />
                          </div>
                        ))}
                      <div className={styles.ambassadors_separator} />
                    </>
                  ) : null}
                  <h4>
                    {t("ambassadors.ambassadors")}
                    <span>{ambassadors.length}</span>
                  </h4>
                  {ambassadors.map((ambassador: IUser, index: number) => (
                    <div className={styles.ambassador_item} key={index}>
                      <UserCard userItem={ambassador} />
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        ) : null}
        {ambassadors.length > 0 ? (
          <div className={modalStyles.actions}>
            <div />
            <button
              className={`${globalStyles.small} ${globalStyles.inverted}`}
              type="button"
              onClick={() => onAmbassadorsEdit()}
            >
              <span>{t("global.edit")}</span>
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
