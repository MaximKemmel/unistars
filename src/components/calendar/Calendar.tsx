import React, { useEffect } from "react";
import { DatePicker, DatePickerProps } from "@gravity-ui/date-components";

import "./Calendar.css";

interface ICalendarProps {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

export const Calendar: React.FC<ICalendarProps> = ({ date, setDate }) => {
  const [value, setValue] = React.useState<DatePickerProps["value"]>(null);

  useEffect(() => {
    setDate(date);
  }, [value]);

  return (
    <DatePicker
      id="date_picker"
      value={value}
      onUpdate={setValue}
      view="normal"
      format="DD.MM.YYYY"
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
