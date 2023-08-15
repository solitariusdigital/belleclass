import { useState } from "react";
import classes from "./DatePicker.module.scss";
import { toFarsiNumber } from "../services/utility";
import { Calendar, utils } from "@hassanmojab/react-modern-calendar-datepicker";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
// import { Calendar, utils } from "react-modern-calendar-datepicker";
// import "react-modern-calendar-datepicker/lib/DatePicker.css";

export default function DatePicker() {
  const [day, setDay] = useState(null);
  const [time, setTime] = useState();
  const [alert, setAlert] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const times = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
  ];

  const datePick = () => {
    if (!day || !time) {
      setAlert("تاریخ و زمان انتخاب کنید");
      setTimeout(() => {
        setAlert("");
      }, 3000);
      return;
    }
  };

  const displayDate = (time) => {
    if (day) {
      setTime(time);
      setSelectedDate(
        `${toFarsiNumber(day.year)}/${toFarsiNumber(day.month)}/${toFarsiNumber(
          day.day
        )} ${
          toFarsiNumber(time).slice(0, 2) + ":" + toFarsiNumber(time).slice(2)
        }`
      );
    }
  };

  return (
    <div className={classes.container}>
      <Calendar
        value={day}
        onChange={setDay}
        shouldHighlightWeekends
        minimumDate={utils("fa").getToday()}
        locale="fa"
      />
      <div className={classes.timeContainer}>
        {times.map((time, index) => (
          <p
            key={index}
            className={classes.time}
            onClick={() => displayDate(time)}
          >
            {time}
          </p>
        ))}
      </div>
      {alert && <p className={classes.alert}>{alert}</p>}
      {selectedDate && <p className={classes.message}>{selectedDate} ساعت</p>}
      <button className={classes.button} onClick={() => datePick()}>
        رزرو وقت حضوری
      </button>
    </div>
  );
}
