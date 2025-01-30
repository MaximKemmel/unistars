import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import { GalleryModal } from "../../../../modals/Gallery/Gallery";
import { EditGalleryModal } from "../../../../modals/Gallery/EditGallery";
import { ConfirmDeleteModal } from "../../../../modals/ConfirmDelete/ConfirmDelete";
import { StatusInfoModal } from "../../../../modals/StatusInfo/StatusInfo";

import globalStyles from "../../../../App.module.sass";
import styles from "../../Home.module.sass";

import { IFileStorage } from "../../../../types/university/fileStorage";

export const GalleryContainer = () => {
  const { t } = useTranslation();
  const gallery = useTypedSelector(
    (state) => state.universityReducer.universityProfile.standGalleryImages,
  );
  const [isGalleryModalShow, setIsGalleryModalShow] = useState(false);
  const [isGalleryEditModalShow, setIsGalleryEditModalShow] = useState(false);
  const [isConfirmDeleteModalShow, setIsConfirmDeleteModalShow] =
    useState(false);
  const [isStatusInfoModalShow, setIsStatusInfoModalShow] = useState(false);

  const handleOnDeletePhotos = (photos: IFileStorage[]) => {
    console.log(photos);
    setIsGalleryEditModalShow(false);
    setIsConfirmDeleteModalShow(true);
  };

  const handleOnConfirmDeletePhotos = () => {
    setIsConfirmDeleteModalShow(false);
    setIsStatusInfoModalShow(true);
  };

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
        onEdit={() => {
          setIsGalleryModalShow(false);
          setIsGalleryEditModalShow(true);
        }}
        onClose={() => {
          setIsGalleryModalShow(false);
        }}
      />
      <EditGalleryModal
        isShow={isGalleryEditModalShow}
        onDelete={handleOnDeletePhotos}
        onCancel={() => {
          setIsGalleryEditModalShow(false);
          setIsGalleryModalShow(true);
        }}
        onClose={() => {
          setIsGalleryEditModalShow(false);
        }}
      />
      <ConfirmDeleteModal
        isShow={isConfirmDeleteModalShow}
        head={t("gallery.deleting_photos")}
        title={t("gallery.delete_title")}
        message={t("gallery.delete_description")}
        onConfirm={handleOnConfirmDeletePhotos}
        onClose={() => setIsConfirmDeleteModalShow(false)}
      />
      <StatusInfoModal
        isShow={isStatusInfoModalShow}
        message={t("booklets.booklet_was_deleted")}
        isSuccess={true}
        onClose={() => setIsStatusInfoModalShow(false)}
        isRestore={true}
        onRestore={() => setIsStatusInfoModalShow(false)}
      />
    </>
  );
};
