import React, { useEffect, useState } from "react";
import {useTranslation} from "react-i18next";

import globalStyles from "../../App.module.sass";
import modalStyles from "../Modal.module.sass";

import { Close as CloseIcon } from "../../assets/svgComponents/Close";
import UploadImageIcon from "../../assets/svg/upload-image.svg";

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
  const [currentInfo, setCurrentInfo] = useState({
    name: "",
    description: "",
    bannerUrl: "",
    email: "",
    dateStart: "",
    dateEnd: ""
  });

  useEffect(() => {
    const formDiv = document.getElementById("form");
    formDiv?.scrollTo({ top: 0, behavior: "smooth" });
  }, [isShow]);

  const handleOnSubmit = (event: any) => {
    event.preventDefault();
    onSave();
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
                  <div className={modalStyles.part_label}>{t("advertisements.heading")}</div>
                  <input
                    placeholder={t("advertisements.enter_a_heading")}
                    type="text"
                    required
                    onChange={(event) =>
                      setCurrentInfo({
                        ...currentInfo,
                        name: event.target.value.trim(),
                      })
                    }
                    value={currentInfo.name}
                    maxLength={16}
                  />
                  <div
                    className={modalStyles.input_length}
                  >{`${currentInfo.name.length}/16`}</div>
                </div>
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>{t("advertisements.subtitle")}</div>
                  <input
                    placeholder={t("advertisements.enter_a_subtitle")}
                    type="text"
                    required
                    onChange={(event) =>
                      setCurrentInfo({
                        ...currentInfo,
                        description: event.target.value.trim(),
                      })
                    }
                    value={currentInfo.description}
                    maxLength={56}
                  />
                  <div
                    className={modalStyles.input_length}
                  >{`${currentInfo.description.length}/56`}</div>
                </div>
              </div>
              <div
                className={`${modalStyles.part_multi} ${modalStyles.double}`}
              >
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>{t("advertisements.banner_cover")}</div>
                  <div className={modalStyles.cover}>
                    <div className={modalStyles.upload}>
                      <img src={UploadImageIcon} alt="" />
                    </div>
                    <div className={modalStyles.cover_placeholder}>
                      {t("advertisements.choose_cover")}
                    </div>
                  </div>
                </div>
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>
                    {`${t("advertisements.link_to_the_banner")} *`}
                  </div>
                  <input
                    placeholder={t("advertisements.enter_a_link")}
                    type="text"
                    required
                    onChange={(event) =>
                      setCurrentInfo({
                        ...currentInfo,
                        bannerUrl: event.target.value.trim(),
                      })
                    }
                    value={currentInfo.bannerUrl}
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
                      onChange={(event) =>
                        setCurrentInfo({
                          ...currentInfo,
                          dateStart: event.target.value.trim(),
                        })
                      }
                      value={currentInfo.dateStart}
                    />
                    <div className={modalStyles.separator}>-</div>
                    <input
                      placeholder={"DD.MM.YYYY"}
                      type="text"
                      required
                      onChange={(event) =>
                        setCurrentInfo({
                          ...currentInfo,
                          dateEnd: event.target.value.trim(),
                        })
                      }
                      value={currentInfo.dateEnd}
                    />
                  </div>
                </div>
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>E-mail</div>
                  <input
                    placeholder={"example@mail.ru"}
                    type="text"
                    required
                    onChange={(event) =>
                      setCurrentInfo({
                        ...currentInfo,
                        email: event.target.value.trim(),
                      })
                    }
                    value={currentInfo.email}
                  />
                  <div className={modalStyles.input_description}>
                    {t("advertisements.manager_will_write")}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={modalStyles.actions}>
            <div />
            <button className={globalStyles.small} type="submit">
              {t("advertisements.create_ad")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
