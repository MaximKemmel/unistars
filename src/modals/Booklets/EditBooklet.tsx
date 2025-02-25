import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import { Input } from "../../components/input/Input";
import { Textarea } from "../../components/textarea/Textarea";

import globalStyles from "../../App.module.sass";
import modalStyles from "../Modal.module.sass";

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
  }, [booklet]);

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
        {isShow ? (
          <form className={modalStyles.form}>
            <div className={modalStyles.form_content}>
              <div className={modalStyles.part_container}>
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>
                    {t("booklets.heading_and_cover")}
                  </div>
                  <div className={modalStyles.input}>
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
                </div>
                <div className={modalStyles.part}>
                  <div className={modalStyles.cover}>
                    <input
                      ref={inputImageRef}
                      type="file"
                      id="file"
                      accept="image/png, image/jpeg"
                      onChange={handleOnChangeImage}
                      hidden
                    />
                    <div
                      className={modalStyles.form_button}
                      onClick={() => inputImageRef.current!.click()}
                    >
                      <img src={UploadImageIcon} alt="" />
                    </div>
                    {currentBooklet.imageUrl === null ||
                    currentBooklet.imageUrl.trim().length === 0 ? (
                      <div className={modalStyles.form_button_label}>
                        {t("booklets.choose_a_cover")}
                      </div>
                    ) : (
                      <div className={modalStyles.file_info}>
                        <div className={modalStyles.file_name}>
                          <img src={FileIcon} alt="" />
                          <div className={modalStyles.name}>
                            {imageName.trim().length === 0
                              ? currentBooklet.imageUrl
                              : imageName}
                          </div>
                        </div>
                        {uploadImageStatus.status !== ApiStatusType.NONE &&
                        uploadImageStatus.status !==
                          ApiStatusType.IN_PROGRESS ? (
                          <>
                            {uploadImageStatus.status ===
                            ApiStatusType.SUCCESS ? (
                              <div
                                className={`${modalStyles.upload_progress} ${modalStyles.success}`}
                              >
                                <img src={CheckIcon} alt="" />
                                {t("global.sended")}
                              </div>
                            ) : (
                              <div
                                className={`${modalStyles.upload_progress} ${modalStyles.error}`}
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
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>
                    {t("booklets.description")}
                  </div>
                  <div className={modalStyles.input}>
                    <Textarea
                      value={currentBooklet.description}
                      onChange={(value: string) =>
                        setCurrentBooklet({
                          ...currentBooklet,
                          description: value,
                        })
                      }
                      placeholder={t("booklets.enter_a_description")}
                      isRequired={true}
                    />
                  </div>
                </div>
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>
                    {t("booklets.file")}
                  </div>
                  <div className={modalStyles.cover}>
                    <input
                      ref={inputFileRef}
                      type="file"
                      id="file"
                      accept="application/pdf, .doc, .docx, image/png, image/jpeg"
                      onChange={handleOnChangeFile}
                      hidden
                    />
                    <div
                      className={`${modalStyles.form_button} ${modalStyles.filled}`}
                      onClick={() => inputFileRef.current!.click()}
                    >
                      <img src={UploadFileIcon} alt="" />
                    </div>
                    {currentBooklet.bookletFileUrl === null ||
                    currentBooklet.bookletFileUrl.trim().length === 0 ? (
                      <div className={modalStyles.form_button_label}>
                        {t("booklets.upload_file")}
                      </div>
                    ) : (
                      <div className={modalStyles.file_info}>
                        <div className={modalStyles.file_name}>
                          <img src={FileIcon} alt="" />
                          <div className={modalStyles.name}>
                            {fileName.trim().length === 0
                              ? currentBooklet.bookletFileUrl
                              : fileName}
                          </div>
                        </div>
                        {uploadFileStatus.status !== ApiStatusType.NONE &&
                        uploadFileStatus.status !==
                          ApiStatusType.IN_PROGRESS ? (
                          <>
                            {uploadFileStatus.status ===
                            ApiStatusType.SUCCESS ? (
                              <div
                                className={`${modalStyles.upload_progress} ${modalStyles.success}`}
                              >
                                <img src={CheckIcon} alt="" />
                                {t("global.sended")}
                              </div>
                            ) : (
                              <div
                                className={`${modalStyles.upload_progress} ${modalStyles.error}`}
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
              </div>
            </div>
          </form>
        ) : null}
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
