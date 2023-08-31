import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import DatePicker from "@/components/DatePicker";
import classes from "./booking.module.scss";
import { useRouter } from "next/router";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Router from "next/router";
import Register from "@/components/Register";
import { getDoctorApi } from "@/services/api";

export default function Booking() {
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const [doctorName, setDoctorName] = useState("");

  const router = useRouter();
  const doctorId = router.query.id;

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
            <ArrowBackIosIcon
              className="icon"
              onClick={() => Router.push("/doctors")}
            />
            <p className={classes.title}>{doctorName}</p>
          </div>
          <DatePicker doctorId={doctorId} />
        </div>
      )}
    </Fragment>
  );
}
