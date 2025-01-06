import { useEffect, useState } from "react";

import Checkbox from "../../components/checkbox/Checkbox";

import globalStyles from "../../App.module.sass";
import styles from "./GalleryModal.module.sass";

import CloseIcon from "../../assets/svg/close.svg";
import UploadIcon from "../../assets/svg/upload.svg";
import TrashIcon from "../../assets/svg/trash.svg";

interface IGalleryModalProps {
  isShow: boolean;
  photos: any[];
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
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPhotos, setCurrentPhotos] = useState(photos);

  useEffect(() => {
    if (!isEditMode) {
      setCurrentPhotos(photos);
    }
  }, [isEditMode]);

  return (
    <div className={`${styles.modal} ${isShow ? styles.active : ""}`}>
      <div
        className={`${styles.overlay} ${isShow ? styles.active : ""}`}
        onClick={() => {
          setIsEditMode(false);
          onClose();
        }}
      />
      <div className={styles.modal_content}>
        <div className={styles.head}>
          <h3>Галерея</h3>
          <div
            className={styles.close}
            onClick={() => {
              setIsEditMode(false);
              onClose();
            }}
          >
            <img src={CloseIcon} alt="" />
          </div>
        </div>
        <div className={styles.gallery_container}>
          <div className={styles.gallery_content}>
            {currentPhotos.map((photo, index) => (
              <div className={styles.gallery_item_container} key={index}>
                <div
                  className={`${styles.gallery_item} ${
                    isEditMode ? styles.edited : ""
                  } ${isEditMode && photo.isChecked ? styles.selected : ""}`}
                >
                  <img className={styles.photo} src={photo.url} alt="" />
                </div>
                {isEditMode ? (
                  <div className={styles.checkbox}>
                    <Checkbox
                      isChecked={photo.isChecked}
                      onChangeStatus={(status) => {
                        var tmpPhotos = currentPhotos.map((tmpPhoto) => {
                          if (tmpPhoto.id === photo.id) {
                            return { ...photo, isChecked: status };
                          } else {
                            return tmpPhoto;
                          }
                        });
                        setCurrentPhotos(tmpPhotos);
                      }}
                    />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          <div className={styles.gallery_actions}>
            <div className={styles.actions}>
              {isEditMode ? (
                <>
                  <div className={styles.edited_count}>
                    {`Выбрано ${
                      currentPhotos.filter((photo) => photo.isChecked).length
                    }`}
                  </div>
                  <button
                    className={`${globalStyles.inverted} ${globalStyles.small} ${globalStyles.delete}`}
                    type="button"
                    onClick={() => onUpload()}
                  >
                    <img src={TrashIcon} alt="" />
                    Удалить
                  </button>
                </>
              ) : null}
            </div>
            <div className={styles.actions}>
              {isEditMode ? (
                <>
                  <button
                    className={`${globalStyles.inverted} ${globalStyles.small}`}
                    type="button"
                    onClick={() => setIsEditMode(false)}
                  >
                    <span>Отменить</span>
                  </button>
                  <button
                    className={globalStyles.small}
                    type="button"
                    onClick={() => onUpload()}
                  >
                    Сохранить изменения
                  </button>
                </>
              ) : (
                <>
                  <button
                    className={`${globalStyles.inverted} ${globalStyles.small}`}
                    type="button"
                    onClick={() => setIsEditMode(true)}
                  >
                    <span>Редактировать</span>
                  </button>
                  <button
                    className={globalStyles.small}
                    type="button"
                    onClick={() => onUpload()}
                  >
                    Загрузить фотографию
                    <img src={UploadIcon} alt="" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
