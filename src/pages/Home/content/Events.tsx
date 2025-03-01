import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

import { EventModal } from "../../../modals/Event/Event";
import { ConfirmDeleteModal } from "../../../modals/ConfirmDelete/ConfirmDelete";
import { StatusInfoModal } from "../../../modals/StatusInfo/StatusInfo";

import { EventCard } from "../../../cards/event/EventCard";

import globalStyles from "../../../App.module.sass";
import styles from "../Home.module.sass";

import { IEvent } from "../../../types/event/event";
import { initEvent } from "../../../types/event/initEvent";
import { ApiStatusType } from "../../../enums/local/apiStatusType";
import { initApiStatus } from "../../../types/local/apiStatus";

import PlusIcon from "../../../assets/svg/plus.svg";

export const Events = () => {
  const { t } = useTranslation();
  const {
    getEventList,
    postEvent,
    editEvent,
    deleteEvent,
    setPostEventStatus,
    setPatchEventStatus,
    setDeleteEventStatus,
  } = useActions();
  const events = useTypedSelector((state) => state.eventReducer.eventList);
  const postStatus = useTypedSelector((state) => state.eventReducer.postStatus);
  const editStatus = useTypedSelector((state) => state.eventReducer.editStatus);
  const deleteStatus = useTypedSelector(
    (state) => state.eventReducer.deleteStatus,
  );
  const [deletedEvent, setDeletedEvent] = useState(initEvent());
  const [currentEvent, setCurrentEvent] = useState(initEvent());
  const [isEventModalShow, setIsEventModalShow] = useState(false);
  const [isConfirmDeleteModalShow, setIsConfirmDeleteModalShow] =
    useState(false);
  const [isStatusInfoModalShow, setIsStatusInfoModalShow] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isStatusSuccess, setIsStatusSuccess] = useState(true);
  const [isStatusRestore, setIsStatusRestore] = useState(false);

  useEffect(() => {
    switch (postStatus.status) {
      case ApiStatusType.SUCCESS:
        setPostEventStatus(initApiStatus());
        getEventList();
        setIsEventModalShow(false);
        setStatusMessage(t("events.event_was_added"));
        setIsStatusInfoModalShow(true);
        setIsStatusSuccess(true);
        setIsStatusRestore(false);
        break;
      case ApiStatusType.ERROR:
        setPostEventStatus(initApiStatus());
        setIsEventModalShow(false);
        break;
    }
  }, [postStatus]);

  useEffect(() => {
    switch (editStatus.status) {
      case ApiStatusType.SUCCESS:
        setPatchEventStatus(initApiStatus());
        getEventList();
        setIsEventModalShow(false);
        setStatusMessage(t("events.even_was_edited"));
        setIsStatusInfoModalShow(true);
        setIsStatusSuccess(true);
        setIsStatusRestore(false);
        break;
      case ApiStatusType.ERROR:
        setPatchEventStatus(initApiStatus());
        setIsEventModalShow(false);
        break;
    }
  }, [editStatus]);

  useEffect(() => {
    switch (deleteStatus.status) {
      case ApiStatusType.SUCCESS:
        setDeleteEventStatus(initApiStatus());
        getEventList();
        setStatusMessage(t("events.event_was_deleted"));
        setIsStatusInfoModalShow(true);
        setIsStatusSuccess(true);
        setIsStatusRestore(true);
        break;
      case ApiStatusType.ERROR:
        setDeleteEventStatus(initApiStatus());
        break;
    }
  }, [deleteStatus]);

  const handleOnDeleteEvent = (event: IEvent) => {
    setDeletedEvent(event);
    setIsEventModalShow(false);
    setIsConfirmDeleteModalShow(true);
  };

  const handleOnConfirmDeleteBooklet = () => {
    setIsConfirmDeleteModalShow(false);
    deleteEvent({ id: deletedEvent.id });
  };

  return (
    <div className={styles.content}>
      <div className={`${styles.events} ${styles.content_container}`}>
        <div className={styles.content_container_head}>
          <div className={styles.head_title}>
            <h4>{t("navigation.events")}</h4>
            <div className={styles.count}>{events.length}</div>
          </div>
        </div>
        {events.length > 0 ? (
          <div className={styles.events_container}>
            {events.map((event: IEvent, index: number) => {
              return (
                <div className={styles.event_item} key={index}>
                  <EventCard
                    eventItem={event}
                    onEdit={() => {
                      setCurrentEvent(event);
                      setIsEventModalShow(true);
                    }}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className={styles.empty_info}>
            <div className={styles.empty_message}>{t("events.no_events")}</div>
            <button
              className={globalStyles.small}
              type="button"
              onClick={() => {
                setCurrentEvent(initEvent());
                setIsEventModalShow(true);
              }}
            >
              {t("events.create_event")}
              <img src={PlusIcon} alt="" />
            </button>
          </div>
        )}
        {events.length > 0 ? (
          <button
            className={globalStyles.small}
            type="button"
            onClick={() => {
              setCurrentEvent(initEvent());
              setIsEventModalShow(true);
            }}
          >
            {t("events.create_event")}
            <img src={PlusIcon} alt="" />
          </button>
        ) : null}
      </div>
      <EventModal
        isShow={isEventModalShow}
        eventInfo={currentEvent}
        onSave={(editedEvent: IEvent) => {
          if (editedEvent.id === -1) {
            postEvent({ event: editedEvent });
          } else {
            editEvent({ event: editedEvent });
          }
        }}
        onDelete={handleOnDeleteEvent}
        onClose={() => setIsEventModalShow(false)}
      />
      <ConfirmDeleteModal
        isShow={isConfirmDeleteModalShow}
        head={t("events.deleting_a_event")}
        title={t("events.delete_title")}
        message={t("events.delete_description")}
        onConfirm={handleOnConfirmDeleteBooklet}
        onClose={() => {
          setIsConfirmDeleteModalShow(false);
          setIsEventModalShow(true);
        }}
      />
      <StatusInfoModal
        isShow={isStatusInfoModalShow}
        message={statusMessage}
        isSuccess={isStatusSuccess}
        onClose={() => setIsStatusInfoModalShow(false)}
        isRestore={isStatusRestore}
        onRestore={() => setIsStatusInfoModalShow(false)}
      />
    </div>
  );
};
