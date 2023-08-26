import { useState, useContext, useRef, Fragment, useEffect } from "react";
import { StateContext } from "../../../context/stateContext";
import classes from "../portal.module.scss";
import Register from "@/components/Register";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import Image from "next/legacy/image";
import background from "../../../assets/background.jpg";
import Person4Icon from "@mui/icons-material/Person4";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export default function Patient() {
  const { userLogIn, setUserLogin } = useContext(StateContext);
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const [portalType, setPortalType] = useState("online" || "visit");
  const [displayDetails, setDisplayDetails] = useState(false);

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
    <div className={classes.containerPatient}>
      {userLogIn && (
        <div className={classes.headerHero}>
          <p>سارا اکبری</p>
          <Person4Icon />
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
          {!displayDetails && (
            <div className={classes.cards}>
              {portalType === "online" && (
                <Fragment>
                  {online.map((item, index) => (
                    <div
                      className={classes.item}
                      key={index}
                      onClick={() => setDisplayDetails(!displayDetails)}
                    >
                      <div className={classes.topRow}>
                        <p className={classes.title}>{item.title}</p>
                        <KeyboardArrowLeftIcon />
                      </div>
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
                      <div className={classes.topRow}>
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
                        <p className={classes.time}>{item.time}</p>
                        <p>{item.date}</p>
                      </div>
                    </div>
                  ))}
                </Fragment>
              )}
            </div>
          )}
          {displayDetails && (
            <div className={classes.details}>
              <div className={classes.header}>
                <ArrowBackIosIcon
                  className="icon"
                  onClick={() => setDisplayDetails(!displayDetails)}
                />
                <p className={classes.title}>{selected.title}</p>
              </div>
              <div className={classes.topRow}>
                <p>{selected.date}</p>
                {selected.completed ? (
                  <div className={classes.row}>
                    <p>مشاوره تکمیل شده</p>
                    <TaskAltIcon className={classes.icon} />
                  </div>
                ) : (
                  <div className={classes.row}>
                    <p>در انتظار مشاوره</p>
                    <TimelapseIcon className={classes.icon} />
                  </div>
                )}
              </div>
              <Image
                className={classes.image}
                src={background}
                placeholder="blur"
                alt="image"
                loading="eager"
                priority
              />
              <p className={classes.text}>
                فیلرهای پوستی مواد ژل مانندی هستند که برای بازگرداندن حجم از دست
                رفته، ایجاد خطوط صاف و نرم کردن چین و چروکها به زیر پوست تزریق
                میشوند. مدت زمان ماندگاری اثر فیلر های پوستی به محصول، ناحیه
                درمان و بیمار بستگی دارد. یکی از رایج ترین فیلرها، فیلرهای اسید
                هیالورونیک است
              </p>
              <div className={classes.rowDoctor}>
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
                <p className={classes.title}>دکتر محمد رضا فرهانی</p>
              </div>
              <p className={classes.text}>
                فیلرهای پوستی مواد ژل مانندی هستند که برای بازگرداندن حجم از دست
                رفته، ایجاد خطوط صاف و نرم کردن چین و چروکها به زیر پوست تزریق
                میشوند. مدت زمان ماندگاری اثر فیلر های پوستی به محصول، ناحیه
                درمان و بیمار بستگی دارد. یکی از رایج ترین فیلرها
              </p>
              <div className={classes.input}>
                <p className={classes.label}>مشاوره تخصصی</p>
                <textarea
                  placeholder="اینجا تایپ کن"
                  type="text"
                  id="comment"
                  name="comment"
                  // value={comment}
                  autoComplete="off"
                  dir="rtl"
                ></textarea>
                <button>ارسال</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
