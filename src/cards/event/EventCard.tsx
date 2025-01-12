import React, { useState } from "react";
import {useTranslation} from "react-i18next";

import { EventModal } from "../../modals/Event/EventModal";

import styles from "./EventCard.module.sass";

import EditIcon from "../../assets/svg/edit.svg";

interface IEventCardProps {
  eventItem: any;
}

export const EventCard: React.FC<IEventCardProps> = ({ eventItem }) => {
  const { i18n, t } = useTranslation();
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
        >{`${eventItem.participants} ${t("events.participants")} • ${eventItem.ambassadors} ${t("events.ambassadors")}`}</div>
      </div>
      <div className={styles.event_date}>
        {`${new Date(eventItem.date)
          .toLocaleDateString(`${i18n.resolvedLanguage}-${i18n.resolvedLanguage?.toUpperCase()}`, {
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
