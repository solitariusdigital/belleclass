import { useState, useContext, useRef, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./doctors.module.scss";
import Image from "next/legacy/image";
import Router from "next/router";
import dbConnect from "@/services/dbConnect";
import doctorModel from "@/models/Doctor";

export default function Doctors({ doctors }) {
  return (
    <div className={classes.container}>
      {doctors.map((doctor, index) => (
        <div className={classes.information} key={index}>
          <div className={classes.row}>
            <Image
              className={classes.image}
              src={doctor.image}
              placeholder="blur"
              blurDataURL={doctor.image}
              alt="image"
              loading="eager"
              width={70}
              height={70}
              objectFit="cover"
              priority
            />
            <h2 className={classes.name}>{doctor.name}</h2>
          </div>
          <div className={classes.tags}>
            {doctor.tags.map((tag, index) => (
              <p
                key={index}
                onClick={() => Router.push(`/doctors/${doctor["_id"]}`)}
              >
                {tag}
              </p>
            ))}
          </div>
          <p className={classes.bio}>
            {doctor.bio.slice(0, 130)} ...{" "}
            <span onClick={() => Router.push(`/doctors/${doctor["_id"]}`)}>
              بیشتر
            </span>
          </p>
          <div className={classes.button}>
            <button
              onClick={() =>
                Router.push({
                  pathname: "/booking",
                  query: { id: doctor["_id"] },
                })
              }
            >
              نوبت دهی
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// initial connection to db
export async function getServerSideProps(context) {
  try {
    await dbConnect();
    const doctors = await doctorModel.find();
    return {
      props: {
        doctors: JSON.parse(JSON.stringify(doctors)),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}
