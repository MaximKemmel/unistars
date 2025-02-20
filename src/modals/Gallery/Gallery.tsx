import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useTypedSelector } from "../../hooks/useTypedSelector";

import globalStyles from "../../App.module.sass";
import modalStyles from "../Modal.module.sass";
import styles from "./GalleryModal.module.sass";

import { IFileStorage } from "../../types/university/fileStorage";

import UploadIcon from "../../assets/svg/upload.svg";
import CloseIcon from "../../assets/svg/close.svg";

interface IGalleryModalProps {
  isShow: boolean;
  onEdit: Function;
  onUpload: Function;
  onClose: Function;
}

export const GalleryModal: React.FC<IGalleryModalProps> = ({
  isShow,
  onEdit,
  onUpload,
  onClose,
}) => {
  const { t } = useTranslation();
  const photos = useTypedSelector(
    (state) => state.universityReducer.universityProfile.standGalleryImages,
  );

  useEffect(() => {
    const contentDiv = document.getElementById("gallery_content");
    contentDiv?.scrollTo({ top: 0, behavior: "smooth" });
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
        {photos !== undefined && Array.isArray(photos) ? (
          <>
            <div className={styles.gallery_container}>
              <div className={styles.gallery_content} id="edit_gallery_content">
                {photos.map((photo: IFileStorage, index: number) => (
                  <div className={styles.gallery_item_container} key={index}>
                    <div
                      className={styles.gallery_item}
                      style={{
                        backgroundImage: `url(https://vexa.storage.yandexcloud.net/${photo.cloudFileName})`,
                      }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
            <div className={modalStyles.actions}>
              <div />
              <div className={styles.actions}>
                <button
                  className={`${globalStyles.inverted} ${globalStyles.small}`}
                  type="button"
                  onClick={() => onEdit()}
                >
                  <span>{t("global.edit")}</span>
                </button>
                <button
                  className={globalStyles.small}
                  type="button"
                  onClick={() => onUpload()}
                >
                  {t("gallery.upload_photo")}
                  <img src={UploadIcon} alt="" />
                </button>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};
