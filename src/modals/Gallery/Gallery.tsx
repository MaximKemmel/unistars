import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import globalStyles from "../../App.module.sass";
import modalStyles from "../Modal.module.sass";
import styles from "./GalleryModal.module.sass";

import { IFileStorage } from "../../types/university/fileStorage";
import { ApiStatusType } from "../../enums/local/apiStatusType";

import { Upload as UploadIcon } from "../../assets/svgComponents/Upload";
import CloseIcon from "../../assets/svg/close.svg";

interface IGalleryModalProps {
  isShow: boolean;
  onEdit: Function;
  onClose: Function;
}

export const GalleryModal: React.FC<IGalleryModalProps> = ({
  isShow,
  onEdit,
  onClose,
}) => {
  const { t } = useTranslation();
  const { uploadToGallery } = useActions();
  const photos = useTypedSelector(
    (state) => state.universityReducer.universityProfile.standGalleryImages,
  );
  const inputImageRef = useRef<HTMLInputElement>(null);
  const [uploadImageProgress, setUploadImageProgress] = useState(-1);
  const uploadImageStatus = useTypedSelector(
    (state) => state.universityReducer.uploadToGalleryStatus,
  );

  useEffect(() => {
    if (uploadImageProgress === 100) {
      setUploadImageProgress(-1);
    }
  }, [uploadImageProgress]);

  useEffect(() => {
    const contentDiv = document.getElementById("gallery_content");
    contentDiv?.scrollTo({ top: 0, behavior: "smooth" });
  }, [isShow]);

  const handleOnChangeImage = (event) => {
    try {
      const file = event.target.files[0];
      if (
        file.size < 5242880 &&
        (file.name.endsWith(".png") ||
          file.name.endsWith(".jpg") ||
          file.name.endsWith(".jpeg") ||
          file.name.endsWith(".bmp"))
      ) {
        uploadToGallery({
          file: file,
          onUploadProgress: (data) => {
            setUploadImageProgress(
              Math.round(100 * (data.loaded / data.total!)),
            );
          },
        });
      }
      event.target.value = "";
    } catch (error) {
      console.warn(error);
    }
  };

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
                  onClick={() => inputImageRef.current!.click()}
                  disabled={
                    uploadImageStatus.status === ApiStatusType.IN_PROGRESS
                  }
                >
                  {t("gallery.upload_photo")}
                  <UploadIcon
                    isDisabled={
                      uploadImageStatus.status === ApiStatusType.IN_PROGRESS
                    }
                  />
                </button>
              </div>
            </div>
          </>
        ) : null}
      </div>
      <input
        ref={inputImageRef}
        type="file"
        id="file"
        accept="image/png, image/jpeg"
        onChange={handleOnChangeImage}
        hidden
      />
    </div>
  );
};
