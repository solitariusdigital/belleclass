import { useState, useContext } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./DatePicker.module.scss";
import { toFarsiNumber } from "../services/utility";
import { Calendar, utils } from "@hassanmojab/react-modern-calendar-datepicker";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
// import { Calendar, utils } from "react-modern-calendar-datepicker";
// import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { createVisitApi, getDoctorApi, updateDoctorApi } from "@/services/api";
import Router from "next/router";

export default function DatePicker({ doctorId }) {
  const { currentUser, setCurrentUser } = useContext(StateContext);

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

  const datePick = async () => {
    if (!day || !time) {
      setAlert("روز و زمان انتخاب کنید");
      setTimeout(() => {
        setAlert("");
      }, 1000);
      return;
    }
    // create a new visit
    let visit = {
      title: "",
      userId: currentUser["_id"],
      doctorId: doctorId,
      recordId: "",
      time: selectedDate,
      completed: false,
      canceled: false,
    };
    let newVisit = await createVisitApi(visit);
    // add new visit and user to doctor object
    let doctor = await getDoctorApi(doctorId);
    doctor.users.push(currentUser["_id"]);
    doctor.visits.push(newVisit["_id"]);
    await updateDoctorApi(doctor);
    Router.push("/portal");
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
