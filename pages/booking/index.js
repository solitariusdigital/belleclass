import DatePicker from "@/components/DatePicker";
import classes from "./booking.module.scss";

export default function Booking() {
  return (
    <div className={classes.container}>
      <DatePicker />
    </div>
  );
}
