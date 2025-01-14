import { useEffect } from "react";

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
  useEffect(() => {
    if (isShow) {
      setInterval(() => onClose(), !isSuccess || isRestore ? 10000 : 3000);
    }
  }, [isShow]);

  return (
    <div className={`${styles.modal_container} ${isSuccess ? styles.success : styles.error} ${isShow ? styles.active : ""}`}>
      <div className={styles.head}>
        <div className={styles.info}>
          <img src={isSuccess ? CheckIcon : WarningIcon} alt="" />
          <div className={styles.message}>{message}</div>
        </div>
        <div className={styles.close} onClick={() => onClose()}>
          <CloseIcon />
        </div>
      </div>
      {isRestore ? <button className={styles.restore_button} type="button" onClick={() => onRestore!()}></button> : null}
    </div>
  );
};
