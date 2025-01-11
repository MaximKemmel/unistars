import React, { useEffect, useState } from "react";

import { Dropdown } from "../../components/dropdown/Dropdown";
import { Toggle } from "../../components/toggle/Toggle";

import globalStyles from "../../App.module.sass";
import modalStyles from "../Modal.module.sass";

import { IDropdownItem } from "../../types/local/dropdownItem";
import { IEventType } from "../../types/local/eventType";
import { IToggleItem } from "../../types/local/toggleItem";
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

export const EventModal: React.FC<IEventModalProps> = ({ isShow, eventInfo, onSave, onClose }) => {
  const [currentInfo, setCurrentInfo] = useState(eventInfo);
  const [activeComponent, setActiveComponent] = useState(DropdownType.None);

  useEffect(() => {
    setActiveComponent(DropdownType.None);
    const formDiv = document.getElementById("form");
    formDiv?.scrollTo({ top: 0, behavior: "smooth" });
  }, [isShow]);

  useEffect(() => {
    if (activeComponent !== DropdownType.None) {
      const activeDropdownDiv = document.getElementById("active_dropdown");
      if (activeDropdownDiv) {
        const formDiv = document.getElementById("form");
        formDiv?.scrollTo({
          top: activeDropdownDiv.offsetTop - formDiv?.offsetTop - 45,
          behavior: "smooth",
        });
      }
    }
  }, [activeComponent]);

  const handleOnSubmit = (event: any) => {
    event.preventDefault();
    onSave();
  };

  return (
    <div className={`${modalStyles.modal} ${isShow ? modalStyles.active : ""}`}>
      <div className={`${modalStyles.overlay} ${isShow ? modalStyles.active : ""}`} onClick={() => onClose()} />
      <div className={`${modalStyles.modal_content} ${modalStyles.wide}`}>
        <div className={modalStyles.head}>
          <h4>{eventInfo.id > -1 ? "Редактирование ивента" : "Создание ивента"}</h4>
          <div className={modalStyles.close} onClick={() => onClose()}>
            <img src={CloseIcon} alt="" />
          </div>
        </div>
        <form onSubmit={handleOnSubmit} className={modalStyles.form}>
          <div className={modalStyles.form_content} id="form">
            <div className={modalStyles.part_container}>
              <div className={modalStyles.part_container_title}>Основное</div>
              <div className={`${modalStyles.part_multi} ${modalStyles.double}`}>
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>Название ивента</div>
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
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>Обложка ивента</div>
                  <div className={modalStyles.cover}>
                    <div className={modalStyles.upload}>
                      <img src={UploadImageIcon} alt="" />
                    </div>
                    <div className={modalStyles.cover_placeholder}>Выберите обложку для ивента</div>
                  </div>
                </div>
              </div>
              <div className={modalStyles.part}>
                <div className={modalStyles.part_label}>Описание</div>
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
              <div className={`${modalStyles.part_multi} ${modalStyles.double}`}>
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>Тип ивента</div>
                  <Dropdown
                    placeholder="Выберите тип ивента"
                    activeComponent={activeComponent}
                    setActiveComponent={setActiveComponent}
                    dropdownIndex={DropdownType.EventType}
                    items={[
                      {
                        id: -1,
                        text: "Не выбрано",
                        is_selected: currentInfo.event_type === -1,
                      } as IDropdownItem,
                      ...(eventTypes.map((typeItem: IEventType) => {
                        return {
                          id: typeItem.id,
                          text: typeItem.type,
                          is_selected: currentInfo.event_type === typeItem.id,
                        } as IDropdownItem;
                      }) as IDropdownItem[]),
                    ]}
                    onItemSelect={(item: IDropdownItem) => {
                      setCurrentInfo({ ...currentInfo, event_type: item.id });
                      setActiveComponent(DropdownType.None);
                    }}
                  />
                </div>
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>Видимость</div>
                  <Dropdown
                    placeholder="Выберите, кому будет доступен ивент"
                    activeComponent={activeComponent}
                    setActiveComponent={setActiveComponent}
                    dropdownIndex={DropdownType.EventVisibility}
                    items={[
                      {
                        id: -1,
                        text: "Не выбрано",
                        is_selected: currentInfo.event_visibility === -1,
                      } as IDropdownItem,
                      ...(eventTypes.map((typeItem: IEventType) => {
                        return {
                          id: typeItem.id,
                          text: typeItem.type,
                          is_selected: currentInfo.event_visibility === typeItem.id,
                        } as IDropdownItem;
                      }) as IDropdownItem[]),
                    ]}
                    onItemSelect={(item: IDropdownItem) => {
                      setCurrentInfo({
                        ...currentInfo,
                        event_visibility: item.id,
                      });
                      setActiveComponent(DropdownType.None);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className={modalStyles.form_separator} />
            <div className={modalStyles.part_container_multi}>
              <div className={modalStyles.part_container}>
                <div className={modalStyles.part_container_title}>Время проведения</div>
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>Дата</div>
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
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>Время</div>
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
              <div className={modalStyles.form_separator} />
              <div className={modalStyles.part_container}>
                <div className={modalStyles.part_container_title}>Место проведения</div>
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>Форма ивента</div>
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
                    onItemSelect={(item: IToggleItem) => setCurrentInfo({ ...currentInfo, event_kind: item.id })}
                  />
                </div>
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>Место проведения</div>
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
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>Ссылка на дополнительную информацию</div>
                  <input
                    placeholder={"Введите ссылку на сайт или другие источники"}
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
          <div className={modalStyles.actions}>
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
