import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: String,
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    permission: String,
    doctors: [String],
    visits: [String],
    records: [String],
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);
export default User;
