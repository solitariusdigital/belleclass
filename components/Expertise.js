import { useState, useContext, useRef, Fragment, useEffect } from "react";
import { StateContext } from "../context/stateContext";
import classes from "./Expertise.module.scss";
import Router from "next/router";

export default function Expertise() {
  const { expertiseAreas, setExpertiseAreas } = useContext(StateContext);

  return (
    <div className={classes.items}>
      {expertiseAreas.map((item, index) => (
        <p
          className={item.active ? classes.active : ""}
          key={index}
          onClick={() => Router.push(item.link)}
        >
          {item.title}
        </p>
      ))}
    </div>
  );
}
