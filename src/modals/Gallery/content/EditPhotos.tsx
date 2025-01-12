import React, {useState} from "react";
import {useTranslation} from "react-i18next";

import {Checkbox} from "../../../components/checkbox/Checkbox";

import globalStyles from "../../../App.module.sass";
import modalStyles from '../../Modal.module.sass';
import styles from '../GalleryModal.module.sass';

import {Trash as TrashIcon} from "../../../assets/svgComponents/Trash";

interface IEditPhotosProps {
  photos: any[];
  setActiveSection: React.Dispatch<React.SetStateAction<number>>;
}

export const EditPhotos: React.FC<IEditPhotosProps> = ({ photos, setActiveSection }) => {
  const { t } = useTranslation();
  const [currentPhotos, setCurrentPhotos] = useState(photos);

  return (
    <>
      <div className={styles.gallery_container}>
        <div className={styles.gallery_content}>
          {currentPhotos.map((photo, index) => (
            <div className={styles.gallery_item_container} key={index}>
              <div
                className={`${styles.gallery_item} ${styles.edited} ${photo.isChecked ? styles.selected : ""}`}
                style={{backgroundImage: `url(https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`}}
              >
              </div>
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
              {photo.isChecked ? <div className={styles.item_background} /> : null}
            </div>
          ))}
        </div>
      </div>
      <div className={modalStyles.actions}>
        <div className={styles.actions}>
          <div className={styles.edited_count}>
            {`${currentPhotos.filter((photo) => photo.isChecked).length} ${t("global.selected")}`}
          </div>
          <button
            className={`${globalStyles.inverted} ${globalStyles.small} ${globalStyles.delete}`}
            type="button"
            onClick={() => setActiveSection(2)}
          >
            <TrashIcon/>
            {t("global.delete")}
          </button>
        </div>
        <div className={styles.actions}>
          <button
            className={`${globalStyles.inverted} ${globalStyles.small}`}
            type="button"
            onClick={() => setActiveSection(0)}
          >
            <span>{t("global.cancel")}</span>
          </button>
          <button className={globalStyles.small} type="button" onClick={() => setActiveSection(0)}>
            {t("global.save_changes")}
          </button>
        </div>
      </div>
    </>
  );
}