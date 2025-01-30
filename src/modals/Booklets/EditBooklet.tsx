import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import globalStyles from "../../App.module.sass";
import modalStyles from "../Modal.module.sass";
import styles from "./BookletsModal.module.sass";

import { IBooklet } from "../../types/booklet/booklet";

import UploadImageIcon from "../../assets/svg/upload-image.svg";
import UploadFileIcon from "../../assets/svg/upload-file.svg";
import FileIcon from "../../assets/svg/file.svg";
import { Close as CloseIcon } from "../../assets/svgComponents/Close";
import CheckIcon from "../../assets/svg/circled-check.svg";
import { Trash as TrashIcon } from "../../assets/svgComponents/Trash";

interface IEditBookletModalProps {
  isShow: boolean;
  booklet: IBooklet;
  onDelete: Function;
  onClose: Function;
}

export const EditBookletModal: React.FC<IEditBookletModalProps> = ({
  isShow,
  booklet,
  onDelete,
  onClose,
}) => {
  const { t } = useTranslation();
  const [currentBooklet, setCurrentBooklet] = useState(booklet);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [isImageUploadSuccess, setIsImageUploadSuccess] = useState(true);
  const inputImageRef = useRef<HTMLInputElement>(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isFileUploadSuccess, setIsFileUploadSuccess] = useState(true);
  const inputFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const contentDiv = document.getElementById("booklets_content");
    contentDiv?.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentBooklet(booklet);
  }, [isShow]);

  const handleOnSaveBooklet = () => {};

  const handleOnChangeImage = (event) => {
    try {
      const file = event.target.files[0];
      setCurrentBooklet({ ...booklet, imageUrl: file.name });
      setIsImageUploadSuccess(true);
      setIsImageUploaded(true);
      event.target.value = "";
    } catch (error) {
      console.warn(error);
    }
  };

  const handleOnChangeFile = (event) => {
    try {
      const file = event.target.files[0];
      setCurrentBooklet({ ...booklet, bookletFileUrl: file.name });
      setIsFileUploadSuccess(true);
      setIsFileUploaded(true);
      event.target.value = "";
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <div className={`${modalStyles.modal} ${isShow ? modalStyles.active : ""}`}>
      <div
        className={`${modalStyles.overlay} ${isShow ? modalStyles.active : ""}`}
        onClick={() => onClose()}
      />
      <div className={modalStyles.modal_content}>
        <div className={modalStyles.head}>
          <h4>
            {currentBooklet.id === -1
              ? t("booklets.creating_a_booklet")
              : t("booklets.editing_a_booklet")}
          </h4>
          <div className={modalStyles.close} onClick={() => onClose()}>
            <CloseIcon />
          </div>
        </div>
        <div className={styles.booklets_container}>
          <div className={styles.booklets_content} id="booklets_content">
            <form>
              <div className={styles.form_field}>
                <div className={styles.form_label}>
                  {t("booklets.heading_and_cover")}
                </div>
                <input
                  placeholder={t("booklets.enter_a_heading")}
                  type="text"
                  required
                  onChange={(event) =>
                    setCurrentBooklet({
                      ...currentBooklet,
                      title: event.target.value,
                    })
                  }
                  value={currentBooklet.title}
                  maxLength={255}
                />
              </div>
              <div className={styles.cover}>
                <input
                  ref={inputImageRef}
                  type="file"
                  id="file"
                  accept="image/png, image/jpeg"
                  onChange={handleOnChangeImage}
                  hidden
                />
                <div
                  className={styles.form_button}
                  onClick={() => inputImageRef.current!.click()}
                >
                  <img src={UploadImageIcon} alt="" />
                </div>
                {currentBooklet.imageUrl.trim().length === 0 ? (
                  <div className={styles.form_button_label}>
                    {t("booklets.choose_a_cover")}
                  </div>
                ) : (
                  <div className={styles.file_info}>
                    <div className={styles.file_name}>
                      <img src={FileIcon} alt="" />
                      <div className={styles.name}>
                        {currentBooklet.imageUrl}
                      </div>
                    </div>
                    {isImageUploaded ? (
                      <>
                        {isImageUploadSuccess ? (
                          <div
                            className={`${styles.upload_progress} ${styles.success}`}
                          >
                            <img src={CheckIcon} alt="" />
                            {t("global.sended")}
                          </div>
                        ) : (
                          <div
                            className={`${styles.upload_progress} ${styles.error}`}
                          >
                            {t("global.error")}
                            <CloseIcon fill="#C45F1C" isBold={true} />
                          </div>
                        )}
                      </>
                    ) : null}
                  </div>
                )}
              </div>
              <div className={styles.form_field}>
                <div className={styles.form_label}>
                  {t("booklets.description")}
                </div>
                <textarea
                  placeholder={t("booklets.enter_a_description")}
                  required
                  onChange={(event) =>
                    setCurrentBooklet({
                      ...currentBooklet,
                      description: event.target.value,
                    })
                  }
                  value={currentBooklet.description}
                />
              </div>
              <div className={styles.file}>
                <div className={styles.file_title}>{t("booklets.file")}</div>
                <div className={styles.file_content}>
                  <input
                    ref={inputFileRef}
                    type="file"
                    id="file"
                    accept="application/pdf, .doc, .docx, image/png, image/jpeg"
                    onChange={handleOnChangeFile}
                    hidden
                  />
                  <div
                    className={`${styles.form_button} ${styles.filled}`}
                    onClick={() => inputFileRef.current!.click()}
                  >
                    <img src={UploadFileIcon} alt="" />
                  </div>

                  {currentBooklet.bookletFileUrl.trim().length === 0 ? (
                    <div className={styles.form_button_label}>
                      {t("booklets.upload_file")}
                    </div>
                  ) : (
                    <div className={styles.file_info}>
                      <div className={styles.file_name}>
                        <img src={FileIcon} alt="" />
                        <div className={styles.name}>
                          {currentBooklet.bookletFileUrl}
                        </div>
                      </div>
                      {isFileUploaded ? (
                        <>
                          {isFileUploadSuccess ? (
                            <div
                              className={`${styles.upload_progress} ${styles.success}`}
                            >
                              <img src={CheckIcon} alt="" />
                              {t("global.sended")}
                            </div>
                          ) : (
                            <div
                              className={`${styles.upload_progress} ${styles.error}`}
                            >
                              {t("global.error")}
                              <CloseIcon fill="#C45F1C" isBold={true} />
                            </div>
                          )}
                        </>
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className={modalStyles.actions}>
          {currentBooklet.id === -1 ? (
            <>
              <div />
              <button
                className={globalStyles.small}
                type="button"
                onClick={handleOnSaveBooklet}
              >
                <span>{t("global.save")}</span>
              </button>
            </>
          ) : (
            <>
              <button
                className={`${globalStyles.small} ${globalStyles.inverted} ${globalStyles.delete} ${globalStyles.square}`}
                type="button"
                onClick={() => onDelete(currentBooklet)}
              >
                <TrashIcon />
              </button>
              <button className={globalStyles.small} type="button">
                <span>{t("global.save_changes")}</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
