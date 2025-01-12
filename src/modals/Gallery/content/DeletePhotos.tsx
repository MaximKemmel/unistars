import React from "react";
import {useTranslation} from "react-i18next";

import globalStyles from "../../../App.module.sass";
import modalStyles from '../../Modal.module.sass';
import styles from '../GalleryModal.module.sass';

interface IDeletePhotosProps {
  onConfirm: Function;
  setActiveSection: React.Dispatch<React.SetStateAction<number>>;
}

export const DeletePhotos: React.FC<IDeletePhotosProps> = ({ onConfirm, setActiveSection }) => {
  const { t } = useTranslation();

  return <>
    <div className={modalStyles.delete_container}>
      <div className={modalStyles.delete_title}>{t("gallery.delete_title")}</div>
      <div className={modalStyles.delete_description}>{t("gallery.delete_description")}</div>
    </div>
    <div className={modalStyles.actions}>
      <div />
      <div className={styles.actions}>
        <button
          className={`${globalStyles.inverted} ${globalStyles.small}`}
          type="button"
          onClick={() => setActiveSection(0)}
        >
          <span>{t("global.back")}</span>
        </button>
        <button className={`${globalStyles.small} ${globalStyles.delete}`} type="button" onClick={() => {
          onConfirm();
          setActiveSection(0);
        }}>
          {t("global.delete")}
        </button>
      </div>
    </div>
  </>
}