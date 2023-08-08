import { useState, useContext, useRef, Fragment, useEffect } from "react";
import classes from "./Expertise.module.scss";
import Router from "next/router";

export default function Expertise() {
  const expertises = [
    {
      title: "درمان با فرکانس رادویی",
    },
    {
      title: "فیلر",
    },
    {
      title: "ذخیره فیبروبلاست",
    },
    {
      title: "نوتریژنومیکس",
    },
    {
      title: "لیزر",
    },
    {
      title: "کاشت مو و ابرو",
    },
    {
      title: "بوتاکس",
    },
    {
      title: "پلاسمای غنی از پلاکت",
    },
    {
      title: "هایفوتراپی",
    },
    {
      title: "کرایوتراپی",
    },
    {
      title: "لیفت با نخ",
    },
  ];

  return (
    <div className={classes.items}>
      {expertises.map((item, index) => (
        <p key={index} onClick={() => Router.push(`expertises/${item.title}`)}>
          {item.title}
        </p>
      ))}
    </div>
  );
}
