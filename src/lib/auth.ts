import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import config from "@/config";

export interface AdminTokenPayload {
  adminId: string;
  name: string;
  email: string;
  role: "admin";
}

export function signAdminToken(payload: AdminTokenPayload): string {
  return jwt.sign(payload, config.jwt_secret, { expiresIn: "7d" });
}

export function verifyAuth(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    throw new Error("No token provided");
  }

  let decoded: string | jwt.JwtPayload;
  try {
    decoded = jwt.verify(token, config.jwt_secret);
  } catch {
    throw new Error("Invalid token");
  }

  if (typeof decoded !== "object" || decoded.role !== "admin") {
    throw new Error("Forbidden: admin access required");
  }

  return decoded as AdminTokenPayload & jwt.JwtPayload;
}