import DatePicker from "@/components/DatePicker";
import classes from "./booking.module.scss";

export default function index() {
  return (
    <div className={classes.container}>
      <DatePicker />
    </div>
  );
}
