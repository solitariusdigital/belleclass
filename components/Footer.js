import classes from "./Footer.module.scss";

export default function Footer() {
  return (
    <div className={classes.footer}>
      <div className={classes.buttons}>
        <button>رزرو وقت حضوری</button>
        <button>مشاوره آنلاین رایگان</button>
      </div>
    </div>
  );
}
