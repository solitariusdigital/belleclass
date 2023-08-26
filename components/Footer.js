import classes from "./Footer.module.scss";
import InstagramIcon from "@mui/icons-material/Instagram";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import Router from "next/router";

export default function Footer() {
  return (
    <div className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.buttons}>
          <button onClick={() => (window.location.href = "/doctors")}>
            رزرو وقت حضوری
          </button>
          <button onClick={() => (window.location.href = "/assessment")}>
            مشاوره آنلاین رایگان
          </button>
        </div>
        <div className={classes.information}>
          <div className={classes.row}>
            <LocationOnOutlinedIcon />
            <p>تهران، فرشته، خیابان نیلوفر، مجتمع یوتوپیا، طبقه ۴</p>
          </div>
          <div className={classes.row}>
            <PhoneIphoneOutlinedIcon />
            <p>۰۲۱ ۹۱۶۹۰۰۳۰</p>
          </div>
          <div
            className={classes.row}
            onClick={() =>
              window.open(
                "https://www.instagram.com/belleclass.official",
                "_ blank"
              )
            }
          >
            <InstagramIcon className="icon" />
            <p>Belle Class Official</p>
          </div>
        </div>
      </div>
    </div>
  );
}
