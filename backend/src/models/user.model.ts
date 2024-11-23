import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  reminders: mongoose.Types.ObjectId[];
}

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      requied: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    reminders: {
      type: Schema.Types.ObjectId,
      ref: "Reminder",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", userSchema);
