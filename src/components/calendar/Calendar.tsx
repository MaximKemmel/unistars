import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import InputMask from "react-input-mask";

import styles from "./Calendar.module.sass";

import CalendarIcon from "../../assets/svg/calendar.svg";
import { Chevron as ChevronIcon } from "../../assets/svgComponents/Chevron";

interface ICalendarProps {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

export const Calendar: React.FC<ICalendarProps> = ({ date, setDate }) => {
  const { i18n } = useTranslation();
  const [isCalendarActive, setIsCalendarActive] = useState(false);
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const [strDate, setStrDate] = useState(
    date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
  );

  useEffect(() => {
    if (isCalendarActive) {
      setIsCalendarActive(false);
      setStrDate(
        date.toLocaleDateString("ru-RU", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
      );
    }
  }, [date]);

  function getWeekDays() {
    const weekDays = [] as Date[];
    for (let i = 0; i < 7; i++) {
      weekDays.push(new Date(Date.UTC(2021, 2, 1 + i)));
    }
    return weekDays;
  }

  function getDayOfWeek(date: Date) {
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0) {
      return 6;
    } else {
      return dayOfWeek - 1;
    }
  }

  function getMonthData(year: number, month: number) {
    const result = [] as Date[][];
    let day = 1;
    let daysInMonthCount: number;
    if (!(year % 4 || (!(year % 100) && year % 400)) && month === 1) {
      daysInMonthCount = 29;
    } else {
      daysInMonthCount = daysInMonth[month];
    }
    const tmpDate = new Date(year, month);
    for (let i = 0; i < (daysInMonthCount + getDayOfWeek(tmpDate)) / 7; i++) {
      result[i] = [] as Date[];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < getDayOfWeek(tmpDate)) || day > daysInMonthCount) {
          result[i][j] = new Date(1000, 1, 1);
        } else {
          result[i][j] = new Date(year, month, day++);
        }
      }
    }
    return result;
  }

  function checkDatesEquals(dateFirst: Date, dateSecond: Date) {
    console.log(dateFirst);
    console.log(dateSecond);
    return (
      dateFirst.getFullYear() === dateSecond.getFullYear() &&
      dateFirst.getDate() === dateSecond.getDate() &&
      dateFirst.getMonth() === dateSecond.getMonth()
    );
  }

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
          onChange={(event) => setStrDate(event.target.value.trim())}
          value={strDate}
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
        <div className={styles.mode_selector}>
          <div className={styles.selector}>
            {date
              .toLocaleDateString(
                `${i18n.resolvedLanguage}-${i18n.resolvedLanguage?.toUpperCase()}`,
                {
                  month: "long",
                  year: "numeric",
                },
              )
              .replace(/\s*г\./, "")
              .toLowerCase()
              .split(" ")
              .map(function (word) {
                return word[0].toUpperCase() + word.substring(1);
              })
              .join(" ")}
            <ChevronIcon fill="#14171A" />
          </div>
          <div className={styles.selector_buttons}>
            <div className={`${styles.selector_button} ${styles.prev_button}`}>
              <ChevronIcon fill="#14171A" />
            </div>
            <div className={`${styles.selector_button} ${styles.next_button}`}>
              <ChevronIcon fill="#14171A" />
            </div>
          </div>
        </div>
        <div className={styles.day_selector}>
          <div className={styles.header}>
            {getWeekDays().map((day: Date, index: number) => (
              <div
                className={`${styles.header_item} ${index > 4 ? styles.end_week : ""}`}
                key={index}
              >
                {new Date(day)
                  .toLocaleDateString(
                    `${i18n.resolvedLanguage}-${i18n.resolvedLanguage?.toUpperCase()}`,
                    {
                      weekday: "short",
                    },
                  )
                  .toLowerCase()
                  .split(" ")
                  .map(function (word) {
                    return word[0].toUpperCase() + word.substring(1);
                  })
                  .join(" ")}
              </div>
            ))}
          </div>
          <div className={styles.days_rows}>
            {getMonthData(date.getFullYear(), date.getMonth()).map(
              (week: Date[], rowIndex: number) => (
                <div className={styles.days_row} key={rowIndex}>
                  {week.map((tmpDate: Date, dayIndex: number) => (
                    <div
                      className={`${styles.day_item} ${dayIndex > 4 ? styles.end_week : 0}`}
                      onClick={() => setDate(tmpDate)}
                    >
                      {tmpDate && tmpDate > new Date(1000, 1, 1) ? (
                        <>
                          <h4
                            className={
                              checkDatesEquals(new Date(date), tmpDate)
                                ? styles.active
                                : ""
                            }
                            key={dayIndex}
                          >
                            {tmpDate.getDate()}
                          </h4>
                          {checkDatesEquals(new Date(date), tmpDate) ? (
                            <div className={styles.marker} />
                          ) : null}
                        </>
                      ) : null}
                    </div>
                  ))}
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
