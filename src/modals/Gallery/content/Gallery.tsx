import React from "react";
import {useTranslation} from "react-i18next";

import globalStyles from "../../../App.module.sass";
import modalStyles from '../../Modal.module.sass';
import styles from '../GalleryModal.module.sass';

import UploadIcon from "../../../assets/svg/upload.svg";

interface IGalleryProps {
  photos: any[];
  setActiveSection: React.Dispatch<React.SetStateAction<number>>;
}

export const Gallery: React.FC<IGalleryProps> = ({ photos, setActiveSection }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.gallery_container}>
        <div className={styles.gallery_content}>
          {photos.map((_, index) => (
            <div className={styles.gallery_item_container} key={index}>
              <div
                className={styles.gallery_item}
                style={{backgroundImage: `url(https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`}}
              >
              </div>
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
            <img src={UploadIcon} alt=""/>
          </button>
        </div>
      </div>
    </>
  );
}