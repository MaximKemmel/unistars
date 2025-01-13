import React from "react";
import {useTranslation} from "react-i18next";

import styles from "../SubscribersModal.module.sass";

import FileIcon from "../../../assets/svg/file.svg";
import { Close as CloseIcon } from "../../../assets/svgComponents/Close";
import CheckIcon from "../../../assets/svg/circled-check.svg";

interface ILoadingProps {
  isLoadShow: boolean;
  isLoadingSuccess: boolean;
}

export const Loading: React.FC<ILoadingProps> = ({ isLoadShow, isLoadingSuccess }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.loading_content}>
      <div className={styles.loading_description}>
        {t("subscribers.loading_description")}
      </div>
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
  );
};
