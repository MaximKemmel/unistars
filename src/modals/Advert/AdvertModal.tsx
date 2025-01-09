import { useEffect, useState } from "react";

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
  const [currentInfo, setCurrentInfo] = useState({
    name: "",
    description: "",
    bannerUrl: "",
    email: "",
    dateStart: "",
    dateEnd: ""
  });

  useEffect(() => {
    var formDiv = document.getElementById("form");
    formDiv?.scrollTo({ top: 0, behavior: "smooth" });
  }, [isShow]);

  const handleOnSubmit = (event) => {
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
          <h4>Создание рекламы</h4>
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
                  <div className={modalStyles.part_label}>Заголовок</div>
                  <input
                    placeholder={"Введите заголовок"}
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
                  <div className={modalStyles.part_label}>Подзаголовок</div>
                  <input
                    placeholder={"Введите подзаголовок"}
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
                  <div className={modalStyles.part_label}>Обложка баннера</div>
                  <div className={modalStyles.cover}>
                    <div className={modalStyles.upload}>
                      <img src={UploadImageIcon} alt="" />
                    </div>
                    <div className={modalStyles.cover_placeholder}>
                      Выберите обложку для баннера
                    </div>
                  </div>
                </div>
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>
                    Ссылка на баннер *
                  </div>
                  <input
                    placeholder={"Введите ссылку"}
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
                    Продолжительность рекламы
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
                    На эту почту вам напишет менеджер
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={modalStyles.actions}>
            <div />
            <button className={globalStyles.small} type="submit">
              Создать рекламу
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};