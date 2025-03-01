import React from "react";
import styles from "./InfoModal.module.sass";

import { Close as CloseIcon } from "../../assets/svgComponents/Close";

interface IInfoModalProps {
  isShow: boolean;
  title: string;
  message: string;
  image: any;
  onClose: Function;
}

export const InfoModal: React.FC<IInfoModalProps> = ({
  isShow,
  title,
  message,
  image,
  onClose,
}) => {
  return (
    <div className={`${styles.modal} ${isShow ? styles.active : ""}`}>
      <div
        className={`${styles.overlay} ${isShow ? styles.active : ""}`}
        onClick={() => onClose()}
      />
      <div className={styles.modal_content}>
        <div className={styles.close} onClick={() => onClose()}>
          <CloseIcon />
        </div>
        <img className={styles.image} src={image} alt="" />
        <div className={styles.text}>
          <h4>{title}</h4>
          <div className={styles.message}>{message}</div>
        </div>
      </div>
    </div>
  );
};
