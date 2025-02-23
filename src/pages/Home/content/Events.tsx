import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

import { EventModal } from "../../../modals/Event/EventModal";

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
    patchEvent,
    setPostEventStatus,
    setPatchEventStatus,
  } = useActions();
  const events = useTypedSelector((state) => state.eventReducer.eventList);
  const postStatus = useTypedSelector(
    (state) => state.eventReducer.postEventStatus,
  );
  const editStatus = useTypedSelector(
    (state) => state.eventReducer.patchEventStatus,
  );
  const [isEventModalShow, setIsEventModalShow] = useState(false);

  useEffect(() => {
    switch (postStatus.status) {
      case ApiStatusType.SUCCESS:
        setPostEventStatus(initApiStatus());
        getEventList();
        setIsEventModalShow(false);
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
        break;
      case ApiStatusType.ERROR:
        setPatchEventStatus(initApiStatus());
        setIsEventModalShow(false);
        break;
    }
  }, [editStatus]);

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
                    onSave={(editedEvent: IEvent) =>
                      patchEvent({ event: editedEvent })
                    }
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
              onClick={() => setIsEventModalShow(true)}
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
            onClick={() => setIsEventModalShow(true)}
          >
            {t("events.create_event")}
            <img src={PlusIcon} alt="" />
          </button>
        ) : null}
      </div>
      <EventModal
        isShow={isEventModalShow}
        eventInfo={initEvent()}
        onSave={(editedEvent: IEvent) => postEvent({ event: editedEvent })}
        onClose={() => setIsEventModalShow(false)}
      />
    </div>
  );
};
