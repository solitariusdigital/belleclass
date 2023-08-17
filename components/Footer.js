import classes from "./Footer.module.scss";
import InstagramIcon from "@mui/icons-material/Instagram";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";

export default function Footer() {
  return (
    <div className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.buttons}>
          <button>رزرو وقت حضوری</button>
          <button>مشاوره آنلاین رایگان</button>
        </div>
        <div className={classes.information}>
          <div className={classes.row}>
            <PlaceIcon />
            <p>تهران، فرشته، خیابان نیلوفر، مجتمع یوتوپیا، طبقه ۴</p>
          </div>
          <div className={classes.row}>
            <PhoneIcon />
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
            <p>اینستاگرام</p>
          </div>
        </div>
      </div>
    </div>
  );
}
