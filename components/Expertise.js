import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "../context/stateContext";
import classes from "./Expertise.module.scss";
import Router from "next/router";

export default function Expertise() {
  const { expertiseAreas, setExpertiseAreas } = useContext(StateContext);
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);
  const { displayExpertise, setDisplayExpertise } = useContext(StateContext);

  const expertisesPage = (title) => {
    let route = "/expertises";
    Router.push(route);
    expertiseAreas.map((item) => {
      item.title === title ? (item.active = true) : (item.active = false);
    });
    navigationTopBar.map((nav) => {
      if (nav.link === route) {
        nav.active = true;
      } else {
        nav.active = false;
      }
    });
    setDisplayExpertise(title);
    setExpertiseAreas([...expertiseAreas]);
    setNavigationTopBar([...navigationTopBar]);
  };

  return (
    <div className={classes.expertise}>
      <h2>خدمات کلینیک</h2>
      <div className={`${classes.items} animate__animated animate__pulse`}>
        {expertiseAreas.map((item, index) => (
          <p
            className={item.active ? classes.active : ""}
            key={index}
            onClick={() => expertisesPage(item.title)}
          >
            {item.title}
          </p>
        ))}
      </div>
    </div>
  );
}
