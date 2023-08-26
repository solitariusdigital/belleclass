import { useState, useContext, Fragment, useEffect } from "react";
import classes from "./assessment.module.scss";
import Progress from "@/components/Progress";

export default function Assessment() {
  const [progressCompleted, setProgressCompleted] = useState(20);

  return (
    <div className={classes.container}>
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
