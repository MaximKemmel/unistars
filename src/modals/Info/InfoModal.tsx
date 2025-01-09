import modalStyles from "../Modal.module.sass";
import styles from "./InfoModal.module.sass";

import CloseIcon from "../../assets/svg/close.svg";

interface IInfoModalProps {
  isShow: boolean;
  title: string;
  message: string;
  image: any;
  onClose: Function;
}

export const InfoModal: React.FC<IInfoModalProps> = ({ isShow, title, message, image, onClose }) => {
  return (
    <div className={`${modalStyles.modal} ${isShow ? modalStyles.active : ""}`}>
      <div className={`${modalStyles.overlay} ${isShow ? modalStyles.active : ""}`} onClick={() => onClose()} />
      <div className={`${modalStyles.modal_content} ${styles.modal_content}`}>
        <div className={styles.close} onClick={() => onClose()}>
          <img src={CloseIcon} alt="" />
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
