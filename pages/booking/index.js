import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import DatePicker from "@/components/DatePicker";
import classes from "./booking.module.scss";
import { useRouter } from "next/router";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Router from "next/router";
import Register from "@/components/Register";

export default function Booking() {
  const { currentUser, setCurrentUser } = useContext(StateContext);

  const router = useRouter();
  const doctor = {
    id: router.query.id,
    name: router.query.name,
  };

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
            <p className={classes.title}>{doctor.name}</p>
          </div>
          <DatePicker doctorId={doctor.id} />
        </div>
      )}
    </Fragment>
  );
}
