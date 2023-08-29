import { useState, useContext, Fragment, useEffect } from "react";
import classes from "./assessment.module.scss";
import Progress from "@/components/Progress";
import avatar from "@/assets/doctorAvatar.png";
import Image from "next/legacy/image";

export default function Assessment() {
  const [progressCompleted, setProgressCompleted] = useState(20);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Image
          className={classes.image}
          src={avatar}
          placeholder="blur"
          alt="image"
          width={150}
          height={150}
          objectFit="cover"
          loading="eager"
        />
        <div>
          <h2>پزشک بل کلاس</h2>
          <p>مشاوره رایگان</p>
        </div>
      </div>
      <Progress color={"#e7c69a"} completed={progressCompleted} />

      <button
        disabled={progressCompleted === 0}
        onClick={() => setProgressCompleted(progressCompleted - 20)}
      >
        back
      </button>
      <button
        disabled={progressCompleted === 100}
        onClick={() => setProgressCompleted(progressCompleted + 20)}
      >
        next
      </button>
    </div>
  );
}
