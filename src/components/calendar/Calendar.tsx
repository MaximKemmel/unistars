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
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [currentDate, setCurrentDate] = useState(
    date != undefined && !isNaN(+date) ? date : new Date(),
  );
  const [strDate, setStrDate] = useState(
    date != undefined && !isNaN(+date)
      ? date.toLocaleDateString("ru-RU", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      : "",
  );

  const [currentMode, setCurrentMode] = useState(0);
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  useEffect(() => {
    if (isDateSelected) {
      setStrDate(
        currentDate.toLocaleDateString("ru-RU", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
      );
      setDate(currentDate);
      setIsDateSelected(true);
    }
  }, [currentDate]);

  useEffect(() => {
    setCurrentMode(0);
  }, [isCalendarActive]);

  function getWeekDays() {
    const weekDays = [] as Date[];
    for (let i = 0; i < 7; i++) {
      weekDays.push(new Date(Date.UTC(2021, 2, 1 + i)));
    }
    return weekDays;
  }

  function getDayOfWeek(tmpDate: Date) {
    const dayOfWeek = tmpDate.getDay();
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
          value={strDate!}
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
          {currentMode === 0 ? (
            <div className={styles.selector} onClick={() => setCurrentMode(1)}>
              {currentDate
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
          ) : null}
          {currentMode === 1 ? (
            <div className={styles.selector} onClick={() => setCurrentMode(2)}>
              {currentDate.getFullYear()}
              <ChevronIcon fill="#14171A" />
            </div>
          ) : null}
          <div className={styles.selector_buttons}>
            <div className={`${styles.selector_button} ${styles.prev_button}`}>
              <ChevronIcon fill="#14171A" />
            </div>
            <div className={`${styles.selector_button} ${styles.next_button}`}>
              <ChevronIcon fill="#14171A" />
            </div>
          </div>
        </div>
        {currentMode === 0 ? (
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
              {getMonthData(
                currentDate.getFullYear(),
                currentDate.getMonth(),
              ).map((week: Date[], rowIndex: number) => (
                <div className={styles.days_row} key={rowIndex}>
                  {week.map((tmpDate: Date, dayIndex: number) => (
                    <>
                      {tmpDate && tmpDate > new Date(1000, 1, 1) ? (
                        <div
                          className={`${styles.day_item} ${dayIndex > 4 ? styles.end_week : 0}`}
                          onClick={() => setCurrentDate(tmpDate)}
                          key={dayIndex}
                        >
                          <h4
                            className={
                              checkDatesEquals(new Date(date), tmpDate)
                                ? styles.active
                                : ""
                            }
                          >
                            {tmpDate.getDate()}
                          </h4>
                          {checkDatesEquals(new Date(date), tmpDate) ? (
                            <div className={styles.marker} />
                          ) : null}
                        </div>
                      ) : (
                        <div className={styles.empty_day_item} />
                      )}
                    </>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : null}
        {currentMode === 1 ? (
          <div className={styles.month_selector}>
            {Array(12)
              .fill(1)
              .map((_item, index) => (
                <div
                  className={styles.month_item}
                  key={index}
                  onClick={() => {
                    setCurrentDate(
                      new Date(Date.UTC(currentDate.getFullYear(), index, 1)),
                    );
                    setCurrentMode(0);
                  }}
                >
                  <h4>
                    {new Date(Date.UTC(2025, index))
                      .toLocaleString(
                        `${i18n.resolvedLanguage}-${i18n.resolvedLanguage?.toUpperCase()}`,
                        {
                          month: "short",
                        },
                      )
                      .replace(".", "")
                      .toLowerCase()
                      .split(" ")
                      .map(function (word) {
                        return word[0].toUpperCase() + word.substring(1);
                      })
                      .join(" ")}
                  </h4>
                </div>
              ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};
