import { Request, Response } from "express";
import Reminder, { IReminder } from "../models/reminder.model";
import User from "../models/user.model";
import cron from "node-cron";
import notifier from "node-notifier";
import moment from "moment-timezone";

interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

export const createReminder = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { title, time, notificationType } = req.body;

    // Check if the provided time is in the past
    const reminderTime = new Date();
    if (new Date(time) < reminderTime) {
      return res.status(400).json({
        message: "Cannot schedule a reminder for a past time",
      });
    }

    // Convert the provided UTC time to local server time (or any other desired time zone)
    const localTime = moment(time)
      .tz("Asia/Kolkata", true)
      .format("YYYY-MM-DD HH:mm:ss");

    // Convert the local time back to a Date object
    const reminderDate = moment(localTime, "YYYY-MM-DD HH:mm:ss").toDate();

    // Generate cron expression based on reminderDate
    const cronExpression = `${reminderDate.getMinutes()} ${reminderDate.getHours()} ${reminderDate.getDate()} ${
      reminderDate.getMonth() + 1
    } *`;

    // Validate `notificationType`
    if (!["desktop", "call"].includes(notificationType)) {
      return res.status(400).json({
        message: "Invalid notification type",
      });
    }

    // Fetch the user information to get phone number
    const user = await User.findById(req.user?.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Create a new reminder document with status "pending"
    const reminder: IReminder = new Reminder({
      title,
      time: reminderDate,
      notificationType,
      user: req.user?.id,
      status: "pending", // Set the initial status as "pending"
    });

    const savedReminder = await reminder.save();

    // Schedule reminder with node-cron
    cron.schedule(cronExpression, async () => {
      try {
        // Trigger the notification based on the type
        if (notificationType === "desktop") {
          // Trigger desktop notification
          notifier.notify({
            title: "Reminder",
            message: title,
          });
        }

        // Once the notification is successfully triggered, mark the reminder as done
        await Reminder.findByIdAndUpdate(savedReminder._id, { status: "done" });
        console.log(
          `Reminder with ID ${savedReminder._id} has been marked as done after notification.`
        );
      } catch (error) {
        console.error("Error in scheduling or updating reminder:", error);
      }
    });

    res.status(201).json(savedReminder);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error creating reminder",
      error,
    });
  }
};

// Get all reminder for the logged-in user
export const getReminders = async (
  req: AuthRequest,
  res: Response
): Promise<any> => {
  try {
    const reminders = await Reminder.find({
      user: req.user?.id,
    });
    res.status(200).json(reminders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching remidners", error });
  }
};

// Get a specific reminder by ID
export const getReminderById = async (
  req: AuthRequest,
  res: Response
): Promise<any> => {
  try {
    const reminder = await Reminder.findById(req.params.id);

    if (!reminder || reminder.user.toString() !== req.user?.id) {
      return res.status(400).json({
        message: "Reminder not found",
      });
    }

    res.status(200).json(reminder);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching reminder",
      error,
    });
  }
};

// Update a specific reminder by ID
export const updateReminder = async (
  req: AuthRequest,
  res: Response
): Promise<any> => {
  try {
    const reminder = await Reminder.findById(req.params.id);

    if (!reminder || reminder.user.toString() !== req.user?.id) {
      return res.status(404).json({
        message: "Reminder not found",
      });
    }

    const { title, time, notificationType } = req.body;

    // Update only the provided fields
    if (title) reminder.title = title;
    if (time) reminder.time = time;
    if (notificationType) {
      if (!["desktop", "call"].includes(notificationType)) {
        return res.status(400).json({
          message: "Invalid notification type",
        });
      }
      reminder.notificationType = notificationType;
    }

    const updateReminder = await reminder.save();
    res.status(200).json(updateReminder);
  } catch (error) {
    res.status(500).json({
      message: "Error updating reminder",
      error,
    });
  }
};

// Delete a specific reminder by ID
export const deleteReminder = async (
  req: AuthRequest,
  res: Response
): Promise<any> => {
  try {
    const reminder = await Reminder.findById(req.params.id);

    if (!reminder || reminder.user.toString() !== req.user?.id) {
      return res.status(404).json({
        message: "Reminder not found",
      });
    }

    await reminder.deleteOne();
    res.status(200).json({
      message: "Reminder delete successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting reminder",
      error,
    });
  }
};
