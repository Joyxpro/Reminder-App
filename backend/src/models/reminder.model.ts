import mongoose, { Schema, Document } from "mongoose";

export interface IReminder extends Document {
  title: string;
  time: Date;
  notificationType: "desktop" | "call";
  user: mongoose.Types.ObjectId;
  status: "pending" | "done";
}

const reminderSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    time: {
      type: Date,
      requied: true,
    },
    notificationType: {
      type: String,
      enum: ["desktop", "call"],
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "done"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IReminder>("Reminder", reminderSchema);
