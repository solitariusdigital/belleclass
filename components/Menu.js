import { useState, useContext, useRef, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./Menu.module.scss";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Router from "next/router";
import Image from "next/legacy/image";
import logo from "../assets/logo.png";

export default function Menu() {
  const { menuMobile, setMenuMobile } = useContext(StateContext);
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);

  const activateNav = (link, index) => {
    setMenuMobile(false);
    navigationTopBar.map((nav, i) => {
      if (i === index) {
        Router.push(link);
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
        <Image
          width={50}
          height={50}
          src={logo}
          alt="logo"
          onClick={() => (window.location.href = "/")}
        />
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
          <Image
            width={50}
            height={50}
            src={logo}
            alt="logo"
            onClick={() => (window.location.href = "/")}
          />
          {menuMobile ? (
            <CloseIcon
              className={classes.menuIcon}
              onClick={() => setMenuMobile(!menuMobile)}
              sx={{ fontSize: 30 }}
            />
          ) : (
            <MenuIcon
              className={classes.menuIcon}
              onClick={() => setMenuMobile(!menuMobile)}
              sx={{ fontSize: 30 }}
            />
          )}
        </div>
        {menuMobile && (
          <div
            className={`${classes.menuMobile} animate__animated animate__slideInDown`}
          >
            <div className={classes.list}>
              {navigationTopBar.map((nav, index) => (
                <Fragment key={index}>
                  <div
                    className={!nav.active ? classes.nav : classes.navActive}
                    onClick={() => activateNav(nav.link, index)}
                  >
                    <p>{nav.title}</p>
                  </div>
                </Fragment>
              ))}
            </div>
            <div className={classes.buttons}>
              <button onClick={() => (window.location.href = "/doctors")}>
                رزرو مراجعه حضوری
              </button>
              <button onClick={() => (window.location.href = "/assessment")}>
                مشاوره آنلاین رایگان
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
