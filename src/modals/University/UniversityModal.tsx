import { useState } from "react";

import globalStyles from "../../App.module.sass";
import styles from "./UniversityModal.module.sass";

import CloseIcon from "../../assets/svg/close.svg";
import LocationIcon from "../../assets/svg/location.svg";
import InfoIcon from "../../assets/svg/info.svg";

interface IUniversityModalProps {
  isShow: boolean;
  universityInfo: any;
  onSave: Function;
  onClose: Function;
}

export const UniversityModal: React.FC<IUniversityModalProps> = ({ isShow, universityInfo, onSave, onClose }) => {
  const [currentInfo, setCurrentInfo] = useState(universityInfo);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    onSave();
  };

  return (
    <div className={`${styles.modal} ${isShow ? styles.active : ""}`}>
      <div className={`${styles.overlay} ${isShow ? styles.active : ""}`} onClick={() => onClose()} />
      <div className={styles.modal_content}>
        <div className={styles.head}>
          <h4>{universityInfo ? "Редактирование данных об университете" : "Об университете"}</h4>
          <div className={styles.close} onClick={() => onClose()}>
            <img src={CloseIcon} alt="" />
          </div>
        </div>
        <form onSubmit={handleOnSubmit}>
          <div className={styles.form_content}>
            <div className={styles.part_container}>
              <div className={styles.part_container_title}>Основное</div>
              <div className={`${styles.part_multi} ${styles.double}`}>
                <div className={styles.part}>
                  <div className={styles.part_label}>Полное наименование университета</div>
                  <input
                    placeholder={"Введите заголовок"}
                    type="text"
                    required
                    onChange={(event) =>
                      setCurrentInfo({
                        ...currentInfo,
                        fullName: event.target.value.trim(),
                      })
                    }
                    value={currentInfo.fullName}
                  />
                </div>
                <div className={styles.part}>
                  <div className={styles.part_label}>Дата основания</div>
                  <input
                    placeholder={"DD.MM.YYYY"}
                    type="text"
                    required
                    onChange={(event) =>
                      setCurrentInfo({
                        ...currentInfo,
                        birthDate: event.target.value.trim(),
                      })
                    }
                    value={currentInfo.birthDate}
                  />
                </div>
              </div>
              <div className={`${styles.part_multi} ${styles.single}`}>
                <div className={styles.part}>
                  <div className={styles.part_label}>Описание</div>
                  <textarea
                    placeholder={"Это описание отображается при просмотре основной страницы"}
                    required
                    onChange={(event) =>
                      setCurrentInfo({
                        ...currentInfo,
                        description: event.target.value.trim(),
                      })
                    }
                    value={currentInfo.description}
                  />
                </div>
              </div>
              <div className={`${styles.part_multi} ${styles.triple}`}>
                <div className={styles.part}>
                  <div className={styles.part_label}>Страна</div>
                  <input
                    placeholder={"Выберите вашу страну"}
                    type="text"
                    required
                    onChange={(event) =>
                      setCurrentInfo({
                        ...currentInfo,
                        country: event.target.value.trim(),
                      })
                    }
                    value={currentInfo.country}
                  />
                </div>
                <div className={styles.part}>
                  <div className={styles.part_label}>Город</div>
                  <input
                    placeholder={"Выберите ваш город"}
                    type="text"
                    required
                    onChange={(event) =>
                      setCurrentInfo({
                        ...currentInfo,
                        city: event.target.value.trim(),
                      })
                    }
                    value={currentInfo.city}
                  />
                </div>
                <div className={styles.part}>
                  <div className={styles.part_label}>Местонахождение</div>
                  <div className={styles.location_selector}>
                    <img src={LocationIcon} alt="" />
                    <div className={styles.selector_label}>Определить местоположение</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.form_separator} />
            <div className={styles.part_container}>
              <div className={styles.part_container_title}>Контакты</div>
              <div className={`${styles.part_multi} ${styles.triple}`}>
                <div className={styles.part}>
                  <div className={styles.part_label}>Телефон</div>
                  <input
                    placeholder={"(___) ___-__-__"}
                    type="text"
                    required
                    onChange={(event) =>
                      setCurrentInfo({
                        ...currentInfo,
                        phone: event.target.value.trim(),
                      })
                    }
                    value={currentInfo.phone}
                  />
                </div>
                <div className={styles.part}>
                  <div className={styles.part_label}>Сайт</div>
                  <input
                    placeholder={"Введите адрес сайта"}
                    type="text"
                    required
                    onChange={(event) =>
                      setCurrentInfo({
                        ...currentInfo,
                        site: event.target.value.trim(),
                      })
                    }
                    value={currentInfo.site}
                  />
                </div>
                <div className={styles.part}>
                  <div className={styles.part_label}>E-mail</div>
                  <input
                    placeholder={"Введите E-mail"}
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
                </div>
              </div>
            </div>
            <div className={styles.form_separator} />
            <div className={styles.part_container}>
              <div className={styles.part_container_title}>Ссылки на разделы сайта</div>
              <div className={`${styles.part_multi} ${styles.double}`}>
                <div className={styles.part}>
                  <div className={styles.part_label}>
                    Поступление
                    <img src={InfoIcon} alt="" />
                  </div>
                  <input
                    placeholder={"Введите адрес сайта"}
                    type="text"
                    required
                    onChange={(event) =>
                      setCurrentInfo({
                        ...currentInfo,
                        postupUrl: event.target.value.trim(),
                      })
                    }
                    value={currentInfo.postupUrl}
                  />
                </div>
                <div className={styles.part}>
                  <div className={styles.part_label}>
                    Карьера
                    <img src={InfoIcon} alt="" />
                  </div>
                  <input
                    placeholder={"Введите адрес сайта"}
                    type="text"
                    required
                    onChange={(event) =>
                      setCurrentInfo({
                        ...currentInfo,
                        careerUrl: event.target.value.trim(),
                      })
                    }
                    value={currentInfo.careerUrl}
                  />
                </div>
              </div>
              <div className={`${styles.part_multi} ${styles.double}`}>
                <div className={styles.part}>
                  <div className={styles.part_label}>
                    Вопросы и ответы
                    <img src={InfoIcon} alt="" />
                  </div>
                  <input
                    placeholder={"Введите адрес сайта"}
                    type="text"
                    required
                    onChange={(event) =>
                      setCurrentInfo({
                        ...currentInfo,
                        faqUrl: event.target.value.trim(),
                      })
                    }
                    value={currentInfo.faqUrl}
                  />
                </div>
                <div className={styles.part}>
                  <div className={styles.part_label}>
                    Подготовительные курсы
                    <img src={InfoIcon} alt="" />
                  </div>
                  <input
                    placeholder={"Введите адрес сайта"}
                    type="text"
                    required
                    onChange={(event) =>
                      setCurrentInfo({
                        ...currentInfo,
                        coursesUrl: event.target.value.trim(),
                      })
                    }
                    value={currentInfo.coursesUrl}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.form_actions}>
            <button className={`${globalStyles.inverted} ${globalStyles.small}`} type="button">
              <span>Отменить</span>
            </button>
            <button className={globalStyles.small} type="submit">
              Сохранить изменения
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
