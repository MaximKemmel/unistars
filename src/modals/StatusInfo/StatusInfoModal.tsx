import React, { useEffect } from "react";
import {useTranslation} from "react-i18next";

import globalStyles from "../../App.module.sass";
import styles from "./StatusInfoModal.module.sass";

import WarningIcon from "../../assets/svg/warning.svg";
import CheckIcon from "../../assets/svg/circled-check.svg";
import { Close as CloseIcon } from "../../assets/svgComponents/Close";

interface IStatusInfoModalProps {
  isShow: boolean;
  message: string;
  isSuccess: boolean;
  onClose: Function;
  isRestore?: boolean;
  onRestore?: Function;
}

export const StatusInfoModal: React.FC<IStatusInfoModalProps> = ({
  isShow,
  message,
  isSuccess,
  onClose,
  isRestore,
  onRestore,
}) => {
  const { t } = useTranslation();

  const delay = async (ms: number) => {
    return new Promise((resolve) =>
      setTimeout(resolve, ms));
  };

  useEffect(() => {
    const setTimer = async () => {
      await delay(!isSuccess || isRestore ? 10000 : 3000);
      onClose();
    }
    if (isShow) {
      setTimer();
    }
  }, [isShow]);

  return (
    <div
      className={`${styles.modal_container} ${isSuccess ? styles.success : styles.error} ${isShow ? styles.active : ""}`}>
      <img src={isSuccess ? CheckIcon : WarningIcon} alt=""/>
      <div className={styles.info}>
        <div className={styles.message}>{message}</div>
        {isRestore ?
          <button className={`${globalStyles.inverted} ${globalStyles.small} ${styles.restore_button}`} type="button" onClick={() => onRestore!()}>
            <span>{t("global.restore")}</span>
          </button> : null}
      </div>
      <div className={styles.close} onClick={() => onClose()}>
        <CloseIcon/>
      </div>
    </div>
  );
};
