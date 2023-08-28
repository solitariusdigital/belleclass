import { Schema, model, models } from "mongoose";

const VisitSchema = new Schema(
  {
    title: String,
    userId: String,
    doctorId: String,
    recordId: String,
    time: String,
  },
  { timestamps: true }
);

const Visit = models.Visit || model("Visit", VisitSchema);
export default Visit;
