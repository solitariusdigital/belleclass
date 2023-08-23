import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    permission: {
      type: String,
      required: false,
    },
    doctors: [String],
    visits: [String],
    records: [String],
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);
export default User;
