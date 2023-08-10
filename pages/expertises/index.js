import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "../../context/stateContext";
import classes from "./expertise.module.scss";
import Expertise from "@/components/Expertise";

export default function Expertises() {
  const { expertiseAreas, setExpertiseAreas } = useContext(StateContext);
  const { displayExpertise, setDisplayExpertise } = useContext(StateContext);

  useEffect(() => {
    expertiseAreas.map((item) => {
      item.title === displayExpertise
        ? (item.active = true)
        : (item.active = false);
    });
    setExpertiseAreas([...expertiseAreas]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.container}>
      <Expertise></Expertise>
      <div className={classes.information}>
        <h2>{displayExpertise}</h2>
      </div>
    </div>
  );
}
