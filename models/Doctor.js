import { Schema, model, models } from "mongoose";

const DoctorSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
      required: false,
    },
    education: String,
    permission: {
      type: String,
      required: false,
    },
    image: String,
    tags: [String],
    users: [String],
    visits: [String],
    records: [String],
  },
  { timestamps: true }
);

const Doctor = models.Doctor || model("Doctor", DoctorSchema);
export default Doctor;
