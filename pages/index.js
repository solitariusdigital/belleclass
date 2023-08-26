import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "../context/stateContext";
import classes from "./home.module.scss";
import Image from "next/legacy/image";
import background from "../assets/background.jpg";
import Expertise from "@/components/Expertise";
import Router from "next/router";

export default function Home() {
  const { expertiseAreas, setExpertiseAreas } = useContext(StateContext);

  useEffect(() => {
    expertiseAreas.map((nav) => {
      nav.active = false;
    });
    setExpertiseAreas([...expertiseAreas]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doctors = [
    {
      name: "دکتر محمد رضا فرهانی",
      desc: "فارغ التحصیل رشته پزشکی از دانشگاه علوم پزشکی تهران",
    },
    {
      name: "دکتر محمد رضا فرهانی",
      desc: "فارغ التحصیل رشته پزشکی از دانشگاه علوم پزشکی تهران",
    },
    {
      name: "دکتر محمد رضا فرهانی",
      desc: "فارغ التحصیل رشته پزشکی از دانشگاه علوم پزشکی تهران",
    },
  ];

  return (
    <Fragment>
      <div className={classes.heroHeader}>
        <Image
          className={classes.heroImage}
          src={background}
          placeholder="blur"
          alt="image"
          layout="fill"
          objectFit="cover"
          loading="eager"
        />
        <div className={classes.header}>
          <h1>The Gaurdian of Life</h1>
          <h1>نگهبان زندگی</h1>
          <button onClick={() => (window.location.href = "/doctors")}>
            رزرو وقت حضوری
          </button>
          <button onClick={() => (window.location.href = "/assessment")}>
            مشاوره آنلاین رایگان
          </button>
        </div>
      </div>
      <div className={classes.bannerHeroContainer}>
        <div className={classes.banner}></div>
        <div className={classes.banner}></div>
        <div className={classes.banner}></div>
      </div>
      <div className={classes.border}></div>
      <div className={classes.expertise}>
        <Expertise></Expertise>
      </div>
      <div className={classes.lifeStyleContainer}>
        <div className={classes.lifeStyle}>
          <p>
            فیلرهای پوستی مواد ژل مانندی هستند که برای بازگرداندن حجم از دست
            رفته، ایجاد خطوط صاف و نرم کردن چین و چروکها به زیر پوست تزریق
            میشوند. مدت زمان ماندگاری اثر فیلر های پوستی به محصول، ناحیه درمان و
            بیمار بستگی دارد. یکی از رایج ترین فیلرها، فیلرهای اسید هیالورونیک
            است. اسید هیالورونیک HA, یک ماده طبیعی است که در پوست یافت میشود و
            به صاف و هیدراته شدن پوست کمک می کند. فیلرهای HAمعمولا نرم و ژل
            مانند هستند و اثر آنها معمولا ۶ تا ۱۲ ماه باقی می ماند
          </p>
          <Image
            className={classes.image}
            src={background}
            placeholder="blur"
            alt="image"
            loading="eager"
            priority
          />
        </div>
        <div className={classes.lifeStyle}>
          <Image
            className={classes.image}
            src={background}
            placeholder="blur"
            alt="image"
            loading="eager"
          />
          <p>
            فیلرهای پوستی مواد ژل مانندی هستند که برای بازگرداندن حجم از دست
            رفته، ایجاد خطوط صاف و نرم کردن چین و چروکها به زیر پوست تزریق
            میشوند. مدت زمان ماندگاری اثر فیلر های پوستی به محصول، ناحیه درمان و
            بیمار بستگی دارد. یکی از رایج ترین فیلرها، فیلرهای اسید هیالورونیک
            است. اسید هیالورونیک HA, یک ماده طبیعی است که در پوست یافت میشود و
            به صاف و هیدراته شدن پوست کمک می کند. فیلرهای HAمعمولا نرم و ژل
            مانند هستند و اثر آنها معمولا ۶ تا ۱۲ ماه باقی می ماند
          </p>
        </div>
        <div className={classes.lifeStyle}>
          <p>
            فیلرهای پوستی مواد ژل مانندی هستند که برای بازگرداندن حجم از دست
            رفته، ایجاد خطوط صاف و نرم کردن چین و چروکها به زیر پوست تزریق
            میشوند. مدت زمان ماندگاری اثر فیلر های پوستی به محصول، ناحیه درمان و
            بیمار بستگی دارد. یکی از رایج ترین فیلرها، فیلرهای اسید هیالورونیک
            است. اسید هیالورونیک HA, یک ماده طبیعی است که در پوست یافت میشود و
            به صاف و هیدراته شدن پوست کمک می کند. فیلرهای HAمعمولا نرم و ژل
            مانند هستند و اثر آنها معمولا ۶ تا ۱۲ ماه باقی می ماند
          </p>
          <Image
            className={classes.image}
            src={background}
            placeholder="blur"
            alt="image"
            loading="eager"
            priority
          />
        </div>
      </div>

      <div className={classes.bannerContainer}>
        <div className={classes.banner}></div>
        <div className={classes.banner}></div>
        <div className={classes.banner}></div>
      </div>
      <div className={classes.doctorsContainer}>
        {doctors.map((doctor, index) => (
          <div
            className={classes.items}
            key={index}
            onClick={() => (window.location.href = "/doctors")}
          >
            <Image
              className={classes.image}
              placeholder="blur"
              src={background}
              alt="image"
              width={100}
              height={100}
              objectFit="cover"
              loading="eager"
            />
            <div>
              <p className={classes.name}>{doctor.name}</p>
              <p>{doctor.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={classes.videoContainer}>
        <div className={classes.boxContainer}>
          <div className={classes.box}>
            <video
              className={classes.video}
              preload="metadata"
              controls
              src="https://belleclass.com/uploads/1cceeb6f0d5e4042927d1c1d05368f52.MOV"
            />
          </div>
          <button onClick={() => (window.location.href = "/doctors")}>
            رزرو وقت حضوری
          </button>
          <p>
            فیلرهای پوستی مواد ژل مانندی هستند که برای بازگرداندن حجم از دست
            رفته، ایجاد خطوط صاف و نرم کردن چین و چروکها به زیر پوست تزریق
            میشوند. مدت زمان ماندگاری اثر فیلر های پوستی به محصول، ناحیه درمان و
            بیمار بستگی دارد. یکی از رایج ترین فیلرها، فیلرهای اسید هیالورونیک
            ناحیه درمان و بیمار بستگی دارد. یکی از رایج ترین فیلرها، فیلرهای
            اسید هیالورونیک است ناحیه درمان و بیمار بستگی دارد. یکی از رایج ترین
            فیلرها، فیلرهای اسید هیالورونیک است
          </p>
        </div>
        <div className={classes.boxContainer}>
          <div className={classes.box}>
            <video
              className={classes.video}
              preload="metadata"
              controls
              src="https://belleclass.com/uploads/e7750b4101324885a8e2e55ad4a6a5ab.MOV"
            />
          </div>
          <button onClick={() => (window.location.href = "/assessment")}>
            مشاوره آنلاین رایگان
          </button>
          <p>
            فیلرهای پوستی مواد ژل مانندی هستند که برای بازگرداندن حجم از دست
            رفته، ایجاد خطوط صاف و نرم کردن چین و چروکها به زیر پوست تزریق
            میشوند. مدت زمان ماندگاری اثر فیلر های پوستی به محصول
          </p>
        </div>
      </div>
    </Fragment>
  );
}
