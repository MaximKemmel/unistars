import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import { Input } from "../../components/input/Input";

import globalStyles from "../../App.module.sass";
import modalStyles from "../Modal.module.sass";
import styles from "./BookletsModal.module.sass";

import { IBooklet } from "../../types/booklet/booklet";
import { ApiStatusType } from "../../enums/local/apiStatusType";

import { Close as CloseIcon } from "../../assets/svgComponents/Close";
import { Trash as TrashIcon } from "../../assets/svgComponents/Trash";
import UploadImageIcon from "../../assets/svg/upload-image.svg";
import UploadFileIcon from "../../assets/svg/upload-file.svg";
import FileIcon from "../../assets/svg/file.svg";
import CheckIcon from "../../assets/svg/circled-check.svg";

interface IEditBookletModalProps {
  isShow: boolean;
  booklet: IBooklet;
  onSave: Function;
  onDelete: Function;
  onClose: Function;
}

export const EditBookletModal: React.FC<IEditBookletModalProps> = ({
  isShow,
  booklet,
  onSave,
  onDelete,
  onClose,
}) => {
  const { t } = useTranslation();
  const { uploadBookletCover, uploadBookletFile } = useActions();
  const [currentBooklet, setCurrentBooklet] = useState(booklet);
  const inputImageRef = useRef<HTMLInputElement>(null);
  const [uploadImageProgress, setUploadImageProgress] = useState(-1);
  const uploadImageStatus = useTypedSelector(
    (state) => state.bookletReducer.uploadCoverStatus,
  );
  const bookletCover = useTypedSelector(
    (state) => state.bookletReducer.bookletCover,
  );
  const [imageName, setImageName] = useState("");
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [uploadFileProgress, setUploadFileProgress] = useState(-1);
  const uploadFileStatus = useTypedSelector(
    (state) => state.bookletReducer.uploadFileStatus,
  );
  const bookletFile = useTypedSelector(
    (state) => state.bookletReducer.bookletFile,
  );
  const [fileName, setFileName] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    setCurrentBooklet(booklet);
    const contentDiv = document.getElementById("booklets_content");
    contentDiv?.scrollTo({ top: 0, behavior: "smooth" });
  }, [isShow]);

  useEffect(() => {
    setIsButtonEnabled(
      currentBooklet.title.trim().length > 0 &&
        currentBooklet.description.trim().length > 0 &&
        currentBooklet.imageUrl.trim().length > 0 &&
        currentBooklet.bookletFileUrl.trim().length > 0,
    );
  }, [currentBooklet]);

  useEffect(() => {
    if (uploadImageProgress === 100) {
      setUploadImageProgress(-1);
    }
  }, [uploadImageProgress]);

  useEffect(() => {
    if (uploadFileProgress === 100) {
      setUploadFileProgress(-1);
    }
  }, [uploadFileProgress]);

  useEffect(() => {
    switch (uploadImageStatus.status) {
      case ApiStatusType.SUCCESS:
        setCurrentBooklet({
          ...currentBooklet,
          imageUrl: Object.values(bookletCover)[0],
        });
        break;
    }
  }, [uploadImageStatus]);

  useEffect(() => {
    switch (uploadFileStatus.status) {
      case ApiStatusType.SUCCESS:
        setCurrentBooklet({
          ...currentBooklet,
          bookletFileUrl: Object.values(bookletFile)[0],
        });
        break;
    }
  }, [uploadFileStatus]);

  const handleOnChangeImage = (event) => {
    try {
      const file = event.target.files[0];
      setImageName(file.name);
      if (
        file.size < 5242880 &&
        (file.name.endsWith(".png") ||
          file.name.endsWith(".jpg") ||
          file.name.endsWith(".jpeg") ||
          file.name.endsWith(".bmp"))
      ) {
        uploadBookletCover({
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

  const handleOnChangeFile = (event) => {
    try {
      const file = event.target.files[0];
      setFileName(file.name);
      if (file.size < 10000000) {
        uploadBookletFile({
          file: file,
          onUploadProgress: (data) => {
            setUploadFileProgress(
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
                <Input
                  value={currentBooklet.title}
                  onChange={(value: string) =>
                    setCurrentBooklet({
                      ...currentBooklet,
                      title: value,
                    })
                  }
                  placeholder={t("booklets.enter_a_heading")}
                  type="text"
                  isRequired={true}
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
                {currentBooklet.imageUrl === null ||
                currentBooklet.imageUrl.trim().length === 0 ? (
                  <div className={styles.form_button_label}>
                    {t("booklets.choose_a_cover")}
                  </div>
                ) : (
                  <div className={styles.file_info}>
                    <div className={styles.file_name}>
                      <img src={FileIcon} alt="" />
                      <div className={styles.name}>
                        {imageName.trim().length === 0
                          ? currentBooklet.imageUrl
                          : imageName}
                      </div>
                    </div>
                    {uploadImageStatus.status !== ApiStatusType.NONE &&
                    uploadImageStatus.status !== ApiStatusType.IN_PROGRESS ? (
                      <>
                        {uploadImageStatus.status === ApiStatusType.SUCCESS ? (
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
                          {fileName.trim().length === 0
                            ? currentBooklet.bookletFileUrl
                            : fileName}
                        </div>
                      </div>
                      {uploadFileStatus.status !== ApiStatusType.NONE &&
                      uploadFileStatus.status !== ApiStatusType.IN_PROGRESS ? (
                        <>
                          {uploadFileStatus.status === ApiStatusType.SUCCESS ? (
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
                onClick={() => onSave(currentBooklet)}
                disabled={!isButtonEnabled}
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
              <button
                className={globalStyles.small}
                type="button"
                onClick={() => onSave(currentBooklet)}
                disabled={!isButtonEnabled}
              >
                <span>{t("global.save_changes")}</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
