import dbConnect from "@/services/dbConnect";
import doctorModel from "@/models/Doctor";
import Image from "next/legacy/image";
import classes from "./doctors.module.scss";
import Router from "next/router";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export default function Doctor({ doctor }) {
  return (
    <div className={classes.profile}>
      <div className={classes.information}>
        <div>
          <div className={classes.arrow}>
            <ArrowBackIosIcon
              className="icon"
              onClick={() => Router.push("/doctors")}
            />
          </div>
          <Image
            className={classes.image}
            src={doctor.image}
            placeholder="blur"
            blurDataURL={doctor.image}
            alt="image"
            loading="eager"
            width={150}
            height={200}
            objectFit="cover"
            priority
          />
          <h2 className={classes.name}>{doctor.name}</h2>
          <button
            onClick={() =>
              Router.push({
                pathname: "/booking",
                query: { id: doctor["_id"] },
              })
            }
          >
            تقویم
          </button>
        </div>
        <div className={classes.tags}>
          {doctor.tags.map((tag, index) => (
            <p key={index}>{tag}</p>
          ))}
        </div>
        <p className={classes.info}>{doctor.education}</p>
        <p className={classes.info}>{doctor.bio}</p>
      </div>
    </div>
  );
}

// initial connection to db
export async function getServerSideProps(context) {
  try {
    await dbConnect();
    let id = context.params.doctor;
    const doctor = await doctorModel.findById(id);

    return {
      props: {
        doctor: JSON.parse(JSON.stringify(doctor)),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
