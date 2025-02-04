import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { Input } from "../../components/input/Input";

import globalStyles from "../../App.module.sass";
import modalStyles from "../Modal.module.sass";
import styles from "./Advert.module.sass";

import { initAdvert } from "../../types/advert/initAdvert";

import { Close as CloseIcon } from "../../assets/svgComponents/Close";
import UploadImageIcon from "../../assets/svg/upload-image.svg";
import FileIcon from "../../assets/svg/file.svg";
import CheckIcon from "../../assets/svg/circled-check.svg";

interface IAdvertModalProps {
  isShow: boolean;
  onSave: Function;
  onClose: Function;
}

//TODO: Календари для дат, отсутствует свойство для e-mail
export const AdvertModal: React.FC<IAdvertModalProps> = ({
  isShow,
  onSave,
  onClose,
}) => {
  const { t } = useTranslation();
  const [currentAdvert, setCurrentAdvert] = useState(initAdvert());
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [isImageUploadSuccess, setIsImageUploadSuccess] = useState(true);
  const inputImageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const formDiv = document.getElementById("form");
    formDiv?.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentAdvert(initAdvert());
  }, [isShow]);

  const handleOnSubmit = (event: any) => {
    event.preventDefault();
    onSave();
  };

  const handleOnChangeImage = (event) => {
    try {
      const file = event.target.files[0];
      setCurrentAdvert({ ...currentAdvert, imageUrl: file.name });
      setIsImageUploadSuccess(true);
      setIsImageUploaded(true);
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
        <form onSubmit={handleOnSubmit} className={modalStyles.form}>
          <div className={modalStyles.form_content} id="form">
            <div className={modalStyles.part_container}>
              <div
                className={`${modalStyles.part_multi} ${modalStyles.double}`}
              >
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>
                    {t("advertisements.heading")}
                  </div>
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
                  <div
                    className={modalStyles.input_length}
                  >{`${currentAdvert.title.length}/16`}</div>
                </div>
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>
                    {t("advertisements.subtitle")}
                  </div>
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
                    {currentAdvert.imageUrl.trim().length === 0 ? (
                      <div className={styles.form_button_label}>
                        {t("advertisements.choose_cover")}
                      </div>
                    ) : (
                      <div className={styles.file_info}>
                        <div className={styles.file_name}>
                          <img src={FileIcon} alt="" />
                          <div className={styles.name}>
                            {currentAdvert.imageUrl}
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
                </div>
                <div className={modalStyles.part}>
                  <div
                    className={modalStyles.part_label}
                  >{`${t("advertisements.link_to_the_banner")} *`}</div>
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
              <div
                className={`${modalStyles.part_multi} ${modalStyles.double}`}
              >
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>
                    {t("advertisements.duration")}
                  </div>
                  <div className={modalStyles.input_multi}>
                    <input
                      placeholder={"DD.MM.YYYY"}
                      type="text"
                      required
                      onChange={(_event) =>
                        setCurrentAdvert({
                          ...currentAdvert,
                          startDate: new Date(),
                        })
                      }
                      value={currentAdvert.startDate?.toDateString()}
                    />
                    <div className={modalStyles.separator}>-</div>
                    <input
                      placeholder={"DD.MM.YYYY"}
                      type="text"
                      required
                      onChange={(_event) =>
                        setCurrentAdvert({
                          ...currentAdvert,
                          endDate: new Date(),
                        })
                      }
                      value={currentAdvert.endDate?.toDateString()}
                    />
                  </div>
                </div>
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>E-mail</div>
                  <Input
                    value={currentAdvert.subtitle}
                    onChange={(value: string) =>
                      setCurrentAdvert({
                        ...currentAdvert,
                        subtitle: value,
                      })
                    }
                    placeholder={"example@mail.ru"}
                    type="text"
                  />
                  <div className={modalStyles.input_description}>
                    {t("advertisements.manager_will_write")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className={modalStyles.actions}>
          <div />
          <button className={globalStyles.small} type="submit">
            {t("advertisements.create_ad")}
          </button>
        </div>
      </div>
    </div>
  );
};
