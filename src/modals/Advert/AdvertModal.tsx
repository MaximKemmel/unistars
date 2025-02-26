import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import validator from "validator";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import { Input } from "../../components/input/Input";
import { Calendar } from "../../components/calendar/Calendar";

import globalStyles from "../../App.module.sass";
import modalStyles from "../Modal.module.sass";

import { initAdvert } from "../../types/advert/initAdvert";
import { ApiStatusType } from "../../enums/local/apiStatusType";

import { Close as CloseIcon } from "../../assets/svgComponents/Close";
import UploadImageIcon from "../../assets/svg/upload-image.svg";
import FileIcon from "../../assets/svg/file.svg";
import CheckIcon from "../../assets/svg/circled-check.svg";

interface IAdvertModalProps {
  isShow: boolean;
  onSave: Function;
  onClose: Function;
}

export const AdvertModal: React.FC<IAdvertModalProps> = ({
  isShow,
  onSave,
  onClose,
}) => {
  const { t } = useTranslation();
  const { uploadAdvertCover } = useActions();
  const [currentAdvert, setCurrentAdvert] = useState(initAdvert());
  const universityInfo = useTypedSelector(
    (state) => state.universityReducer.universityProfile,
  );
  const inputImageRef = useRef<HTMLInputElement>(null);
  const [uploadImageProgress, setUploadImageProgress] = useState(-1);
  const uploadImageStatus = useTypedSelector(
    (state) => state.advertReducer.uploadCoverStatus,
  );
  const advertCover = useTypedSelector(
    (state) => state.advertReducer.advertCover,
  );
  const [imageName, setImageName] = useState("");
  const [startDate, setStartDate] = useState(new Date("01.01.1900"));
  const [endDate, setEndDate] = useState(new Date("01.01.1900"));
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    setCurrentAdvert(initAdvert());
    setStartDate(new Date("01.01.1900"));
    setEndDate(new Date("01.01.1900"));
  }, [isShow]);

  useEffect(() => {
    if (uploadImageProgress === 100) {
      setUploadImageProgress(-1);
    }
  }, [uploadImageProgress]);

  useEffect(() => {
    switch (uploadImageStatus.status) {
      case ApiStatusType.SUCCESS:
        setCurrentAdvert({
          ...currentAdvert,
          imageUrl: Object.values(advertCover)[0],
        });
        break;
    }
  }, [uploadImageStatus]);

  useEffect(() => {
    setIsButtonEnabled(
      currentAdvert.title.trim().length > 0 &&
        currentAdvert.subtitle.trim().length > 0 &&
        currentAdvert.imageUrl.trim().length > 0 &&
        currentAdvert.email!.trim().length > 0 &&
        currentAdvert.websiteUrl!.trim().length > 0 &&
        validator.isEmail(currentAdvert.email!) &&
        startDate.getFullYear() > 2010 &&
        endDate.getFullYear() > 2010,
    );
  }, [currentAdvert, startDate, endDate]);

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
        uploadAdvertCover({
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

  return (
    <div className={`${modalStyles.modal} ${isShow ? modalStyles.active : ""}`}>
      <div
        className={`${modalStyles.overlay} ${isShow ? modalStyles.active : ""}`}
        onClick={() => onClose()}
      />
      <div className={`${modalStyles.modal_content} ${modalStyles.wide}`}>
        <div className={modalStyles.head}>
          <h4>{t("advertisements.creating_a_advertisement")}</h4>
          <div className={modalStyles.close} onClick={() => onClose()}>
            <CloseIcon />
          </div>
        </div>
        {isShow ? (
          <form className={modalStyles.form}>
            <div className={modalStyles.form_content} id="form">
              <div className={modalStyles.part_container}>
                <div
                  className={`${modalStyles.part_multi} ${modalStyles.double}`}
                >
                  <div className={modalStyles.part}>
                    <div className={modalStyles.part_label}>
                      {t("advertisements.heading")}
                    </div>
                    <div className={modalStyles.input}>
                      <Input
                        value={currentAdvert.title}
                        onChange={(value: string) =>
                          setCurrentAdvert({
                            ...currentAdvert,
                            title: value,
                          })
                        }
                        placeholder={t("advertisements.enter_a_heading")}
                        type="text"
                        isRequired={true}
                        maxLength={16}
                      />
                    </div>
                    <div
                      className={modalStyles.input_length}
                    >{`${currentAdvert.title.length}/16`}</div>
                  </div>
                  <div className={modalStyles.part}>
                    <div className={modalStyles.part_label}>
                      {t("advertisements.subtitle")}
                    </div>
                    <div className={modalStyles.input}>
                      <Input
                        value={currentAdvert.subtitle}
                        onChange={(value: string) =>
                          setCurrentAdvert({
                            ...currentAdvert,
                            subtitle: value,
                          })
                        }
                        placeholder={t("advertisements.enter_a_subtitle")}
                        type="text"
                        maxLength={56}
                      />
                    </div>
                    <div
                      className={modalStyles.input_length}
                    >{`${currentAdvert.subtitle.length}/56`}</div>
                  </div>
                </div>
                <div
                  className={`${modalStyles.part_multi} ${modalStyles.double}`}
                >
                  <div className={modalStyles.part}>
                    <div className={modalStyles.part_label}>
                      {t("advertisements.banner_cover")}
                    </div>
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
                      {currentAdvert.imageUrl.trim().length < 5 ? (
                        <div className={modalStyles.form_button_label}>
                          {t("advertisements.choose_cover")}
                        </div>
                      ) : (
                        <div className={modalStyles.file_info}>
                          <div className={modalStyles.file_name}>
                            <img src={FileIcon} alt="" />
                            <div className={modalStyles.name}>
                              {imageName.trim().length === 0
                                ? currentAdvert.imageUrl
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
                    <div
                      className={modalStyles.part_label}
                    >{`${t("advertisements.link_to_the_banner")} *`}</div>
                    <div className={modalStyles.input}>
                      <Input
                        value={currentAdvert.websiteUrl ?? ""}
                        onChange={(value: string) =>
                          setCurrentAdvert({
                            ...currentAdvert,
                            websiteUrl: value,
                          })
                        }
                        placeholder={t("advertisements.enter_a_link")}
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className={`${modalStyles.part_multi} ${modalStyles.double}`}
                >
                  <div className={modalStyles.part}>
                    <div className={modalStyles.part_label}>
                      {t("advertisements.duration")}
                    </div>
                    <div className={modalStyles.input_multi}>
                      <Calendar
                        date={startDate}
                        setDate={setStartDate}
                        maxDate={
                          endDate.getFullYear() === 1900
                            ? new Date("01.01.2100")
                            : endDate
                        }
                      />
                      <div className={modalStyles.separator}>-</div>
                      <Calendar
                        date={endDate}
                        setDate={setEndDate}
                        minDate={startDate}
                      />
                    </div>
                  </div>
                  <div className={modalStyles.part}>
                    <div className={modalStyles.part_label}>E-mail</div>
                    <div className={modalStyles.input}>
                      <Input
                        value={currentAdvert.email ?? ""}
                        onChange={(value: string) =>
                          setCurrentAdvert({
                            ...currentAdvert,
                            email: value,
                          })
                        }
                        placeholder={"example@mail.ru"}
                        type="text"
                      />
                    </div>
                    <div className={modalStyles.input_description}>
                      {t("advertisements.manager_will_write")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        ) : null}
        <div className={modalStyles.actions}>
          <div />
          <button
            className={globalStyles.small}
            type="button"
            onClick={() =>
              onSave({
                ...currentAdvert,
                startDate: startDate,
                endDate: endDate,
                universityId: universityInfo.id,
              })
            }
            disabled={!isButtonEnabled}
          >
            {t("advertisements.create_ad")}
          </button>
        </div>
      </div>
    </div>
  );
};
