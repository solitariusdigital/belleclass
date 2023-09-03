import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import DatePicker from "@/components/DatePicker";
import classes from "./booking.module.scss";
import { useRouter } from "next/router";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import Register from "@/components/Register";
import { getDoctorApi } from "@/services/api";

export default function Booking() {
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const [doctorName, setDoctorName] = useState("");

  const router = useRouter();
  const doctorId = router.query.id;
  const recordId = router.query.record;

  useEffect(() => {
    const fetchData = async () => {
      let doctorData = await getDoctorApi(doctorId);
      setDoctorName(doctorData.name);
    };
    fetchData().catch(console.error);
  }, [doctorId]);

  return (
    <Fragment>
      {!currentUser ? (
        <div className="register">
          <Register></Register>
        </div>
      ) : (
        <div className={classes.container}>
          <div className={classes.header}>
            <ArrowBackIosNewIcon
              className="icon"
              onClick={() => (window.location.href = "/doctors")}
            />
            <h2 className={classes.title}>{doctorName}</h2>
          </div>
          <DatePicker doctorId={doctorId} recordId={recordId} />
        </div>
      )}
    </Fragment>
  );
}
