import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "../../context/stateContext";
import Router from "next/router";

export default function Index() {
  const { currentUser, setCurrentUser } = useContext(StateContext);

  useEffect(() => {
    Router.push("portal/patient");
    if (currentUser) {
      //   Router.push(`/portal${currentUser.permission}`);
    }
  }, [currentUser]);
}
