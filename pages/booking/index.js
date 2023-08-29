import DatePicker from "@/components/DatePicker";
import classes from "./booking.module.scss";
import { useRouter } from "next/router";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Router from "next/router";

export default function Booking() {
  const router = useRouter();
  const doctor = {
    id: router.query.id,
    name: router.query.name,
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <ArrowBackIosIcon
          className="icon"
          onClick={() => Router.push("/doctors")}
        />
        <p className={classes.title}>{doctor.name}</p>
      </div>
      <DatePicker />
    </div>
  );
}
