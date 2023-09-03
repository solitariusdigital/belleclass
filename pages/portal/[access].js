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
import secureLocalStorage from "react-secure-storage";
import {
  getDoctorApi,
  updateRecordApi,
  getRecordApi,
  getVisitApi,
  updateVisitApi,
  getUserApi,
} from "@/services/api";

export default function Access({ records, visits }) {
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const [portalType, setPortalType] = useState("record" || "visit");
  const [displayDetails, setDisplayDetails] = useState(false);
  const [selected, setSelected] = useState(null);

  const [displayVisits, setDisplayVisits] = useState([]);
  const [displayRecords, setDisplayRecords] = useState([]);
  const [comment, setComment] = useState("");
  const [alert, setAlert] = useState("");

  useEffect(() => {
    if (!currentUser) {
      Router.push("/portal");
    } else {
      const fetchData = async () => {
        // inject user info into record object
        const recordsData = await Promise.all(
          records.map(async (record) => {
            const [doctorData, userData] = await Promise.all([
              getDoctorApi(record.doctorId),
              getUserApi(record.userId),
            ]);
            return {
              ...record,
              doctor: doctorData,
              user: userData,
            };
          })
        );
        setDisplayRecords(recordsData);
        // inject doctor/user info into visit object
        const visitsData = await Promise.all(
          visits.map(async (visit) => {
            const [doctorData, userData] = await Promise.all([
              getDoctorApi(visit.doctorId),
              getUserApi(visit.userId),
            ]);
            return {
              ...visit,
              doctor: doctorData,
              user: userData,
            };
          })
        );
        setDisplayVisits(visitsData);
      };
      fetchData().catch(console.error);
    }
  }, [currentUser, records, visits]);

  const margin = {
    margin: "8px 0px",
  };

  const actionRecord = async (record) => {
    if (!comment) {
      setAlert("مشاوره خالی");
      setTimeout(() => {
        setAlert("");
      }, 3000);
      return;
    }

    let recordData = await getRecordApi(record["_id"]);
    recordData.comments[1] = comment;
    recordData.completed = true;
    await updateRecordApi(recordData);
    Router.push("/portal");
  };

  const actionVisit = async (id, type) => {
    const message = `${
      type === "done" ? "تکمیل مراجعه مطمئنی؟" : "لغو مراجعه مطمئنی؟"
    }`;
    const confirm = window.confirm(message);
    if (confirm) {
      let recordData = await getVisitApi(id);
      switch (type) {
        case "done":
          recordData.completed = true;
          break;
        case "cancel":
          recordData.canceled = true;
          break;
      }
      await updateVisitApi(recordData);
      Router.push("/portal");
    }
  };

  const logOut = () => {
    secureLocalStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  return (
    <Fragment>
      {currentUser && (
        <div className={classes.container}>
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
                    portalType === "record" ? classes.nav : classes.navActive
                  }
                  onClick={() => setPortalType("visit")}
                >
                  مراجعه حضوری
                </p>
                <p
                  className={
                    portalType === "visit" ? classes.nav : classes.navActive
                  }
                  onClick={() => setPortalType("record")}
                >
                  مشاوره آنلاین
                </p>
              </div>
            )}
            {!displayDetails && (
              <div className={classes.analytics}>
                {portalType === "visit" && (
                  <Fragment>
                    <div className={classes.row}>
                      <p>{displayVisits.length}</p>
                      <p className={classes.grey}>تعداد</p>
                    </div>
                    <div className={classes.row}>
                      <p>
                        {
                          displayVisits.filter((record) => record.completed)
                            .length
                        }
                      </p>
                      <p className={classes.grey}>تکمیل</p>
                    </div>
                    <div className={classes.row}>
                      <p>
                        {
                          displayVisits.filter((record) => record.canceled)
                            .length
                        }
                      </p>
                      <p className={classes.grey}>لغو</p>
                    </div>
                  </Fragment>
                )}
                {portalType === "record" && (
                  <Fragment>
                    <div className={classes.row}>
                      <p>{displayRecords.length}</p>
                      <p className={classes.grey}>تعداد</p>
                    </div>
                    <div className={classes.row}>
                      <p>
                        {
                          displayRecords.filter((record) => record.completed)
                            .length
                        }
                      </p>
                      <p className={classes.grey}>تکمیل</p>
                    </div>
                  </Fragment>
                )}
              </div>
            )}
            {!displayDetails && (
              <div className={classes.cards}>
                {portalType === "record" && (
                  <Fragment>
                    {displayRecords.map((item, index) => (
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
                                <p>مشاوره تکمیل</p>
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
                        <div className={classes.subRow} style={margin}>
                          <div className={classes.image}>
                            <Image
                              className={classes.image}
                              src={item.doctor?.image}
                              placeholder="blur"
                              blurDataURL={item.doctor?.image}
                              alt="image"
                              width={70}
                              height={70}
                              objectFit="cover"
                              loading="eager"
                            />
                          </div>
                          <div>
                            <h2 className={classes.title}>
                              {item.doctor?.name}
                            </h2>
                            <p>{item.doctor?.education}</p>
                          </div>
                        </div>
                        <div className={classes.row} style={margin}>
                          <p className={classes.greyTitle}>تاریخ ثبت</p>
                          <p>{convertDate(item.createdAt)}</p>
                        </div>
                        <div className={classes.row} style={margin}>
                          <p className={classes.greyTitle}>عنوان</p>
                          <p className={classes.title}>{item.title}</p>
                        </div>
                        {(currentUser.permission === "admin" ||
                          currentUser.permission === "doctor") && (
                          <Fragment>
                            <div className={classes.row} style={margin}>
                              <p className={classes.greyTitle}>بیمار</p>
                              <p className={classes.title}>{item.user?.name}</p>
                            </div>
                            <div className={classes.row} style={margin}>
                              <p className={classes.greyTitle}>موبایل</p>
                              <p className={classes.title}>
                                {item.user?.phone}
                              </p>
                            </div>
                          </Fragment>
                        )}
                        <div className={classes.row} style={margin}>
                          {item.canceled ? (
                            <div className={classes.row}>
                              <div className={classes.subRow}>
                                <CloseIcon
                                  className={classes.icon}
                                  sx={{ color: "#d40d12" }}
                                />
                                <p>مراجعه لغو</p>
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
                                    <p>مراجعه تکمیل</p>
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
                                    <p>زمان مراجعه</p>
                                  </div>
                                  <p className={classes.time}>{item.time}</p>
                                </div>
                              )}
                            </Fragment>
                          )}
                        </div>
                        {(currentUser.permission === "admin" ||
                          currentUser.permission === "doctor") &&
                          !item.canceled &&
                          !item.completed && (
                            <div className={classes.action}>
                              <TaskAltIcon
                                onClick={() => actionVisit(item["_id"], "done")}
                                className={classes.icon}
                                sx={{ color: "#57a361" }}
                              />
                              <CloseIcon
                                onClick={() =>
                                  actionVisit(item["_id"], "cancel")
                                }
                                className={classes.icon}
                                sx={{ color: "#d40d12" }}
                              />
                            </div>
                          )}
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
                {(currentUser.permission === "admin" ||
                  currentUser.permission === "doctor") && (
                  <div className={classes.row} style={margin}>
                    <p className={classes.title}>{selected.user?.phone}</p>
                    <p className={classes.title}>{selected.user?.name}</p>
                  </div>
                )}
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
                <div className={classes.row} style={margin}>
                  <p>{convertDate(selected.createdAt)}</p>
                </div>
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
                  <h2 className={classes.title}>پزشک بل کلاس</h2>
                </div>
                {selected.completed ? (
                  <div className={classes.row}>
                    <p>{convertDate(selected.updatedAt)}</p>
                    <div className={classes.subRow}>
                      <p>مشاوره تکمیل</p>
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
                    <button
                      onClick={() =>
                        Router.push({
                          pathname: "/booking",
                          query: { id: selected.doctor["_id"] },
                        })
                      }
                    >
                      رزرو مراجعه حضوری
                    </button>
                  </Fragment>
                )}
                {!selected.completed &&
                  (currentUser.permission === "admin" ||
                    currentUser.permission === "doctor") && (
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
                        <button onClick={() => actionRecord(selected)}>
                          ارسال
                        </button>
                      </div>
                    </Fragment>
                  )}
              </div>
            )}
          </div>
          {!displayDetails && (
            <div className={classes.logout} onClick={() => logOut()}>
              <p>خروج از پرتال</p>
            </div>
          )}
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
    let permission = context.query.p;

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
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .sort((a, b) => a.completed - b.completed);
    visits
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .sort((a, b) => a.completed - b.completed)
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
