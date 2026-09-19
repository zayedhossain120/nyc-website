import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { signAdminToken } from "@/lib/auth";
import { toPublicUser } from "@/lib/toPublicUser";

export async function GET() {
  try {
    await dbConnect();
    const count = await User.countDocuments({ role: "admin" });
    return NextResponse.json({ success: true, data: { exists: count > 0 } });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const existingCount = await User.countDocuments({ role: "admin" });
    if (existingCount > 0) {
      return NextResponse.json(
        { success: false, error: "An administrator account already exists. Please sign in instead." },
        { status: 403 }
      );
    }

    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: "Name, email and password are required." },
        { status: 400 }
      );
    }
    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role: "admin",
    });

    const token = signAdminToken({
      adminId: String(user._id),
      name: user.name,
      email: user.email,
      role: "admin",
    });

    return NextResponse.json(
      { success: true, data: { token, user: toPublicUser(user) } },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 }
    );
  }
}