import { useState } from "react";

import { EventModal } from "../../../modals/Event/EventModal";

import { EventCard } from "../../../cards/event/EventCard";

import globalStyles from "../../../App.module.sass";
import styles from "../Home.module.sass";

import TestPhoto from "../../../assets/jpg/test-event.jpg";
import PlusIcon from "../../../assets/svg/plus.svg";

export const Events = () => {
  const [isEventModalShow, setIsEventModalShow] = useState(false);

  const events = Array(10)
    .fill(1)
    .map((_item, index) => {
      return {
        id: index,
        photo: TestPhoto,
        date: "01.01.2025",
        time: "22:00",
        name: "Brand New Conference",
        description: "Описание",
        participants: 234,
        ambassadors: 2,
        event_type: -1,
        event_kind: 0,
        event_visibility: -1,
      };
    });

  return (
    <div className={styles.content}>
      <div className={`${styles.events} ${styles.content_container}`}>
        <div className={styles.content_container_head}>
          <div className={styles.head_title}>
            <h4>Ивенты</h4>
            <div className={styles.count}>{events.length}</div>
          </div>
        </div>
        {events.length > 0 ? (
          <div className={styles.events_container}>
            {events.map((event, index) => {
              return (
                <div className={styles.event_item} key={index}>
                  <EventCard eventItem={event} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className={styles.empty_info}>
            <div className={styles.empty_message}>У вас пока нет ивентов.</div>
            <button className={globalStyles.small} type="button" onClick={() => setIsEventModalShow(true)}>
              Создать ивент
              <img src={PlusIcon} alt="" />
            </button>
          </div>
        )}
        {events.length > 0 ? (
          <button className={globalStyles.small} type="button" onClick={() => setIsEventModalShow(true)}>
            Создать ивент
            <img src={PlusIcon} alt="" />
          </button>
        ) : null}
      </div>
      <EventModal
        isShow={isEventModalShow}
        eventInfo={{
          id: -1,
          event_type: -1,
          event_kind: 0,
        }}
        onSave={() => setIsEventModalShow(false)}
        onClose={() => setIsEventModalShow(false)}
      />
    </div>
  );
};
