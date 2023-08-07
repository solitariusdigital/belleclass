import { useState, useContext, useRef, Fragment, useEffect } from "react";
import { StateContext } from "../context/stateContext";
import classes from "./Menu.module.scss";
import MenuIcon from "@mui/icons-material/Menu";
import Router from "next/router";

export default function Menu() {
  const { menuMobile, setMenuMobile } = useContext(StateContext);
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);

  const activateNav = (link, index) => {
    navigationTopBar.map((nav, i) => {
      if (i === index) {
        // Router.push(link);
        nav.active = true;
      } else {
        nav.active = false;
      }
    });
    setNavigationTopBar([...navigationTopBar]);
  };

  return (
    <div className={classes.container}>
      <div className={classes.largeMenu}>
        <p>LOGO</p>
        <div className={classes.largeNavigation}>
          {navigationTopBar
            .map((nav, index) => (
              <Fragment key={index}>
                <div
                  className={!nav.active ? classes.nav : classes.navActive}
                  onClick={() => activateNav(nav.link, index)}
                >
                  <p>{nav.title}</p>
                </div>
              </Fragment>
            ))
            .reverse()}
        </div>
      </div>
      <div className={classes.smallMenu}>
        <div className={classes.topBar}>
          <p>LOGO</p>
          <MenuIcon
            className={classes.menuIcon}
            onClick={() => setMenuMobile(!menuMobile)}
            sx={{ fontSize: 30 }}
          />
        </div>
        {menuMobile && (
          <div
            className={`${classes.menuMobile} animate__animated animate__slideInDown`}
          >
            {navigationTopBar
              .map((nav, index) => (
                <Fragment key={index}>
                  <div
                    className={!nav.active ? classes.nav : classes.navActive}
                    onClick={() => activateNav(nav.link, index)}
                  >
                    <p>{nav.title}</p>
                  </div>
                </Fragment>
              ))
              .reverse()}
          </div>
        )}
      </div>
    </div>
  );
}
