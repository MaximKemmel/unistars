import styles from "./InfoModal.module.sass";

import CloseIcon from "../../assets/svg/close.svg";

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
          <img src={CloseIcon} alt="" />
        </div>
        <img className={styles.image} src={image} alt="" />
        <div className={styles.text}>
          <h3>{title}</h3>
          <div className={styles.message}>{message}</div>
        </div>
      </div>
    </div>
  );
};
