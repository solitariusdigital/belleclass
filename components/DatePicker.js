import { useState, useContext } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./DatePicker.module.scss";
import { toFarsiNumber } from "../services/utility";
import { Calendar, utils } from "@hassanmojab/react-modern-calendar-datepicker";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
// import { Calendar, utils } from "react-modern-calendar-datepicker";
// import "react-modern-calendar-datepicker/lib/DatePicker.css";
import Router from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import {
  createVisitApi,
  getDoctorApi,
  updateDoctorApi,
  getUserApi,
  updateUserApi,
} from "@/services/api";

export default function DatePicker({ doctorId }) {
  const { currentUser, setCurrentUser } = useContext(StateContext);

  const [name, setName] = useState(currentUser.name);
  const [title, setTitle] = useState("");
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

  const createVisit = async () => {
    if (!day || !time) {
      setAlert("روز و زمان الزامیست");
      setTimeout(() => {
        setAlert("");
      }, 3000);
      return;
    }
    if (!name || !title) {
      setAlert("نام و عنوان الزامیست");
      setTimeout(() => {
        setAlert("");
      }, 3000);
      return;
    }
    // create a new visit object
    let visit = {
      title: title,
      userId: currentUser["_id"],
      doctorId: doctorId,
      recordId: "",
      time: selectedDate,
      completed: false,
      canceled: false,
    };
    let newVisit = await createVisitApi(visit);
    await updateDoctorObject(newVisit["_id"]);
    await updateUserObject();
    window.location.href = "/portal";
  };

  const updateDoctorObject = async (id) => {
    // add new visit and user to doctor object
    let doctor = await getDoctorApi(doctorId);
    doctor.visits.push(id);
    if (!doctor.users.includes(currentUser["_id"])) {
      doctor.users.push(currentUser["_id"]);
    }
    await updateDoctorApi(doctor);
  };

  const updateUserObject = async () => {
    // add new doctor to user object
    let user = await getUserApi(currentUser["_id"]);
    user.name = name;
    if (!user.doctors.includes(doctorId)) {
      user.doctors.push(doctorId);
    }
    await updateUserApi(user);
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
      }, 3000);
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
      <div className={classes.input}>
        <div className={classes.bar}>
          <p className={classes.label}>
            نام
            <span>*</span>
          </p>
          <CloseIcon
            className="icon"
            onClick={() => setName("")}
            sx={{ fontSize: 16 }}
          />
        </div>
        <input
          type="text"
          id="name"
          name="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          autoComplete="off"
          dir="rtl"
        />
        <div className={classes.bar}>
          <p className={classes.label}>
            عنوان
            <span>*</span>
          </p>
          <CloseIcon
            className="icon"
            onClick={() => setTitle("")}
            sx={{ fontSize: 16 }}
          />
        </div>
        <input
          placeholder="فیلر صورت"
          type="text"
          id="title"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          autoComplete="off"
          dir="rtl"
        />
      </div>
      {alert && <p className="alert">{alert}</p>}
      {selectedDate && <p className={classes.message}>{selectedDate} ساعت</p>}
      <button className={classes.button} onClick={() => createVisit()}>
        ثبت
      </button>
    </div>
  );
}
