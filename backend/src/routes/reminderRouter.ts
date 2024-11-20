import { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import {
  createReminder,
  deleteReminder,
  getReminderById,
  getReminders,
  updateReminder,
} from "../controllers/reminder.controller";

const router = Router();

router.post("/", protect, createReminder);
router.get("/", protect, getReminders);
router.get("/:id", protect, getReminderById);
router.put("/:id", protect, updateReminder);
router.delete("/:id", protect, deleteReminder);

export default router;
