import express, { Request, Application, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/userRouter";
import reminderRouter from "./routes/reminderRouter";

// Create the Express app
const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("API is running....");
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/reminder", reminderRouter);


// Error handling middleware
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(error.stack);
  res.status(500).json({
    messge: error.message,
  });
});

export default app;
