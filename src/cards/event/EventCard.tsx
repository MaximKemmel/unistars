import React from "react";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";

import styles from "./EventCard.module.sass";

import { IEvent } from "../../types/event/event";

import EditIcon from "../../assets/svg/edit.svg";

interface IEventCardProps {
  eventItem: IEvent;
  onEdit: Function;
}

export const EventCard: React.FC<IEventCardProps> = ({ eventItem, onEdit }) => {
  const { i18n, t } = useTranslation();

  return (
    <div className={styles.event_container}>
      <div className={styles.event_image}>
        <img src={eventItem.coverUrl} alt="" />
      </div>
      <div className={styles.event_info}>
        <div className={styles.event_name}>{eventItem.name}</div>
        <div className={styles.event_participants}>
          {`${eventItem.eventSubscribers !== undefined && Array.isArray(eventItem.eventSubscribers) ? eventItem.eventSubscribers.length : 0} ${t("events.participants")} 
          • ${eventItem.eventModerators !== undefined && Array.isArray(eventItem.eventModerators) ? eventItem.eventModerators.length : 0} ${t("events.ambassadors")}`}
        </div>
      </div>
      <div className={styles.event_date}>
        {`${new Date(eventItem.startDate)
          .toLocaleDateString(
            `${i18n.resolvedLanguage}-${i18n.resolvedLanguage?.toUpperCase()}`,
            {
              day: "numeric",
              month: "long",
              year: "numeric",
            },
          )
          .replace(
            /\s*г\./,
            "",
          )} | ${format(new Date(eventItem.startDate), "HH:mm")}`}
      </div>
      <div className={styles.event_edit} onClick={() => onEdit()}>
        <img src={EditIcon} alt="" />
      </div>
    </div>
  );
};
