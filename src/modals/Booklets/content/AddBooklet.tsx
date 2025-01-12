import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

import globalStyles from "../../../App.module.sass";
import modalStyles from "../../Modal.module.sass";
import styles from "../BookletsModal.module.sass";

import UploadImageIcon from "../../../assets/svg/upload-image.svg";
import UploadFileIcon from "../../../assets/svg/upload-file.svg";
import {Trash as TrashIcon} from "../../../assets/svgComponents/Trash";

interface IAddBookletProps {
  booklet: any;
  setActiveSection: React.Dispatch<React.SetStateAction<number>>;
}

export const AddBooklet: React.FC<IAddBookletProps> = ({booklet, setActiveSection}) => {
  const { t } = useTranslation();
  const [currentBooklet, setCurrentBooklet] = useState(booklet);

  useEffect(() => {
    setCurrentBooklet(booklet);
  }, [booklet]);

  return (
    <>
      <div className={styles.booklets_container}>
        <div className={styles.booklets_content}>
          <form>
            <div className={styles.form_field}>
              <div className={styles.form_label}>{t("booklets.heading_and_cover")}</div>
              <input
                placeholder={t("booklets.enter_a_heading")}
                type="text"
                required
                onChange={(event) => setCurrentBooklet({...currentBooklet, name: event.target.value})}
                value={currentBooklet.name}
              />
            </div>
            <div className={styles.cover}>
              <div className={styles.form_button}>
                <img src={UploadImageIcon} alt=""/>
              </div>
              <div className={styles.form_button_label}>{t("booklets.choose_a_cover")}</div>
            </div>
            <div className={styles.form_field}>
              <div className={styles.form_label}>{t("booklets.description")}</div>
              <textarea
                placeholder={t("booklets.enter_a_description")}
                required
                onChange={(event) => setCurrentBooklet({...currentBooklet, description: event.target.value})}
                value={currentBooklet.description}
              />
            </div>
            <div className={styles.file}>
              <div className={styles.file_title}>{t("booklets.file")}</div>
              <div className={styles.file_content}>
                <div className={`${styles.form_button} ${styles.filled}`}>
                  <img src={UploadFileIcon} alt=""/>
                </div>
                <div className={styles.form_button_label}>{t("booklets.upload_file")}</div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className={modalStyles.actions}>
        {booklet.id === -1 ? <>
          <div/>
          <button className={globalStyles.small} type="button">
            <span>{t("global.save")}</span>
          </button>
        </> : <>
          <button className={`${globalStyles.small} ${globalStyles.inverted} ${globalStyles.delete} ${globalStyles.square}`}
                  type="button"
                  onClick={() => setActiveSection(0)}>
            <TrashIcon />
          </button>
          <button className={globalStyles.small} type="button">
            <span>{t("global.save_changes")}</span>
          </button>
        </>
        }
      </div>
    </>
  );
};
