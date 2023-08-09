import { useState, useContext, useRef, Fragment, useEffect } from "react";
import { StateContext } from "../../context/stateContext";
import classes from "./portal.module.scss";
import Register from "@/components/Register";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import Image from "next/legacy/image";
import background from "../../assets/background.jpg";
import Person4Icon from "@mui/icons-material/Person4";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";

export default function Portal() {
  const { userLogIn, setUserLogin } = useContext(StateContext);
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const [portalType, setPortalType] = useState("online" || "visit");

  const online = [
    {
      title: "تورم تورم تورمتورم تتورم تورمورم تورم و کبودی",
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

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <p>سارا اکبری</p>
        <Person4Icon />
      </div>
      {userLogIn ? (
        <div className={classes.register}>
          <Register></Register>
        </div>
      ) : (
        <div className={classes.portal}>
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
          <div className={classes.cards}>
            {portalType === "online" && (
              <Fragment>
                {online.map((item, index) => (
                  <div className={classes.item} key={index}>
                    <p className={classes.title}>{item.title}</p>
                    <div className={classes.row}>
                      {item.completed ? (
                        <div className={classes.row}>
                          <TaskAltIcon className={classes.icon} />
                          <p>مشاوره تکمیل شده</p>
                        </div>
                      ) : (
                        <div className={classes.row}>
                          <TimelapseIcon className={classes.icon} />
                          <p>در انتظار مشاوره</p>
                        </div>
                      )}
                      <p>{item.date}</p>
                    </div>
                  </div>
                ))}
              </Fragment>
            )}
            {portalType === "visit" && (
              <Fragment>
                {visit.map((item, index) => (
                  <div className={classes.item} key={index}>
                    <div className={classes.rowImage}>
                      <Image
                        className={classes.image}
                        placeholder="blur"
                        src={background}
                        alt="image"
                        width={50}
                        height={50}
                        objectFit="cover"
                        loading="eager"
                      />
                      <p className={classes.title}>{item.doctor}</p>
                    </div>
                    <div className={classes.row}>
                      <p className={classes.title}>{item.title}</p>
                      <p>{item.time}</p>
                      <p>{item.date}</p>
                    </div>
                  </div>
                ))}
              </Fragment>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
