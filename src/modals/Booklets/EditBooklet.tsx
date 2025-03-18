import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import { Input } from "../../components/input/Input";
import { Textarea } from "../../components/textarea/Textarea";
import { Uploader } from "../../components/uploader/Uploader";

import globalStyles from "../../App.module.sass";
import modalStyles from "../Modal.module.sass";

import { IBooklet } from "../../types/booklet/booklet";
import { ApiStatusType } from "../../enums/local/apiStatusType";
import { initApiStatus } from "../../types/local/apiStatus";

import { Close as CloseIcon } from "../../assets/svgComponents/Close";
import { Trash as TrashIcon } from "../../assets/svgComponents/Trash";

interface IEditBookletModalProps {
  isShow: boolean;
  booklet: IBooklet;
  onSave: Function;
  onDelete: Function;
  onClose: Function;
  onError: Function;
}

export const EditBookletModal: React.FC<IEditBookletModalProps> = ({
  isShow,
  booklet,
  onSave,
  onDelete,
  onClose,
  onError,
}) => {
  const { t } = useTranslation();
  const {
    uploadBookletCover,
    uploadBookletFile,
    setUploadCoverStatus,
    setUploadFileStatus,
  } = useActions();
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
  const [imageData, setImageData] = useState(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [uploadFileProgress, setUploadFileProgress] = useState(-1);
  const uploadFileStatus = useTypedSelector(
    (state) => state.bookletReducer.uploadFileStatus,
  );
  const bookletFile = useTypedSelector(
    (state) => state.bookletReducer.bookletFile,
  );
  const [fileName, setFileName] = useState("");
  const [fileData, setFileData] = useState(null);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    setCurrentBooklet(booklet);
    setImageName("");
    setImageData(null);
    setFileName("");
    setFileData(null);
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
    switch (uploadImageStatus.status) {
      case ApiStatusType.SUCCESS:
        setCurrentBooklet({
          ...currentBooklet,
          imageUrl: Object.values(bookletCover)[0],
        });
        setUploadImageProgress(-1);
        break;
      case ApiStatusType.ERROR:
        setUploadImageProgress(-1);
        onError(uploadImageStatus.error ?? "Server error!");
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
        setUploadFileProgress(-1);
        break;
      case ApiStatusType.ERROR:
        setUploadFileProgress(-1);
        onError(uploadFileStatus.error ?? "Server error!");
        break;
    }
  }, [uploadFileStatus]);

  const handleOnChangeImage = (event) => {
    try {
      const file = event.target.files[0];
      if (
        file.name.endsWith(".png") ||
        file.name.endsWith(".jpg") ||
        file.name.endsWith(".jpeg") ||
        file.name.endsWith(".bmp")
      ) {
        setImageName(file.name);
        setImageData(file);
        setUploadCoverStatus(initApiStatus());
        uploadBookletCover({
          file: file,
          onUploadProgress: (data) => {
            setUploadImageProgress(
              Math.round(100 * (data.loaded / data.total!)),
            );
          },
        });
      } else {
        onError("неверный формат");
      }
      event.target.value = "";
    } catch (error) {
      onError(error);
    }
  };

  const handleOnChangeFile = (event) => {
    try {
      const file = event.target.files[0];
      setFileName(file.name);
      setFileData(file);
      setUploadFileStatus(initApiStatus());
      uploadBookletFile({
        file: file,
        onUploadProgress: (data) => {
          setUploadFileProgress(Math.round(100 * (data.loaded / data.total!)));
        },
      });
      event.target.value = "";
    } catch (error) {
      onError(error);
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
                      maxLength={255}
                    />
                  </div>
                </div>
                <div className={modalStyles.part}>
                  <input
                    ref={inputImageRef}
                    type="file"
                    id="file"
                    accept="image/png, image/jpeg"
                    onChange={handleOnChangeImage}
                    hidden
                  />
                  <Uploader
                    path={
                      imageName.trim().length === 0
                        ? currentBooklet.imageUrl
                        : imageName
                    }
                    status={uploadImageStatus.status}
                    title={t("booklets.choose_a_cover")}
                    onClick={() => {
                      if (uploadImageProgress === -1) {
                        inputImageRef.current!.click();
                      }
                    }}
                    onRetry={() => {
                      setUploadCoverStatus(initApiStatus());
                      uploadBookletCover({
                        file: imageData! as Blob,
                        onUploadProgress: (data) => {
                          setUploadImageProgress(
                            Math.round(100 * (data.loaded / data.total!)),
                          );
                        },
                      });
                    }}
                    onClear={() => {
                      setCurrentBooklet({
                        ...currentBooklet,
                        imageUrl: "",
                      });
                      setImageName("");
                      setImageData(null);
                    }}
                    isDisabled={
                      imageName.trim().length +
                        currentBooklet.imageUrl.trim().length >
                      0
                    }
                  />
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
                    />
                  </div>
                </div>
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>
                    {t("booklets.file")}
                  </div>
                  <input
                    ref={inputFileRef}
                    type="file"
                    id="file"
                    accept="application/pdf, .doc, .docx, image/png, image/jpeg"
                    onChange={handleOnChangeFile}
                    hidden
                  />
                  <Uploader
                    path={
                      fileName.trim().length === 0
                        ? currentBooklet.bookletFileUrl
                        : fileName
                    }
                    status={uploadFileStatus.status}
                    title={t("booklets.upload_file")}
                    onClick={() => {
                      if (uploadFileProgress === -1) {
                        inputFileRef.current!.click();
                      }
                    }}
                    onRetry={() => {
                      setUploadFileStatus(initApiStatus());
                      uploadBookletFile({
                        file: fileData! as Blob,
                        onUploadProgress: (data) => {
                          setUploadFileProgress(
                            Math.round(100 * (data.loaded / data.total!)),
                          );
                        },
                      });
                    }}
                    onClear={() => {
                      setCurrentBooklet({
                        ...currentBooklet,
                        bookletFileUrl: "",
                      });
                      setFileName("");
                      setFileData(null);
                    }}
                    isDisabled={
                      fileName.trim().length +
                        currentBooklet.bookletFileUrl.trim().length >
                      0
                    }
                  />
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
