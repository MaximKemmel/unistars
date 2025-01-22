import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import InputMask from "react-input-mask";

import styles from "./Calendar.module.sass";

import CalendarIcon from "../../assets/svg/calendar.svg";

interface ICalendarProps {
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
}

export const Calendar: React.FC<ICalendarProps> = ({ date, setDate }) => {
  const { i18n } = useTranslation();
  const [isCalendarActive, setIsCalendarActive] = useState(false);

  function getWeekDays() {
    const weekDays = [] as Date[];
    for (let i = 0; i < 7; i++) {
      weekDays.push(new Date(Date.UTC(2021, 2, 1 + i)));
    }
    return weekDays;
  }

  const weekdays = getWeekDays();

  return (
    <div className={styles.calendar_container}>
      <div className={styles.input_field}>
        <InputMask
          className={isCalendarActive ? styles.active : ""}
          placeholder={"DD.MM.YYYY"}
          type="text"
          mask="99.99.9999"
          maskChar={""}
          required
          onChange={(event) => setDate(event.target.value.trim())}
          value={date}
        />
        <div
          className={styles.calendar_button}
          onClick={() => setIsCalendarActive(!isCalendarActive)}
        >
          <img src={CalendarIcon} alt="" />
        </div>
      </div>
      <div
        className={`${styles.calendar} ${isCalendarActive ? styles.active : ""}`}
      >
        <div className={styles.day_selector}>
          <div className={styles.header}>
            {weekdays.map((day) => (
              <div>
                {new Date(day).toLocaleDateString(
                  `${i18n.resolvedLanguage}-${i18n.resolvedLanguage?.toUpperCase()}`,
                  {
                    weekday: "short",
                  },
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
