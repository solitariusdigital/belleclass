import { useState } from "react";
import Calendar from "react-calendar";
import classes from "./DatePicker.module.scss";
import "react-calendar/dist/Calendar.css";

export default function DatePicker() {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState();

  const times = ["08:00", "09:00", "10:00", "14:00", "15:00"];

  const datePick = () => {
    console.log(date, time);
  };
  return (
    <div className={classes.container}>
      <Calendar
        onChange={setDate}
        value={date}
        locale="fa-IR"
        calendarType="islamic"
      />
      <div className={classes.timeContainer}>
        {times.map((time, index) => (
          <p key={index} className={classes.time} onClick={() => setTime(time)}>
            {time}
          </p>
        ))}
      </div>
      <button className={classes.button} onClick={() => datePick()}>
        Click
      </button>
    </div>
  );
}
