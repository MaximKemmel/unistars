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
      value={value}
      onUpdate={setValue}
      view="normal"
      format="DD.MM.YYYY"
    />
  );
};
