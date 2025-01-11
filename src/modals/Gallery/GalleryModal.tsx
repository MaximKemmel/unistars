import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

import {Checkbox} from "../../components/checkbox/Checkbox";

import globalStyles from "../../App.module.sass";
import modalStyles from "../Modal.module.sass";
import styles from "./GalleryModal.module.sass";

import CloseIcon from "../../assets/svg/close.svg";
import UploadIcon from "../../assets/svg/upload.svg";
import {Trash as TrashIcon} from "../../assets/svgComponents/Trash";

interface IGalleryModalProps {
  isShow: boolean;
  photos: any[];
  onUpload: Function;
  onEdit: Function;
  onClose: Function;
}

export const GalleryModal: React.FC<IGalleryModalProps> = ({isShow, photos, onUpload, onEdit, onClose}) => {
  const { t } = useTranslation();
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPhotos, setCurrentPhotos] = useState(photos);

  useEffect(() => {
    if (!isEditMode) {
      setCurrentPhotos(photos);
    }
  }, [isEditMode]);

  return (
    <div className={`${modalStyles.modal} ${isShow ? modalStyles.active : ""}`}>
      <div
        className={`${modalStyles.overlay} ${isShow ? modalStyles.active : ""}`}
        onClick={() => {
          setIsEditMode(false);
          onClose();
          onEdit();
        }}
      />
      <div className={`${modalStyles.modal_content} ${modalStyles.wide}`}>
        <div className={modalStyles.head}>
          <h4>{t("gallery.gallery")}</h4>
          <div
            className={modalStyles.close}
            onClick={() => {
              setIsEditMode(false);
              onClose();
            }}
          >
            <img src={CloseIcon} alt=""/>
          </div>
        </div>
        <div className={styles.gallery_container}>
          <div className={styles.gallery_content}>
            {currentPhotos.map((photo, index) => (
              <div className={styles.gallery_item_container} key={index}>
                <div
                  className={`${styles.gallery_item} ${isEditMode ? styles.edited : ""} ${
                    isEditMode && photo.isChecked ? styles.selected : ""
                  }`}
                  style={{backgroundImage: `url(https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`}}
                >
                </div>
                {isEditMode ? (
                  <div className={styles.checkbox}>
                    <Checkbox
                      isChecked={photo.isChecked}
                      onChangeStatus={(status: boolean) => {
                        const tmpPhotos = currentPhotos.map((tmpPhoto) => {
                          if (tmpPhoto.id === photo.id) {
                            return {...photo, isChecked: status};
                          } else {
                            return tmpPhoto;
                          }
                        });
                        setCurrentPhotos(tmpPhotos);
                      }}
                    />
                  </div>
                ) : null}
                {photo.isChecked ? <div className={styles.item_background} /> : null}
              </div>
            ))}
          </div>
        </div>
        <div className={modalStyles.actions}>
          <div className={styles.actions}>
            {isEditMode ? (
              <>
                <div className={styles.edited_count}>
                  {`${currentPhotos.filter((photo) => photo.isChecked).length} ${t("global.selected")}`}
                </div>
                <button
                  className={`${globalStyles.inverted} ${globalStyles.small} ${globalStyles.delete}`}
                  type="button"
                  onClick={() => onUpload()}
                >
                  <TrashIcon/>
                  {t("global.delete")}
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
                  <span>{t("global.cancel")}</span>
                </button>
                <button className={globalStyles.small} type="button" onClick={() => onUpload()}>
                  {t("global.save_changes")}
                </button>
              </>
            ) : (
              <>
                <button
                  className={`${globalStyles.inverted} ${globalStyles.small}`}
                  type="button"
                  onClick={() => setIsEditMode(true)}
                >
                  <span>{t("global.edit")}</span>
                </button>
                <button className={globalStyles.small} type="button" onClick={() => onUpload()}>
                  {t("gallery.upload_photo")}
                  <img src={UploadIcon} alt=""/>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
