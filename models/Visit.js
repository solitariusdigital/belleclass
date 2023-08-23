import { Schema, model, models } from "mongoose";

const VisitSchema = new Schema(
  {
    title: String,
    user: String,
    doctor: String,
    record: String,
    time: String,
    date: String,
  },
  { timestamps: true }
);

const Visit = models.Visit || model("Visit", VisitSchema);
export default Visit;
