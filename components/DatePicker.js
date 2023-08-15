import { useState } from "react";
import classes from "./DatePicker.module.scss";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar, utils } from "@hassanmojab/react-modern-calendar-datepicker";
// import { Calendar, utils } from "react-modern-calendar-datepicker";
// import "react-modern-calendar-datepicker/lib/DatePicker.css";

export default function DatePicker() {
  const [day, setDay] = useState(null);
  const [time, setTime] = useState();
  const [alert, setAlert] = useState("");

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
    console.log(day, time);
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
          <p key={index} className={classes.time} onClick={() => setTime(time)}>
            {time}
          </p>
        ))}
      </div>
      <p className={classes.alert}>{alert}</p>
      <button className={classes.button} onClick={() => datePick()}>
        Click
      </button>
    </div>
  );
}
