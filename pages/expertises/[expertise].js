import { useState, useContext, useRef, Fragment, useEffect } from "react";
import { StateContext } from "../../context/stateContext";
import { useRouter } from "next/router";
import classes from "./expertise.module.scss";
import ExpertiseComp from "@/components/Expertise";

export default function Expertise() {
  const { expertiseAreas, setExpertiseAreas } = useContext(StateContext);
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);

  const router = useRouter();
  let expertise = router.query.expertise;

  useEffect(() => {
    navigationTopBar.map((nav) => {
      nav.active = false;
    });
    expertiseAreas.map((item) => {
      item.title === expertise ? (item.active = true) : (item.active = false);
    });
    setExpertiseAreas([...expertiseAreas]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expertise]);

  return (
    <div className={classes.container}>
      <ExpertiseComp></ExpertiseComp>
      <div className={classes.information}>
        <h2>{expertise}</h2>
      </div>
    </div>
  );
}
