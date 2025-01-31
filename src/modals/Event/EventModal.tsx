import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useTypedSelector } from "../../hooks/useTypedSelector";

import { Dropdown } from "../../components/dropdown/Dropdown";
import { Toggle } from "../../components/toggle/Toggle";

import globalStyles from "../../App.module.sass";
import modalStyles from "../Modal.module.sass";

import { IEvent } from "../../types/event/event";
import { IEventType } from "../../types/event/eventType";
import { IDropdownItem } from "../../types/local/dropdownItem";
import { IToggleItem } from "../../types/local/toggleItem";

import CloseIcon from "../../assets/svg/close.svg";
import UploadImageIcon from "../../assets/svg/upload-image.svg";
import { IEventPrivacy } from "src/types/event/eventPrivacy";

interface IEventModalProps {
  isShow: boolean;
  eventInfo: IEvent;
  onSave: Function;
  onClose: Function;
}

export const EventModal: React.FC<IEventModalProps> = ({
  isShow,
  eventInfo,
  onSave,
  onClose,
}) => {
  const { t } = useTranslation();
  const eventTypes = useTypedSelector((state) => state.eventReducer.eventTypes);
  const [currentInfo, setCurrentInfo] = useState(eventInfo);
  const [isOnline, setIsOnline] = useState(
    eventInfo.link != undefined && eventInfo.link.trim().length > 0,
  );
  const privacyValues = [
    {
      id: 0,
      name: "Всем пользователям приложения",
      nameEnglish: "All users in the app",
      roles: [
        "AMBASSADOR",
        "APPLICANT",
        "ALL_CONFIRMED_APPLICANT",
        "ALL_STUDENT",
        "SUBSCRIBER",
      ],
    },
    {
      id: 1,
      name: "Только вашим подписчикам",
      nameEnglish: "Only to your subscribers",
      roles: ["SUBSCRIBER"],
    },
  ] as IEventPrivacy[];

  useEffect(() => {
    const formDiv = document.getElementById("form");
    formDiv?.scrollTo({ top: 0, behavior: "smooth" });
  }, [isShow]);

  useEffect(() => {
    if (isOnline) {
      setCurrentInfo({ ...currentInfo, address: "" });
    } else {
      setCurrentInfo({ ...currentInfo, link: "" });
    }
  }, [isOnline]);

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
          <h4>
            {eventInfo.id > -1
              ? t("events.editing_a_event")
              : t("events.creating_a_event")}
          </h4>
          <div className={modalStyles.close} onClick={() => onClose()}>
            <img src={CloseIcon} alt="" />
          </div>
        </div>
        <form onSubmit={handleOnSubmit} className={modalStyles.form}>
          <div className={modalStyles.form_content} id="form">
            <div className={modalStyles.part_container}>
              <div className={modalStyles.part_container_title}>
                {t("events.main")}
              </div>
              <div
                className={`${modalStyles.part_multi} ${modalStyles.double}`}
              >
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>
                    {t("events.name")}
                  </div>
                  <input
                    placeholder={t("events.enter_a_name")}
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
                  <div className={modalStyles.part_label}>
                    {t("events.cover")}
                  </div>
                  <div className={modalStyles.cover}>
                    <div className={modalStyles.upload}>
                      <img src={UploadImageIcon} alt="" />
                    </div>
                    <div className={modalStyles.cover_placeholder}>
                      {t("events.choose_a_cover")}
                    </div>
                  </div>
                </div>
              </div>
              <div className={modalStyles.part}>
                <div className={modalStyles.part_label}>
                  {t("events.description")}
                </div>
                <textarea
                  placeholder={t("events.enter_a_description")}
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
              <div
                className={`${modalStyles.part_multi} ${modalStyles.double}`}
              >
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>
                    {t("events.type")}
                  </div>
                  {eventTypes != undefined && Array.isArray(eventTypes) ? (
                    <Dropdown
                      placeholder={t("events.choose_a_type")}
                      items={[
                        {
                          id: -1,
                          text: t("global.not_selected"),
                          text_eng: t("global.not_selected"),
                          is_selected:
                            currentInfo.eventType === null ||
                            currentInfo.eventType === undefined,
                        } as IDropdownItem,
                        ...(eventTypes.map((eventType: IEventType) => {
                          return {
                            id: eventType.id,
                            text: eventType.name,
                            text_eng: eventType.nameEnglish,
                            is_selected:
                              currentInfo.eventType != null &&
                              currentInfo.eventType.id === eventType.id,
                          } as IDropdownItem;
                        }) as IDropdownItem[]),
                      ]}
                      onItemSelect={(item: IDropdownItem) => {
                        setCurrentInfo({
                          ...currentInfo,
                          eventType: eventTypes.find(
                            (type: IEventType) => type.id === item.id,
                          )!,
                        });
                      }}
                    />
                  ) : null}
                </div>
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>
                    {t("events.visibility")}
                  </div>
                  {eventTypes != undefined && Array.isArray(eventTypes) ? (
                    <Dropdown
                      placeholder={t("events.choose_a_visibility")}
                      items={[
                        {
                          id: -1,
                          text: t("global.not_selected"),
                          text_eng: t("global.not_selected"),
                          is_selected:
                            currentInfo.privacy == null ||
                            (Array.isArray(currentInfo.privacy) &&
                              currentInfo.privacy.length === 0),
                        } as IDropdownItem,
                        ...(privacyValues.map((eventPrivacy: IEventPrivacy) => {
                          return {
                            id: eventPrivacy.id,
                            text: eventPrivacy.name,
                            text_eng: eventPrivacy.nameEnglish,
                            is_selected:
                              currentInfo.privacy != null &&
                              Array.isArray(currentInfo.privacy) &&
                              ((currentInfo.privacy.length === 1 &&
                                eventPrivacy.roles.length === 1) ||
                                (currentInfo.privacy.length > 1 &&
                                  eventPrivacy.roles.length > 1)),
                          } as IDropdownItem;
                        }) as IDropdownItem[]),
                      ]}
                      onItemSelect={(item: IDropdownItem) => {
                        setCurrentInfo({
                          ...currentInfo,
                          privacy:
                            item.id === -1 ? [] : privacyValues[item.id].roles,
                        });
                      }}
                    />
                  ) : null}
                </div>
              </div>
            </div>
            <div className={modalStyles.form_separator} />
            <div className={modalStyles.part_container_multi}>
              <div className={modalStyles.part_container}>
                <div className={modalStyles.part_container_title}>
                  {t("events.type")}
                </div>
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>
                    {t("events.date")}
                  </div>
                  <input
                    placeholder={t("events.enter_a_date")}
                    type="text"
                    required
                    onChange={(event) => console.log(event)}
                    value={""}
                  />
                </div>
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>
                    {t("events.time")}
                  </div>
                  <input
                    placeholder={t("events.enter_a_time")}
                    type="text"
                    required
                    onChange={(event) => console.log(event)}
                    value={""}
                  />
                </div>
              </div>
              <div className={modalStyles.form_separator} />
              <div className={modalStyles.part_container}>
                <div className={modalStyles.part_container_title}>
                  {t("events.location")}
                </div>
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>
                    {t("events.event_format")}
                  </div>
                  <Toggle
                    selectedIndex={isOnline ? 1 : 0}
                    items={
                      [
                        {
                          id: 0,
                          text: "Офлайн",
                          text_eng: "Offline",
                        } as IToggleItem,
                        {
                          id: 1,
                          text: "Онлайн",
                          text_eng: "Online",
                        } as IToggleItem,
                      ] as IToggleItem[]
                    }
                    onItemSelect={(item: IToggleItem) =>
                      setIsOnline(item.id === 1)
                    }
                  />
                </div>
                {isOnline ? (
                  <div className={modalStyles.part}>
                    <div className={modalStyles.part_label}>
                      {t("events.additional_info")}
                    </div>
                    <input
                      placeholder={t("events.enter_link")}
                      type="text"
                      required
                      onChange={(event) =>
                        setCurrentInfo({
                          ...currentInfo,
                          link: event.target.value.trim(),
                        })
                      }
                      value={currentInfo.link}
                    />
                  </div>
                ) : (
                  <div className={modalStyles.part}>
                    <div className={modalStyles.part_label}>
                      {t("events.location")}
                    </div>
                    <input
                      placeholder={t("events.enter_location")}
                      type="text"
                      required
                      onChange={(event) =>
                        setCurrentInfo({
                          ...currentInfo,
                          address: event.target.value.trim(),
                        })
                      }
                      value={currentInfo.address}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={modalStyles.actions}>
            <div />
            <div className={modalStyles.buttons}>
              <button
                className={`${globalStyles.inverted} ${globalStyles.small}`}
                type="button"
              >
                <span>{t("global.cancel")}</span>
              </button>
              <button className={globalStyles.small} type="submit">
                {t("global.save_changes")}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
