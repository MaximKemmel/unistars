import React from "react";
import { useTranslation } from "react-i18next";

import globalStyles from "../../../App.module.sass";
import modalStyles from "../../Modal.module.sass";
import styles from "../GalleryModal.module.sass";

import { IFileStorage } from "../../../types/university/fileStorage";

import UploadIcon from "../../../assets/svg/upload.svg";

interface IGalleryProps {
  photos: any[];
  setActiveSection: React.Dispatch<React.SetStateAction<number>>;
}

export const Gallery: React.FC<IGalleryProps> = ({
  photos,
  setActiveSection,
}) => {
  const { t } = useTranslation();

  return (
    <>
      {photos !== undefined && Array.isArray(photos) ? (
        <>
          <div className={styles.gallery_container}>
            <div className={styles.gallery_content}>
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
                onClick={() => setActiveSection(1)}
              >
                <span>{t("global.edit")}</span>
              </button>
              <button className={globalStyles.small} type="button">
                {t("gallery.upload_photo")}
                <img src={UploadIcon} alt="" />
              </button>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
