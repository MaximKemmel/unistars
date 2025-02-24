import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import { Input } from "../../components/input/Input";
import { Dropdown } from "../../components/dropdown/Dropdown";
import { Toggle } from "../../components/toggle/Toggle";
import { Calendar } from "../../components/calendar/Calendar";

import globalStyles from "../../App.module.sass";
import modalStyles from "../Modal.module.sass";

import { IEvent } from "../../types/event/event";
import { IEventType } from "../../types/event/eventType";
import { IEventPrivacy } from "../../types/event/eventPrivacy";
import { IDropdownItem } from "../../types/local/dropdownItem";
import { IToggleItem } from "../../types/local/toggleItem";
import { ApiStatusType } from "../../enums/local/apiStatusType";

import { Close as CloseIcon } from "../../assets/svgComponents/Close";
import UploadImageIcon from "../../assets/svg/upload-image.svg";
import FileIcon from "../../assets/svg/file.svg";
import CheckIcon from "../../assets/svg/circled-check.svg";

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
  const { uploadEventCover } = useActions();
  const eventTypes = useTypedSelector((state) => state.eventReducer.eventTypes);
  const [currentEvent, setCurrentEvent] = useState(eventInfo);
  const inputImageRef = useRef<HTMLInputElement>(null);
  const [uploadImageProgress, setUploadImageProgress] = useState(-1);
  const uploadImageStatus = useTypedSelector(
    (state) => state.eventReducer.uploadCoverStatus,
  );
  const eventCover = useTypedSelector((state) => state.eventReducer.eventCover);
  const [imageName, setImageName] = useState("");
  const [isOnline, setIsOnline] = useState(
    currentEvent.link != undefined && currentEvent.link.trim().length > 0,
  );
  const [date, setDate] = useState(
    new Date(
      currentEvent.startDate != null ? currentEvent.startDate : "01.01.0001",
    ),
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
    if (isShow) {
      setCurrentEvent(eventInfo);
      setDate(
        new Date(
          currentEvent.startDate != null
            ? currentEvent.startDate
            : "01.01.0001",
        ),
      );
    }
  }, [isShow]);

  useEffect(() => {
    if (isOnline) {
      setCurrentEvent({ ...currentEvent, address: "" });
    } else {
      setCurrentEvent({ ...currentEvent, link: "" });
    }
  }, [isOnline]);

  useEffect(() => {
    if (uploadImageProgress === 100) {
      setUploadImageProgress(-1);
    }
  }, [uploadImageProgress]);

  useEffect(() => {
    switch (uploadImageStatus.status) {
      case ApiStatusType.SUCCESS:
        setCurrentEvent({
          ...currentEvent,
          coverUrl: Object.values(eventCover)[0],
        });
        break;
    }
  }, [uploadImageStatus]);

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
        uploadEventCover({
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
          <h4>
            {eventInfo.id > -1
              ? t("events.editing_a_event")
              : t("events.creating_a_event")}
          </h4>
          <div className={modalStyles.close} onClick={() => onClose()}>
            <CloseIcon />
          </div>
        </div>
        {isShow ? (
          <form className={modalStyles.form}>
            <div className={modalStyles.form_content}>
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
                    <div className={modalStyles.input}>
                      <Input
                        value={currentEvent.name}
                        onChange={(value: string) =>
                          setCurrentEvent({
                            ...currentEvent,
                            name: value,
                          })
                        }
                        placeholder={t("events.enter_a_name")}
                        type="text"
                        isRequired={true}
                      />
                    </div>
                  </div>
                  <div className={modalStyles.part}>
                    <div className={modalStyles.part_label}>
                      {t("events.cover")}
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
                      {currentEvent.coverUrl === null ||
                      currentEvent.coverUrl === undefined ||
                      currentEvent.coverUrl!.trim().length === 0 ? (
                        <div className={modalStyles.form_button_label}>
                          {t("events.choose_a_cover")}
                        </div>
                      ) : (
                        <div className={modalStyles.file_info}>
                          <div className={modalStyles.file_name}>
                            <img src={FileIcon} alt="" />
                            <div className={modalStyles.name}>
                              {imageName.trim().length === 0
                                ? currentEvent.coverUrl
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
                </div>
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>
                    {t("events.description")}
                  </div>
                  <textarea
                    placeholder={t("events.enter_a_description")}
                    required
                    onChange={(event) =>
                      setCurrentEvent({
                        ...currentEvent,
                        description: event.target.value.trim(),
                      })
                    }
                    value={currentEvent.description}
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
                              currentEvent.eventType === null ||
                              currentEvent.eventType === undefined,
                          } as IDropdownItem,
                          ...(eventTypes.map((eventType: IEventType) => {
                            return {
                              id: eventType.id,
                              text: eventType.name,
                              text_eng: eventType.nameEnglish,
                              is_selected:
                                currentEvent.eventType != null &&
                                currentEvent.eventType.id === eventType.id,
                            } as IDropdownItem;
                          }) as IDropdownItem[]),
                        ]}
                        onItemSelect={(item: IDropdownItem) => {
                          setCurrentEvent({
                            ...currentEvent,
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
                              currentEvent.privacy == null ||
                              (Array.isArray(currentEvent.privacy) &&
                                currentEvent.privacy.length === 0),
                          } as IDropdownItem,
                          ...(privacyValues.map(
                            (eventPrivacy: IEventPrivacy) => {
                              return {
                                id: eventPrivacy.id,
                                text: eventPrivacy.name,
                                text_eng: eventPrivacy.nameEnglish,
                                is_selected:
                                  currentEvent.privacy != null &&
                                  Array.isArray(currentEvent.privacy) &&
                                  ((currentEvent.privacy.length === 1 &&
                                    eventPrivacy.roles.length === 1) ||
                                    (currentEvent.privacy.length > 1 &&
                                      eventPrivacy.roles.length > 1)),
                              } as IDropdownItem;
                            },
                          ) as IDropdownItem[]),
                        ]}
                        onItemSelect={(item: IDropdownItem) => {
                          setCurrentEvent({
                            ...currentEvent,
                            privacy:
                              item.id === -1
                                ? []
                                : privacyValues[item.id].roles,
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
                    {isShow ? <Calendar date={date} setDate={setDate} /> : null}
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
                      <div className={modalStyles.input}>
                        <Input
                          value={currentEvent.link}
                          onChange={(value: string) =>
                            setCurrentEvent({
                              ...currentEvent,
                              link: value,
                            })
                          }
                          placeholder={t("events.enter_link")}
                          type="text"
                          isRequired={true}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className={modalStyles.part}>
                      <div className={modalStyles.part_label}>
                        {t("events.location")}
                      </div>
                      <div className={modalStyles.input}>
                        <Input
                          value={currentEvent.address}
                          onChange={(value: string) =>
                            setCurrentEvent({
                              ...currentEvent,
                              address: value,
                            })
                          }
                          placeholder={t("events.enter_location")}
                          type="text"
                          isRequired={true}
                        />
                      </div>
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
                  onClick={() => onClose()}
                >
                  <span>{t("global.cancel")}</span>
                </button>
                <button
                  className={globalStyles.small}
                  type="button"
                  onClick={() => {
                    console.log(currentEvent);
                    onSave(currentEvent);
                  }}
                >
                  {t("global.save_changes")}
                </button>
              </div>
            </div>
          </form>
        ) : null}
      </div>
    </div>
  );
};
