import { useState, useContext, useRef, Fragment, useEffect } from "react";
import { StateContext } from "../context/stateContext";
import classes from "./home.module.scss";
import Menu from "@/components/Menu";

export default function Home() {
  const { menuMobile, setMenuMobile } = useContext(StateContext);

  return (
    <main className={classes.main}>
      <div className={classes.menu}>
        <Menu />
      </div>
      {menuMobile && (
        <div className={classes.menuMobile}>
          <p>items</p>
          <p>items</p>
          <p>items</p>
          <p>items</p>
          <p>items</p>
        </div>
      )}
      <div className={classes.heading}>
        <div className={classes.intro}>
          <h1>Find clarity in chaos</h1>
          <p>
            Major Tom is a full-service marketing agency been purpose-built to
            help organizations thrive in an increasingly complex landscape.
          </p>
        </div>
      </div>
    </main>
  );
}
