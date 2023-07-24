"use client";
import classes from "./page.module.scss";
import dynamic from "next/dynamic";

export default function Home() {
  return (
    <main className={classes.main}>
      <div className={classes.menu}></div>
    </main>
  );
}
