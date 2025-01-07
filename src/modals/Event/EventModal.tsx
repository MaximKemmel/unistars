import { useEffect, useState } from "react";

import { Dropdown } from "../../components/dropdown/Dropdown";
import { Toggle } from "../../components/toggle/Toggle";

import globalStyles from "../../App.module.sass";
import styles from "./EventModal.module.sass";

import { IDropdownItem } from "../../types/dropdownItem";
import { IEventType } from "../../types/eventType";
import { IToggleItem } from "../../types/toggleItem";
import { DropdownType } from "../../enums/dropdownType";
import { eventTypes } from "../../data/eventTypes";

import CloseIcon from "../../assets/svg/close.svg";
import UploadImageIcon from "../../assets/svg/upload-image.svg";

interface IEventModalProps {
  isShow: boolean;
  eventInfo: any;
  onSave: Function;
  onClose: Function;
}

export const EventModal: React.FC<IEventModalProps> = ({
  isShow,
  eventInfo,
  onSave,
  onClose,
}) => {
  const [currentInfo, setCurrentInfo] = useState(eventInfo);
  const [activeComponent, setActiveComponent] = useState(DropdownType.None);

  useEffect(() => {
    setActiveComponent(DropdownType.None);
    var formDiv = document.getElementById("form");
    formDiv?.scrollTo({ top: 0, behavior: "smooth" });
  }, [isShow]);

  useEffect(() => {
    if (activeComponent !== DropdownType.None) {
      var activeDropdownDiv = document.getElementById("active_dropdown");
      if (activeDropdownDiv) {
        var formDiv = document.getElementById("form");
        formDiv?.scrollTo({
          top: activeDropdownDiv.offsetTop - formDiv?.offsetTop - 45,
          behavior: "smooth",
        });
      }
    }
  }, [activeComponent]);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    onSave();
  };

  return (
    <div className={`${styles.modal} ${isShow ? styles.active : ""}`}>
      <div
        className={`${styles.overlay} ${isShow ? styles.active : ""}`}
        onClick={() => onClose()}
      />
      <div className={styles.modal_content}>
        <div className={styles.head}>
          <h3>
            {eventInfo.id > -1 ? "Редактирование ивента" : "Создание ивента"}
          </h3>
          <div className={styles.close} onClick={() => onClose()}>
            <img src={CloseIcon} alt="" />
          </div>
        </div>
        <form onSubmit={handleOnSubmit}>
          <div className={styles.form_content} id="form">
            <div className={styles.part_container}>
              <div className={styles.part_container_title}>Основное</div>
              <div className={`${styles.part_multi} ${styles.double}`}>
                <div className={styles.part}>
                  <div className={styles.part_label}>Название ивента</div>
                  <input
                    placeholder={"Введите название ивента"}
                    type="text"
                    required
                    onChange={(event) =>
                      setCurrentInfo({
                        ...currentInfo,
                        name: event.target.value.trim(),
                      })
                    }
                    value={currentInfo.name}
                  />
                </div>
                <div className={styles.part}>
                  <div className={styles.part_label}>Обложка ивента</div>
                  <div className={styles.cover}>
                    <div className={styles.upload}>
                      <img src={UploadImageIcon} alt="" />
                    </div>
                    <div className={styles.cover_placeholder}>
                      Выберите обложку для ивента
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${styles.part_multi} ${styles.single}`}>
                <div className={styles.part}>
                  <div className={styles.part_label}>Описание</div>
                  <textarea
                    placeholder={"Введите описание ивента"}
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
              <div className={`${styles.part_multi} ${styles.double}`}>
                <div className={styles.part}>
                  <div className={styles.part_label}>Тип ивента</div>
                  <Dropdown
                    activeComponent={activeComponent}
                    setActiveComponent={setActiveComponent}
                    dropdownIndex={DropdownType.EventType}
                    items={[
                      {
                        id: -1,
                        text: "Выберите тип ивента",
                        is_selected: currentInfo.event_type === -1,
                      } as IDropdownItem,
                      ...(eventTypes.map((typeItem: IEventType) => {
                        return {
                          id: typeItem.id,
                          text: typeItem.type,
                          is_selected: eventInfo.event_type === typeItem.id,
                        } as IDropdownItem;
                      }) as IDropdownItem[]),
                    ]}
                    onItemSelect={(item: IDropdownItem) => {
                      setCurrentInfo({ ...currentInfo, event_type: item.id });
                      setActiveComponent(DropdownType.None);
                    }}
                  />
                </div>
                <div className={styles.part}>
                  <div className={styles.part_label}>Видимость</div>
                  <Dropdown
                    activeComponent={activeComponent}
                    setActiveComponent={setActiveComponent}
                    dropdownIndex={DropdownType.EventVisibility}
                    items={[
                      {
                        id: -1,
                        text: "Выберите, кому будет доступен ивент",
                        is_selected: currentInfo.event_type === -1,
                      } as IDropdownItem,
                      ...(eventTypes.map((typeItem: IEventType) => {
                        return {
                          id: typeItem.id,
                          text: typeItem.type,
                          is_selected: eventInfo.event_type === typeItem.id,
                        } as IDropdownItem;
                      }) as IDropdownItem[]),
                    ]}
                    onItemSelect={(item: IDropdownItem) => {
                      setCurrentInfo({ ...currentInfo, event_type: item.id });
                      setActiveComponent(DropdownType.None);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className={styles.form_separator} />
            <div className={styles.part_container_multi}>
              <div className={styles.part_container}>
                <div className={styles.part_container_title}>
                  Время проведения
                </div>
                <div className={`${styles.part_multi} ${styles.single}`}>
                  <div className={styles.part}>
                    <div className={styles.part_label}>Дата</div>
                    <input
                      placeholder={"Введите дату ивента"}
                      type="text"
                      required
                      onChange={(event) =>
                        setCurrentInfo({
                          ...currentInfo,
                          date: event.target.value.trim(),
                        })
                      }
                      value={currentInfo.date}
                    />
                  </div>
                </div>
                <div className={`${styles.part_multi} ${styles.single}`}>
                  <div className={styles.part}>
                    <div className={styles.part_label}>Время</div>
                    <input
                      placeholder={"Введите время ивента"}
                      type="text"
                      required
                      onChange={(event) =>
                        setCurrentInfo({
                          ...currentInfo,
                          time: event.target.value.trim(),
                        })
                      }
                      value={currentInfo.time}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.form_separator} />
              <div className={styles.part_container}>
                <div className={styles.part_container_title}>
                  Место проведения
                </div>
                <div className={`${styles.part_multi} ${styles.single}`}>
                  <div className={styles.part}>
                    <div className={styles.part_label}>Форма ивента</div>
                    <Toggle
                      selectedIndex={currentInfo.event_kind}
                      items={
                        [
                          {
                            id: 0,
                            text: "Офлайн",
                          } as IToggleItem,
                          {
                            id: 1,
                            text: "Онлайн",
                          } as IToggleItem,
                        ] as IToggleItem[]
                      }
                      onItemSelect={(item: IToggleItem) => setCurrentInfo({...currentInfo, event_kind: item.id})}
                    />
                  </div>
                </div>
                <div className={`${styles.part_multi} ${styles.single}`}>
                  <div className={styles.part}>
                    <div className={styles.part_label}>Место проведения</div>
                    <input
                      placeholder={"Введите место проведения ивента"}
                      type="text"
                      required
                      onChange={(event) =>
                        setCurrentInfo({
                          ...currentInfo,
                          place: event.target.value.trim(),
                        })
                      }
                      value={currentInfo.place}
                    />
                  </div>
                </div>
                <div className={`${styles.part_multi} ${styles.single}`}>
                  <div className={styles.part}>
                    <div className={styles.part_label}>
                      Ссылка на дополнительную информацию
                    </div>
                    <input
                      placeholder={
                        "Введите ссылку на сайт или другие источники"
                      }
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
                </div>
              </div>
            </div>
          </div>
          <div className={styles.form_actions}>
            <button
              className={`${globalStyles.inverted} ${globalStyles.small}`}
              type="button"
            >
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
