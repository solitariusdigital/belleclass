import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./portal.module.scss";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import Image from "next/legacy/image";
import Person4Icon from "@mui/icons-material/Person4";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Router from "next/router";
import dbConnect from "@/services/dbConnect";
import recordModel from "@/models/Record";
import visitModel from "@/models/Visit";
import doctorModel from "@/models/Doctor";
import { convertDate } from "@/services/utility";
import avatar from "@/assets/avatar.png";
import CloseIcon from "@mui/icons-material/Close";
import {
  getDoctorApi,
  updateRecordApi,
  getRecordApi,
  getVisitApi,
  updateVisitApi,
} from "@/services/api";

export default function Patient({ records, visits }) {
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const [portalType, setPortalType] = useState("online" || "visit");
  const [displayDetails, setDisplayDetails] = useState(false);
  const [selected, setSelected] = useState(null);

  const [displayVisits, setDisplayVisits] = useState([]);
  const [comment, setComment] = useState("");
  const [alert, setAlert] = useState("");

  useEffect(() => {
    if (!currentUser) {
      Router.push("/portal");
    } else {
      // inject doctor info into visit object
      visits.forEach(async (item, index) => {
        let doctorData = await getDoctorApi(item.doctorId);
        visits[index].doctor = doctorData;
      });
      setDisplayVisits(visits);
    }
  }, [currentUser, records, visits]);

  const margin = {
    margin: "8px 0px",
  };

  const submit = async (id) => {
    if (!comment) {
      setAlert("مشاوره خالی");
      setTimeout(() => {
        setAlert("");
      }, 3000);
      return;
    }

    let recordData = await getRecordApi(id);
    recordData.comments[1] = comment;
    recordData.completed = true;
    await updateRecordApi(recordData);
    Router.push("/portal");
  };

  const cancelVisit = async (id) => {
    const confirm = window.confirm("لغو مراجعه مطمئنی؟");
    if (confirm) {
      let recordData = await getVisitApi(id);
      recordData.canceled = true;
      await updateVisitApi(recordData);
      Router.push("/portal");
    }
  };

  return (
    <Fragment>
      {currentUser && (
        <div className={classes.containerPatient}>
          <div className={classes.headerHero}>
            <p>{currentUser.name ? currentUser.name : currentUser.phone}</p>
            {currentUser.permission === "patient" && <Person4Icon />}
            {currentUser.permission === "doctor" && <HealthAndSafetyIcon />}
            {currentUser.permission === "admin" && <MilitaryTechIcon />}
          </div>
          <div className={classes.portal}>
            {!displayDetails && (
              <div className={classes.navigation}>
                <p
                  className={
                    portalType === "online" ? classes.nav : classes.navActive
                  }
                  onClick={() => setPortalType("visit")}
                >
                  مراجعه حضوری
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
            {records.length === 0 && portalType === "online" && (
              <p className="message">مشاوره آنلاین خالی</p>
            )}
            {displayVisits.length === 0 && portalType === "visit" && (
              <p className="message">مراجعه حضوری خالی</p>
            )}
            {!displayDetails && (
              <div className={classes.cards}>
                {portalType === "online" && (
                  <Fragment>
                    {records.map((item, index) => (
                      <div
                        className={classes.item}
                        key={index}
                        onClick={() => {
                          setDisplayDetails(!displayDetails);
                          setSelected(item);
                          window.scrollTo(0, 0);
                        }}
                      >
                        <div className={classes.row} style={margin}>
                          <p className={classes.title}>{item.title}</p>
                          <KeyboardArrowLeftIcon />
                        </div>
                        <div className={classes.row} style={margin}>
                          <p className={classes.greyTitle}>تاریخ ثبت</p>
                          <p>{convertDate(item.createdAt)}</p>
                        </div>
                        <div className={classes.row}>
                          {item.completed ? (
                            <div className={classes.row} style={margin}>
                              <div className={classes.subRow}>
                                <TaskAltIcon
                                  className={classes.icon}
                                  sx={{ color: "#57a361" }}
                                />
                                <p>مشاوره تکمیل شده</p>
                              </div>
                              <p>{convertDate(item.updatedAt)}</p>
                            </div>
                          ) : (
                            <div className={classes.row} style={margin}>
                              <div className={classes.subRow}>
                                <TimelapseIcon
                                  className={classes.icon}
                                  sx={{ color: "#b69119" }}
                                />
                                <p>در انتظار مشاوره</p>
                              </div>
                              <p>{convertDate(item.createdAt)}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </Fragment>
                )}
                {portalType === "visit" && (
                  <Fragment>
                    {displayVisits.map((item, index) => (
                      <div className={classes.item} key={index}>
                        <div className={classes.row} style={margin}>
                          <div className={classes.image}>
                            <Image
                              className={classes.image}
                              src={item.doctor.image}
                              placeholder="blur"
                              blurDataURL={item.doctor.image}
                              alt="image"
                              width={70}
                              height={70}
                              objectFit="cover"
                              loading="eager"
                            />
                          </div>
                          <p className={classes.title}>{item.doctor.name}</p>
                        </div>
                        <div className={classes.row} style={margin}>
                          <p className={classes.greyTitle}>عنوان</p>
                          <p className={classes.title}>{item.title}</p>
                        </div>
                        <div className={classes.row} style={margin}>
                          <p className={classes.greyTitle}>تاریخ ثبت</p>
                          <p>{convertDate(item.createdAt)}</p>
                        </div>
                        <div className={classes.row} style={margin}>
                          {item.canceled ? (
                            <div className={classes.row}>
                              <div className={classes.subRow}>
                                <CloseIcon
                                  className={classes.icon}
                                  sx={{ color: "#d40d12" }}
                                />
                                <p>مراجعه لغو شده</p>
                              </div>
                              <p>{convertDate(item.updatedAt)}</p>
                            </div>
                          ) : (
                            <Fragment>
                              {item.completed ? (
                                <div className={classes.row}>
                                  <div className={classes.subRow}>
                                    <TaskAltIcon
                                      className={classes.icon}
                                      sx={{ color: "#57a361" }}
                                    />
                                    <p>مراجعه تکمیل شده</p>
                                  </div>
                                  <p>{convertDate(item.updatedAt)}</p>
                                </div>
                              ) : (
                                <div className={classes.row}>
                                  <div className={classes.subRow}>
                                    <TimelapseIcon
                                      className={classes.icon}
                                      sx={{ color: "#b69119" }}
                                    />
                                    <p>در انتظار مراجعه</p>
                                    {!item.canceled && !item.completed && (
                                      <p
                                        className={classes.cancel}
                                        onClick={() => cancelVisit(item["_id"])}
                                      >
                                        لغو
                                      </p>
                                    )}
                                  </div>
                                  <p className={classes.time}>{item.time}</p>
                                </div>
                              )}
                            </Fragment>
                          )}
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
                <div className={classes.row} style={margin}>
                  <p>{convertDate(selected.createdAt)}</p>
                  <p className={classes.greyTitle}>تاریخ ثبت</p>
                </div>
                <div className={classes.imageContainer}>
                  <Image
                    className={classes.image}
                    src={selected.image}
                    placeholder="blur"
                    blurDataURL={selected.image}
                    alt="image"
                    loading="eager"
                    layout="fill"
                    objectFit="cover"
                    priority
                  />
                </div>
                <p className={classes.text}>{selected.comments[0]}</p>
                <div className={classes.rowDoctor}>
                  <Image
                    className={classes.image}
                    src={avatar}
                    placeholder="blur"
                    alt="image"
                    width={70}
                    height={70}
                    objectFit="cover"
                    loading="eager"
                  />
                  <p className={classes.title}>پزشک بل کلاس</p>
                </div>
                {selected.completed ? (
                  <div className={classes.row}>
                    <p>{convertDate(selected.updatedAt)}</p>
                    <div className={classes.subRow}>
                      <p>مشاوره تکمیل شده</p>
                      <TaskAltIcon
                        className={classes.icon}
                        sx={{ color: "#57a361" }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className={classes.row}>
                    <p>{convertDate(selected.createdAt)}</p>
                    <div className={classes.subRow}>
                      <p>در انتظار مشاوره</p>
                      <TimelapseIcon
                        className={classes.icon}
                        sx={{ color: "#b69119" }}
                      />
                    </div>
                  </div>
                )}
                {selected.completed && (
                  <Fragment>
                    <p className={classes.text}>{selected.comments[1]}</p>
                    <button onClick={() => (window.location.href = "/doctors")}>
                      رزرو مراجعه حضوری
                    </button>
                  </Fragment>
                )}
                {!selected.completed && (
                  <Fragment>
                    <div className={classes.input}>
                      <p className={classes.label}>مشاوره تخصصی</p>
                      <textarea
                        placeholder="..."
                        type="text"
                        id="comment"
                        name="comment"
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                        autoComplete="off"
                        dir="rtl"
                      ></textarea>
                      <p className="alert">{alert}</p>
                      <button onClick={() => submit(selected["_id"])}>
                        ارسال
                      </button>
                    </div>
                  </Fragment>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
}

// initial connection to db
export async function getServerSideProps(context) {
  try {
    await dbConnect();
    let id = context.query.id;
    let permission = context.query.permission;

    let records = null;
    let visits = null;

    switch (permission) {
      case "doctor":
        const doctor = await doctorModel.find({ userId: id });
        const doctorId = doctor[0]["_id"].toString();
        records = await recordModel.find({ doctorId: doctorId });
        visits = await visitModel.find({ doctorId: doctorId });
        break;
      case "patient":
        records = await recordModel.find({ userId: id });
        visits = await visitModel.find({ userId: id });
        break;
      case "admin":
        records = await recordModel.find();
        visits = await visitModel.find();
        break;
    }

    records
      .sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt))
      .sort((a, b) => a.completed - b.completed);
    visits
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .sort((a, b) => a.canceled - b.canceled);

    return {
      props: {
        records: JSON.parse(JSON.stringify(records)),
        visits: JSON.parse(JSON.stringify(visits)),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}
