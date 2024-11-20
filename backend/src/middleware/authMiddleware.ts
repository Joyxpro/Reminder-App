import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

console.log("JWT Secret:", JWT_SECRET);

interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    console.log("Token not provided in headers");
    return res.status(401).json({
      message: "Not authorized, no token",
    });
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    console.log("Decoded Token:", decoded);

    req.user = { id: decoded.id };
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    res.status(401).json({
      message: "Not authorized, token failed",
    });
  }
};
