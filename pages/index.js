import { useState, useContext, useRef, Fragment, useEffect } from "react";
import { StateContext } from "../context/stateContext";
import classes from "./home.module.scss";
import Menu from "@/components/Menu";
import Image from "next/image";
import background from "../assets/background.jpg";

export default function Home() {
  const { menuMobile, setMenuMobile } = useContext(StateContext);

  return (
    <Fragment>
      <div className={classes.menu}>
        <Menu />
      </div>
      <div className={classes.container}>
        <Image
          className={classes.image}
          src={background}
          placeholder="blur"
          alt="image"
          layout="fill"
          objectFit="cover"
          priority
          loading="eager"
        />
        <div className={classes.header}>
          <h1>نگهبان زندگی</h1>
          <button>رزرو وقت حضوری</button>
          <button>مشاور آنلاین رایگان</button>
        </div>
        <div className={classes.highlightContainer}>
          <div className={classes.highlightOne}>asddasd</div>
          <div className={classes.highlightTwo}>asdasd</div>
          <div className={classes.highlightThree}>asdas</div>
        </div>
        <div
          className={`${classes.heading} animate__animated animate__fadeInLeft`}
        >
          <h1>Find clarity in chaos</h1>
          <p>
            Major Tom is a full-service marketing agency been purpose-built to
            help organizations thrive in an increasingly complex landscape.
          </p>
        </div>
      </div>
    </Fragment>
  );
}
