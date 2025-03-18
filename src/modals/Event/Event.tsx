import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import { Input } from "../../components/input/Input";
import { Textarea } from "../../components/textarea/Textarea";
import { Dropdown } from "../../components/dropdown/Dropdown";
import { Toggle } from "../../components/toggle/Toggle";
import { Calendar } from "../../components/calendar/Calendar";
import { Uploader } from "../../components/uploader/Uploader";

import globalStyles from "../../App.module.sass";
import modalStyles from "../Modal.module.sass";

import { privacyValues } from "../../data/privacyValues";

import { IEvent } from "../../types/event/event";
import { IEventType } from "../../types/event/eventType";
import { IEventPrivacy } from "../../types/event/eventPrivacy";
import { IDropdownItem } from "../../types/local/dropdownItem";
import { IToggleItem } from "../../types/local/toggleItem";
import { ApiStatusType } from "../../enums/local/apiStatusType";
import { initApiStatus } from "../../types/local/apiStatus";

import { Close as CloseIcon } from "../../assets/svgComponents/Close";
import { Trash as TrashIcon } from "../../assets/svgComponents/Trash";

interface IEventModalProps {
  isShow: boolean;
  eventInfo: IEvent;
  onSave: Function;
  onDelete: Function;
  onClose: Function;
}

export const EventModal: React.FC<IEventModalProps> = ({
  isShow,
  eventInfo,
  onSave,
  onDelete,
  onClose,
}) => {
  const { t } = useTranslation();
  const { uploadEventCover, setUploadCoverStatus } = useActions();
  const eventTypes = useTypedSelector((state) => state.eventReducer.eventTypes);
  const [currentEvent, setCurrentEvent] = useState(eventInfo);
  const inputImageRef = useRef<HTMLInputElement>(null);
  const [uploadImageProgress, setUploadImageProgress] = useState(-1);
  const uploadImageStatus = useTypedSelector(
    (state) => state.eventReducer.uploadCoverStatus,
  );
  const eventCover = useTypedSelector((state) => state.eventReducer.eventCover);
  const [imageName, setImageName] = useState("");
  const [imageData, setImageData] = useState(null);
  const [isOnline, setIsOnline] = useState(
    currentEvent.link != undefined && currentEvent.link.trim().length > 0,
  );
  const [date, setDate] = useState(
    new Date(
      currentEvent.startDate != null ? currentEvent.startDate : "01.01.0001",
    ),
  );
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    setDate(
      new Date(
        eventInfo.startDate != null ? eventInfo.startDate : "01.01.0001",
      ),
    );
    setCurrentEvent(eventInfo);
  }, [eventInfo]);

  useEffect(() => {
    if (isOnline) {
      setCurrentEvent({ ...currentEvent, address: eventInfo.address });
    } else {
      setCurrentEvent({ ...currentEvent, link: eventInfo.link });
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

  useEffect(() => {
    setIsButtonEnabled(
      currentEvent.id === -1
        ? currentEvent.name.trim().length > 0 &&
            currentEvent.description.trim().length > 0 &&
            date.getFullYear() > 1
        : currentEvent.description.trim().length > 0 &&
            currentEvent.startDate !== null &&
            date.getTime() > new Date().getTime(),
    );
  }, [currentEvent, date]);

  const handleOnChangeImage = (event) => {
    try {
      const file = event.target.files[0];
      if (
        file.size < 5242880 &&
        (file.name.endsWith(".png") ||
          file.name.endsWith(".jpg") ||
          file.name.endsWith(".jpeg") ||
          file.name.endsWith(".bmp"))
      ) {
        setImageName(file.name);
        setImageData(file);
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
                        imageName.trim().length === 0 &&
                        currentEvent.coverUrl !== undefined
                          ? currentEvent.coverUrl
                          : imageName
                      }
                      status={uploadImageStatus.status}
                      title={t("events.choose_a_cover")}
                      onClick={() => {
                        if (uploadImageProgress === -1) {
                          inputImageRef.current!.click();
                        }
                      }}
                      onRetry={() => {
                        setUploadCoverStatus(initApiStatus());
                        uploadEventCover({
                          file: imageData! as Blob,
                          onUploadProgress: (data) => {
                            setUploadImageProgress(
                              Math.round(100 * (data.loaded / data.total!)),
                            );
                          },
                        });
                      }}
                      onClear={() => {
                        setCurrentEvent({
                          ...currentEvent,
                          coverUrl: "",
                        });
                        setImageName("");
                        setImageData(null);
                      }}
                      isDisabled={
                        currentEvent.coverUrl !== undefined &&
                        imageName.trim().length +
                          currentEvent.coverUrl.trim().length >
                          0
                      }
                    />
                  </div>
                </div>
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>
                    {t("events.description")}
                  </div>
                  <div className={modalStyles.input}>
                    <Textarea
                      value={currentEvent.description}
                      onChange={(value: string) =>
                        setCurrentEvent({
                          ...currentEvent,
                          description: value,
                        })
                      }
                      placeholder={t("events.enter_a_description")}
                      isRequired={true}
                    />
                  </div>
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
                    <Calendar date={date} setDate={setDate} />
                  </div>
                  <div className={modalStyles.part}>
                    <div className={modalStyles.part_label}>
                      {t("events.time")}
                    </div>
                    <Calendar
                      date={date}
                      setDate={setDate}
                      isTimePicker={true}
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
              {eventInfo.id !== -1 ? (
                <button
                  className={`${globalStyles.small} ${globalStyles.inverted} ${globalStyles.delete} ${globalStyles.square}`}
                  type="button"
                  onClick={() => onDelete(currentEvent)}
                >
                  <TrashIcon />
                </button>
              ) : (
                <div />
              )}

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
                    console.log(date);
                    onSave({
                      ...currentEvent,
                      startDate: format(date, "yyyy-MM-dd HH:mm:ss").replace(
                        " ",
                        "T",
                      ),
                    });
                  }}
                  disabled={!isButtonEnabled}
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
