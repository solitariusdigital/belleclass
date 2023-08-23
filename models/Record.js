import { Schema, model, models } from "mongoose";

const RecordSchema = new Schema(
  {
    title: String,
    images: {
      one: String,
      two: String,
      three: String,
    },
    user: String,
    doctor: String,
    archive: String,
    comments: [String],
    completed: Boolean,
  },
  { timestamps: true }
);

const Record = models.Record || model("Record", RecordSchema);
export default Record;
