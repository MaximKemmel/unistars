import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useTypedSelector } from "../../../hooks/useTypedSelector";

import { EventModal } from "../../../modals/Event/EventModal";

import { EventCard } from "../../../cards/event/EventCard";

import globalStyles from "../../../App.module.sass";
import styles from "../Home.module.sass";

import { IEvent } from "../../../types/event/event";

import PlusIcon from "../../../assets/svg/plus.svg";

export const Events = () => {
  const { t } = useTranslation();
  const [isEventModalShow, setIsEventModalShow] = useState(false);

  const events = useTypedSelector((state) => state.eventReducer.eventList);

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
                  <EventCard eventItem={event} />
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
        eventInfo={{ id: -1 } as IEvent}
        onSave={() => setIsEventModalShow(false)}
        onClose={() => setIsEventModalShow(false)}
      />
    </div>
  );
};
