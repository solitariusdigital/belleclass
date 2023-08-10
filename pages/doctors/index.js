import { useState, useContext, useRef, Fragment, useEffect } from "react";
import { StateContext } from "../../context/stateContext";
import classes from "./doctors.module.scss";
import Image from "next/legacy/image";
import background from "../../assets/background.jpg";

export default function Doctors() {
  const doctors = [
    {
      name: "دکتر محمد رضا فرهانی",
      desc: "فارغ التحصیل رشته پزشکی از دانشگاه علوم پزشکی تهران است. او در حال حاضر مشاوره درمان های آینده نگر بل کلاس را بر عهده دارد",
      tags: ["۵ سال سابقه", "هیئت علمی", "تمام وقت", "پوست"],
    },
    {
      name: "دکتر محمد رضا فرهانی",
      desc: "هیئت علمی و دانشیار  دانشگاه علوم پزشکی تهران است. او رییس مرکز لیزر بیمارستان تخصصی رازی، متخصص پوست، مو و زیبایی در بیمارستان تخصصی رازی و   کلینک بل کلاس است",
      tags: ["۵ سال سابقه", "هیئت علمی", "تمام وقت", "پوست", "مو", "تزریق"],
    },
    {
      name: "دکتر محمد رضا فرهانی",
      desc: "​​​​​​​فارغ التحصیل رشته پزشکی از دانشگاه علوم پزشکی تهران است. او متخصص پوست، مو و زیبایی در بیمارستان تخصصی رازی و   کلینک بل کلاس است",
      tags: ["۵ سال سابقه", "هیئت علمی", "تمام وقت", "پوست", "مو"],
    },
    {
      name: "دکتر محمد رضا فرهانی",
      desc: "​​​​​​​فارغ التحصیل رشته پزشکی از دانشگاه علوم پزشکی تهران است. او متخصص پوست، مو و زیبایی در بیمارستان تخصصی رازی و   کلینک بل کلاس است",
      tags: ["۵ سال سابقه", "هیئت علمی", "تمام وقت", "پوست", "مو"],
    },
  ];

  return (
    <div className={classes.container}>
      {doctors.map((doctor, index) => (
        <div className={classes.items} key={index}>
          <div className={classes.row}>
            <Image
              className={classes.image}
              placeholder="blur"
              src={background}
              alt="image"
              width={70}
              height={70}
              objectFit="cover"
              loading="eager"
            />
            <p className={classes.name}>{doctor.name}</p>
          </div>
          <div className={classes.tags}>
            {doctor.tags.map((tag) => (
              <p key={tag}>{tag}</p>
            ))}
          </div>
          <div className={classes.column}>
            <p>{doctor.desc}</p>
            <button>رزرو وقت حضوری</button>
          </div>
        </div>
      ))}
    </div>
  );
}
