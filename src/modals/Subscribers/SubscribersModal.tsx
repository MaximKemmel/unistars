import React, { useEffect, useState } from "react";
import {useTranslation} from "react-i18next";

import { Subscribers } from "./content/Subscribers";
import { Loading } from "./content/Loading";

import globalStyles from "../../App.module.sass";
import modalStyles from "../Modal.module.sass";
import styles from "./SubscribersModal.module.sass";

import { Close as CloseIcon } from "../../assets/svgComponents/Close";
import { Export as ExportIcon } from "../../assets/svgComponents/Export";

interface ISubscribersModalProps {
  isShow: boolean;
  subscribers: any[];
  onClose: Function;
}

export const SubscribersModal: React.FC<ISubscribersModalProps> = ({ isShow, subscribers, onClose }) => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState(0);
  const [isLoadShow, setIsLoadShow] = useState(false);
  const [isLoadingSuccess, setIsLoadingSuccess] = useState(false);
  const contentSections = [
    <Subscribers subscribers={subscribers} />,
    <Loading isLoadShow={isLoadShow} isLoadingSuccess={isLoadingSuccess} />,
  ] as JSX.Element[];

  useEffect(() => {
    setActiveSection(0);
    setIsLoadShow(false);
    setIsLoadingSuccess(false);
  }, [isShow]);

  return (
    <div className={`${modalStyles.modal} ${isShow ? modalStyles.active : ""}`}>
      <div className={`${modalStyles.overlay} ${isShow ? modalStyles.active : ""}`} onClick={() => onClose()} />
      <div className={`${modalStyles.modal_content} ${styles.modal_content}`}>
        <div className={modalStyles.head}>
          <h4>{activeSection === 0 ? t("subscribers.subscribers") : t("subscribers.uploading_subscriber")}</h4>
          <div className={modalStyles.close} onClick={() => onClose()}>
            <CloseIcon />
          </div>
        </div>
        <div className={styles.subscribers_container}>{contentSections[activeSection]}</div>
        <div className={modalStyles.actions}>
          {!isLoadShow ? (
            <>
              <div />
              {activeSection === 0 ? (
                <button
                  className={globalStyles.small}
                  type="button"
                  disabled={subscribers.length === 0}
                  onClick={() => setActiveSection(1)}
                >
                  <ExportIcon isDisabled={subscribers.length === 0} />
                  {t("subscribers.upload_data")}
                </button>
              ) : (
                <button className={globalStyles.small} type="button" onClick={() => setIsLoadShow(true)}>
                  {t("subscribers.start_downloading")}
                </button>
              )}
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
