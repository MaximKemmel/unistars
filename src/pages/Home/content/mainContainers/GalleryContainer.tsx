import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import { GalleryModal } from "../../../../modals/Gallery/GalleryModal";

import globalStyles from "../../../../App.module.sass";
import styles from "../../Home.module.sass";

import { IFileStorage } from "../../../../types/university/fileStorage";

export const GalleryContainer = () => {
  const { t } = useTranslation();
  const gallery = useTypedSelector(
    (state) => state.universityReducer.universityProfile.standGalleryImages,
  );
  const [isGalleryModalShow, setIsGalleryModalShow] = useState(false);

  return (
    <>
      <div
        className={`${styles.main_gallery} ${styles.content_container} ${styles.half}`}
      >
        <div className={styles.content_container_head}>
          <div className={styles.head_title}>
            <h4>{t("gallery.gallery")}</h4>
            <div className={styles.count}>
              {gallery === undefined || !Array.isArray(gallery)
                ? 0
                : gallery.length}
            </div>
          </div>
          {gallery != undefined &&
          Array.isArray(gallery) &&
          gallery.length > 0 ? (
            <div className={styles.head_action}>{t("gallery.upload_more")}</div>
          ) : null}
        </div>
        {gallery != undefined &&
        Array.isArray(gallery) &&
        gallery.length > 0 ? (
          <>
            <div className={styles.main_gallery_container}>
              {gallery.slice(0, 6).map((photo: IFileStorage, index: number) => {
                return (
                  <div className={styles.main_gallery_item} key={index}>
                    <img
                      src={`https://vexa.storage.yandexcloud.net/${photo.cloudFileName}`}
                      alt=""
                    />
                  </div>
                );
              })}
            </div>
            <button
              className={`${globalStyles.inverted} ${globalStyles.small}`}
              type="button"
              onClick={() => setIsGalleryModalShow(true)}
            >
              <span>
                {gallery.length > 6 ? t("gallery.see_all") : t("global.edit")}
              </span>
            </button>
          </>
        ) : (
          <div className={styles.empty_info}>
            <div className={styles.empty_message}>{t("gallery.no_photos")}</div>
            <button
              className={globalStyles.small}
              type="button"
              onClick={() => setIsGalleryModalShow(true)}
            >
              {t("gallery.upload_photos")}
            </button>
          </div>
        )}
      </div>
      <GalleryModal
        isShow={isGalleryModalShow}
        photos={gallery!}
        onClose={() => {
          setIsGalleryModalShow(false);
        }}
        onUpload={() => {
          setIsGalleryModalShow(false);
        }}
        onEdit={() => {
          setIsGalleryModalShow(false);
        }}
      />
    </>
  );
};
