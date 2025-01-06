import globalStyles from "../../App.module.sass";
import styles from "./GalleryModal.module.sass";

import TestPhoto from "../../assets/png/test_photo.png";
import CloseIcon from "../../assets/svg/close.svg";

interface IGalleryModalProps {
  isShow: boolean;
  photos: string[];
  onUpload: Function;
  onEdit: Function;
  onClose: Function;
}

export const GalleryModal: React.FC<IGalleryModalProps> = ({
  isShow,
  photos,
  onUpload,
  onEdit,
  onClose,
}) => {
  return (
    <div className={`${styles.modal} ${isShow ? styles.active : ""}`}>
      <div
        className={`${styles.overlay} ${isShow ? styles.active : ""}`}
        onClick={() => onClose()}
      />
      <div className={styles.modal_content}>
        <div className={styles.head}>
          <h3>Галерея</h3>
          <div className={styles.close} onClick={() => onClose()}>
            <img src={CloseIcon} alt="" />
          </div>
        </div>
        <div className={styles.gallery_content}>
            <div className={styles.gallery_actions}>
            <button className={`${globalStyles.inverted} ${globalStyles.small}`} type="button" onClick={() => onEdit()}>
              <span>Отменить</span>
            </button>
            <button className={globalStyles.small} type="button" onClick={() => onUpload()}>Сохранить изменения</button>
          </div>
        </div>
      </div>
    </div>
  );
};
