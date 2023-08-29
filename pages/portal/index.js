import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import Router from "next/router";
import Register from "@/components/Register";

export default function Index() {
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);

  useEffect(() => {
    if (currentUser) {
      navigationTopBar.map((nav) => {
        if (nav.link === "/portal") {
          nav.active = true;
        } else {
          nav.active = false;
        }
      });
      Router.push({
        pathname: `/portal/${currentUser.permission}`,
        query: { id: currentUser["_id"], p: currentUser.permission },
      });
    }
  }, [currentUser, navigationTopBar]);

  return (
    <Fragment>
      {!currentUser && (
        <div className="register">
          <Register></Register>
        </div>
      )}
    </Fragment>
  );
}
