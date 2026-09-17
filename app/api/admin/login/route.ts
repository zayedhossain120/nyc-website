import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/lib/models/user";
import { signAdminToken } from "@/lib/auth";
import { toPublicUser } from "@/lib/utils/user";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { email, password } = await req.json();

    if (typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json(
        { success: false, error: "Email and password are required." },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email: email.trim().toLowerCase(), role: "admin" }).select("+password");

    if (!user || !user.isActive) {
      return NextResponse.json(
        { success: false, error: "Invalid admin credentials." },
        { status: 401 }
      );
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, error: "Invalid admin credentials." },
        { status: 401 }
      );
    }

    const token = signAdminToken({
      adminId: String(user._id),
      name: user.name,
      email: user.email,
      role: "admin",
    });

    return NextResponse.json({ success: true, data: { token, user: toPublicUser(user) } });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 }
    );
  }
}