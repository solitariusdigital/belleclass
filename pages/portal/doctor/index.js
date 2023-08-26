import { useState, useContext, useRef, Fragment, useEffect } from "react";
import { StateContext } from "../../../context/stateContext";
import classes from "../portal.module.scss";
import Register from "@/components/Register";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import Image from "next/legacy/image";
import background from "../../../assets/background.jpg";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export default function Doctor() {
  const { userLogIn, setUserLogin } = useContext(StateContext);
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const [portalType, setPortalType] = useState("online" || "visit");
  const [displayDetails, setDisplayDetails] = useState(true);

  const online = [
    {
      title: "تورم تورم تورمتورم تتورم تورم و کبودی",
      completed: true,
      date: "1402/05/02 ",
    },
    {
      title: "وجود تورم و کبودی",
      completed: false,
      date: "1402/05/02 ",
    },
    {
      title: "وجود تورم و کبودی",
      completed: true,
      date: "1402/05/02 ",
    },
    {
      title: "وجود تورم و کبودی",
      completed: false,
      date: "1402/05/02 ",
    },
    {
      title: "تورم تورم تورمتورم تتورم تورم و کبودی",
      completed: true,
      date: "1402/05/02 ",
    },
    {
      title: "وجود تورم و کبودی",
      completed: false,
      date: "1402/05/02 ",
    },
    {
      title: "وجود تورم و کبودی",
      completed: true,
      date: "1402/05/02 ",
    },
    {
      title: "وجود تورم و کبودی",
      completed: false,
      date: "1402/05/02 ",
    },
  ];

  const visit = [
    {
      doctor: "دکتر محمد رضا فرهانی",
      title: "وجود تورمتورم تورم تورم و کبودی",
      completed: true,
      date: "1402/05/02 ",
      time: "09:30",
    },
    {
      doctor: "دکتر محمد رضا فرهانی",
      title: "وجود تورم و کبودی",
      completed: true,
      date: "1402/05/02 ",
      time: "11:30",
    },
    {
      doctor: "دکتر محمد رضا فرهانی",
      title: "وجود تورم و کبودی",
      completed: true,
      date: "1402/05/02 ",
      time: "14:30",
    },
    {
      doctor: "دکتر محمد رضا فرهانی",
      title: "وجود تورم و کبودی",
      completed: true,
      date: "1402/05/02 ",
      time: "18:30",
    },
    {
      doctor: "دکتر محمد رضا فرهانی",
      title: "وجود تورم و کبودی",
      completed: true,
      date: "1402/05/02 ",
      time: "10:30",
    },
  ];

  const selected = {
    title: "وجود تورم و کبودی",
    completed: false,
    date: "1402/05/02 ",
  };

  return (
    <div className={classes.containerDoctor}>
      {userLogIn && (
        <div className={classes.headerHero}>
          <p>سارا اکبری</p>
          <HealthAndSafetyIcon />
        </div>
      )}
      {!userLogIn ? (
        <div className={classes.register}>
          <Register></Register>
        </div>
      ) : (
        <div className={classes.portal}>
          {!displayDetails && (
            <div className={classes.navigation}>
              <p
                className={
                  portalType === "online" ? classes.nav : classes.navActive
                }
                onClick={() => setPortalType("visit")}
              >
                وقت حضوری
              </p>
              <p
                className={
                  portalType === "visit" ? classes.nav : classes.navActive
                }
                onClick={() => setPortalType("online")}
              >
                مشاوره آنلاین
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
