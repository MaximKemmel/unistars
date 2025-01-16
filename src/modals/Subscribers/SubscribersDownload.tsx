import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import globalStyles from "../../App.module.sass";
import modalStyles from "../Modal.module.sass";
import styles from "./SubscribersModal.module.sass";

import { Close as CloseIcon } from "../../assets/svgComponents/Close";
import FileIcon from "../../assets/svg/file.svg";
import CheckIcon from "../../assets/svg/circled-check.svg";

interface ISubscribersDownloadModalProps {
  isShow: boolean;
  onClose: Function;
}

export const SubscribersDownloadModal: React.FC<ISubscribersDownloadModalProps> = ({ isShow, onClose }) => {
  const { t } = useTranslation();
  const [isLoadShow, setIsLoadShow] = useState(false);
  const [isLoadingSuccess, setIsLoadingSuccess] = useState(false);

  useEffect(() => {
    setIsLoadShow(false);
    setIsLoadingSuccess(false);
  }, [isShow]);

  return (
    <div className={`${modalStyles.modal} ${isShow ? modalStyles.active : ""}`}>
      <div className={`${modalStyles.overlay} ${isShow ? modalStyles.active : ""}`} onClick={() => onClose()} />
      <div className={`${modalStyles.modal_content} ${styles.modal_content}`}>
        <div className={modalStyles.head}>
          <h4>{t("subscribers.uploading_subscriber")}</h4>
          <div className={modalStyles.close} onClick={() => onClose()}>
            <CloseIcon />
          </div>
        </div>
        <div className={styles.subscribers_container}>
          <div className={styles.loading_content}>
            <div className={styles.loading_description}>{t("subscribers.loading_description")}</div>
            {isLoadShow ? (
              <>
                <div className={styles.loading_separator} />
                <div className={styles.loading_status}>
                  <div className={styles.loading_file}>
                    <img src={FileIcon} alt="" />
                    Subscribers.xlsx
                  </div>
                  {isLoadingSuccess ? (
                    <div className={`${styles.loading_progress} ${styles.success}`}>
                      <img src={CheckIcon} alt="" />
                      {t("global.sended")}
                    </div>
                  ) : (
                    <div className={`${styles.loading_progress} ${styles.error}`}>
                      {t("global.error")}
                      <CloseIcon fill="#C45F1C" isBold={true} />
                    </div>
                  )}
                </div>
              </>
            ) : null}
          </div>
        </div>
        <div className={modalStyles.actions}>
          {!isLoadShow ? (
            <>
              <div />
              <button className={globalStyles.small} type="button" onClick={() => setIsLoadShow(true)}>
                {t("subscribers.start_downloading")}
              </button>
            </>
          ) : (
            <>
              <div />
              {isLoadingSuccess ? (
                <button className={globalStyles.small} type="button" onClick={() => onClose()}>
                  {t("global.close")}
                </button>
              ) : (
                <button className={globalStyles.small} type="button" onClick={() => setIsLoadingSuccess(true)}>
                  {t("global.try_again")}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
