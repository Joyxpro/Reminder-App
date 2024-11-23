import { Router } from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/user.controller";
import { protect } from "../middleware/authMiddleware";

const router: Router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);


// Protected route
router.get("/profile", protect, getUserProfile);

export default router;

