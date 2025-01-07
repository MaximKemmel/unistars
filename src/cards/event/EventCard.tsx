import { useState } from "react";

import { EventModal } from "../../modals/Event/EventModal";

import styles from "./EventCard.module.sass";

import EditIcon from "../../assets/svg/edit.svg";

interface IEventCardProps {
  eventItem: any;
}

export const EventCard: React.FC<IEventCardProps> = ({ eventItem }) => {
  const [isEventModalShow, setIsEventModalShow] = useState(false);

  return (
    <div className={styles.event_container}>
      <div className={styles.event_image}>
        <img src={eventItem.photo} alt="" />
      </div>
      <div className={styles.event_info}>
        <div className={styles.event_name}>{eventItem.name}</div>
        <div
          className={styles.event_participants}
        >{`${eventItem.participants} участника • ${eventItem.ambassadors} амбассадора`}</div>
      </div>
      <div className={styles.event_date}>
        {`${new Date(eventItem.date)
          .toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
          .replace(/\s*г\./, "")} | ${eventItem.time}`}
      </div>
      <div className={styles.event_edit} onClick={() => setIsEventModalShow(true)}>
        <img src={EditIcon} alt="" />
      </div>
      <EventModal
        isShow={isEventModalShow}
        eventInfo={eventItem}
        onSave={() => setIsEventModalShow(false)}
        onClose={() => setIsEventModalShow(false)}
      />
    </div>
  );
};
