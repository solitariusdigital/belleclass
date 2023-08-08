import { useState, useContext, useRef, Fragment, useEffect } from "react";
import { StateContext } from "../../context/stateContext";
import { useRouter } from "next/router";
import classes from "./expertise.module.scss";

export default function Expertise() {
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);
  const router = useRouter();
  let expertise = router.query.expertise;

  useEffect(() => {
    navigationTopBar.map((nav) => {
      nav.active = false;
    });
    setNavigationTopBar([...navigationTopBar]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.items}>
      <h2>{expertise}</h2>
    </div>
  );
}
