import classes from "./Footer.module.scss";
import InstagramIcon from "@mui/icons-material/Instagram";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Image from "next/legacy/image";
import logo from "@/assets/logo.png";
import Router from "next/router";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import MinimalTechLab from "@/assets/MinimalTechLab.svg";

export default function Footer() {
  return (
    <div className={classes.footer}>
      <div className={classes.scroll}>
        <KeyboardArrowUpIcon
          className="icon"
          onClick={() =>
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            })
          }
          sx={{ fontSize: 36 }}
        />
      </div>
      <div className={classes.container}>
        <div className={classes.logo} onClick={() => Router.push("/")}>
          <Image width={100} height={100} src={logo} alt="logo" priority />
        </div>
        <div className={classes.buttons}>
          <button onClick={() => Router.push("/doctors")}>
            رزرو مراجعه حضوری
          </button>
          <button onClick={() => Router.push("/assessment")}>
            مشاوره آنلاین رایگان
          </button>
        </div>
        <div className={classes.information}>
          <div className={classes.row}>
            <LocationOnOutlinedIcon />
            <p>تهران، فرشته، خیابان نیلوفر، مجتمع یوتوپیا، طبقه ۴</p>
          </div>
          <div
            className={classes.row}
            onClick={() => window.open("tel:02191690030", "_self")}
          >
            <PhoneIphoneOutlinedIcon className="icon" />
            <p className="icon">۰۲۱ ۹۱۶۹۰۰۳۰</p>
          </div>
          <div
            className={classes.row}
            onClick={() =>
              window.open(
                "https://www.instagram.com/belleclass.official",
                "_ self"
              )
            }
          >
            <InstagramIcon className="icon" />
            <p className="icon">belleclass.official</p>
          </div>
        </div>
      </div>
      <div className={classes.copyright}>
        <p>کليه حقوق اين وب اپلیکیشن به بل کلاس تعلق دارد</p>
        <p>belleclass.com @Copyright 2023</p>
        <div
          className={classes.row}
          onClick={() =>
            window.open(
              "https://docs.google.com/forms/d/e/1FAIpQLSdqKHLBydQIfm06LTtw0wELHaDJJFGU3GNQFsVWNd3t0jz5hA/viewform?usp=sf_link",
              "_ self"
            )
          }
        >
          <Image
            className={classes.image}
            src={MinimalTechLab}
            alt="image"
            width={120}
            height={30}
            loading="eager"
          />
          <p className={classes.action}>طراحی توسعه پشتیبانی</p>
          <PrecisionManufacturingIcon sx={{ fontSize: 18 }} />
        </div>
      </div>
    </div>
  );
}
