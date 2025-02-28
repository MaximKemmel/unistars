import React from "react";
import { DatePicker } from "@gravity-ui/date-components";
import { dateTimeParse } from "@gravity-ui/date-utils";

interface ICalendarProps {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  isTimePicker?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

export const Calendar: React.FC<ICalendarProps> = ({
  date,
  setDate,
  isTimePicker,
  minDate,
  maxDate,
}) => {
  return (
    <DatePicker
      id="date_picker"
      value={date.getFullYear() > 2001 ? dateTimeParse(date) : null}
      onUpdate={(value) => {
        if (value !== null && value !== undefined) {
          setDate(value!.toDate());
        }
      }}
      minValue={dateTimeParse(minDate ?? new Date("01.01.1900"))}
      maxValue={dateTimeParse(maxDate ?? new Date("01.01.2900"))}
      view="normal"
      format={isTimePicker ? "HH:mm" : "DD.MM.YYYY"}
      size="xl"
      /*onOpenChange={() => {
        const picker = document.getElementById("date_picker");
        const popup = document.querySelector(".g-popup") as HTMLElement;
        if (popup) {
          popup.style.marginLeft = `calc(${picker!.clientWidth}px - 290px)`;
        }
        const modeTitle = document.querySelector(
          ".g-date-calendar__mode-label",
        ) as HTMLElement;
        if (modeTitle) {
          modeTitle.innerText = modeTitle.innerText
            .toLowerCase()
            .split(" ")
            .map(function (word) {
              return word[0].toUpperCase() + word.substring(1);
            })
            .join(" ");
        }
      }}*/
    />
  );
};
