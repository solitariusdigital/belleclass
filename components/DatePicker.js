import { useState } from "react";
import classes from "./DatePicker.module.scss";
import { toFarsiNumber } from "../services/utility";
import { Calendar, utils } from "@hassanmojab/react-modern-calendar-datepicker";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import Router from "next/router";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

// import { Calendar, utils } from "react-modern-calendar-datepicker";
// import "react-modern-calendar-datepicker/lib/DatePicker.css";

export default function DatePicker() {
  const [day, setDay] = useState(null);
  const [time, setTime] = useState("");
  const [alert, setAlert] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [times, setTimes] = useState({
    "09:00": false,
    "10:00": false,
    "11:00": false,
    "12:00": false,
    "13:00": false,
    "14:00": false,
    "15:00": false,
    "16:00": false,
    "17:00": false,
    "18:00": false,
  });

  const datePick = () => {
    if (!day || !time) {
      setAlert("روز و زمان انتخاب کنید");
      setTimeout(() => {
        setAlert("");
      }, 1000);
      return;
    }
  };

  const resetTime = () => {
    let updatedTime = { ...times };
    Object.keys(updatedTime).forEach((v) => (updatedTime[v] = false));
    setTimes(updatedTime);
  };

  const assingDay = (day) => {
    setDay(day);
    resetTime();
    setSelectedDate("");
    setTime("");
  };

  const displayDate = (time) => {
    let updatedTime = { ...times };
    Object.keys(times).forEach((item) =>
      item === time ? (updatedTime[item] = true) : (updatedTime[item] = false)
    );
    setTimes(updatedTime);
    if (day) {
      setTime(time);
      setSelectedDate(
        `${toFarsiNumber(day.year)}/${toFarsiNumber(day.month)}/${toFarsiNumber(
          day.day
        )} - ${
          toFarsiNumber(time).slice(0, 2) + ":" + toFarsiNumber(time).slice(2)
        }`
      );
    } else {
      setAlert("روز انتخاب کنید");
      resetTime();
      setTimeout(() => {
        setAlert("");
      }, 1000);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <ArrowBackIosIcon
          className={classes.arrowBack}
          onClick={() => Router.push("/doctors")}
        />
        <p className={classes.title}>دکتر محمد رضا فرهانی</p>
      </div>
      <Calendar
        value={day}
        onChange={(day) => assingDay(day)}
        shouldHighlightWeekends
        minimumDate={utils("fa").getToday()}
        locale="fa"
      />
      <div className={classes.timeContainer}>
        {Object.keys(times).map((time, index) => (
          <p
            key={index}
            className={times[time] ? classes.activeTime : classes.time}
            onClick={() => displayDate(time)}
          >
            {toFarsiNumber(time).slice(0, 2) +
              ":" +
              toFarsiNumber(time).slice(2)}
          </p>
        ))}
      </div>
      {alert && <p className="alert">{alert}</p>}
      {selectedDate && <p className={classes.message}>{selectedDate} ساعت</p>}
      <button className={classes.button} onClick={() => datePick()}>
        ثبت
      </button>
    </div>
  );
}
