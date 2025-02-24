import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useTypedSelector } from "../../hooks/useTypedSelector";

import { Checkbox } from "../../components/checkbox/Checkbox";

import globalStyles from "../../App.module.sass";
import modalStyles from "../Modal.module.sass";
import styles from "./GalleryModal.module.sass";

import { IFileStorage } from "../../types/university/fileStorage";

import CloseIcon from "../../assets/svg/close.svg";
import { Trash as TrashIcon } from "../../assets/svgComponents/Trash";

interface IEditGalleryModalProps {
  isShow: boolean;
  onDelete: Function;
  onCancel: Function;
  onClose: Function;
}

export const EditGalleryModal: React.FC<IEditGalleryModalProps> = ({
  isShow,
  onDelete,
  onCancel,
  onClose,
}) => {
  const { t } = useTranslation();
  const photos = useTypedSelector(
    (state) => state.universityReducer.universityProfile.standGalleryImages,
  );
  const [currentPhotos, setCurrentPhotos] = useState(photos);

  useEffect(() => {
    setCurrentPhotos(photos);
  }, [isShow]);

  return (
    <div className={`${modalStyles.modal} ${isShow ? modalStyles.active : ""}`}>
      <div
        className={`${modalStyles.overlay} ${isShow ? modalStyles.active : ""}`}
        onClick={() => {
          onClose();
        }}
      />
      <div className={`${modalStyles.modal_content} ${modalStyles.wide}`}>
        <div className={modalStyles.head}>
          <h4>{t("gallery.gallery")}</h4>
          <div className={modalStyles.close} onClick={() => onClose()}>
            <img src={CloseIcon} alt="" />
          </div>
        </div>
        {isShow &&
        currentPhotos !== undefined &&
        Array.isArray(currentPhotos) ? (
          <>
            <div className={styles.gallery_container}>
              <div className={styles.gallery_content}>
                {currentPhotos.map((photo: IFileStorage, index: number) => (
                  <div className={styles.gallery_item_container} key={index}>
                    <div
                      className={`${styles.gallery_item} ${styles.edited} ${photo.isSelected ? styles.selected : ""}`}
                      style={{
                        backgroundImage: `url(https://vexa.storage.yandexcloud.net/${photo.cloudFileName})`,
                      }}
                    ></div>
                    <div className={styles.checkbox}>
                      <Checkbox
                        isChecked={photo.isSelected}
                        onChangeStatus={(status: boolean) => {
                          setCurrentPhotos(
                            currentPhotos.map((tmpPhoto: IFileStorage) => {
                              if (tmpPhoto.id === photo.id) {
                                return { ...photo, isSelected: status };
                              } else {
                                return tmpPhoto;
                              }
                            }),
                          );
                        }}
                      />
                    </div>
                    {photo.isSelected ? (
                      <div className={styles.item_background} />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
            <div className={modalStyles.actions}>
              <div className={styles.actions}>
                <div className={styles.edited_count}>
                  {`${currentPhotos.filter((photo: IFileStorage) => photo.isSelected).length} ${t("global.selected")}`}
                </div>
                <button
                  className={`${globalStyles.inverted} ${globalStyles.small} ${globalStyles.delete}`}
                  type="button"
                  onClick={() =>
                    onDelete(
                      currentPhotos.filter(
                        (photo: IFileStorage) => photo.isSelected,
                      ),
                    )
                  }
                >
                  <TrashIcon />
                  {t("global.delete")}
                </button>
              </div>
              <div className={styles.actions}>
                <button
                  className={`${globalStyles.inverted} ${globalStyles.small}`}
                  type="button"
                  onClick={() => onCancel()}
                >
                  <span>{t("global.cancel")}</span>
                </button>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};
