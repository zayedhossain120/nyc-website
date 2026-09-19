import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { verifyAuth } from "@/lib/auth";
import { toPublicUser } from "@/lib/toPublicUser";
import {
  appendPhotoUrls,
  createObjectWithPhotos,
} from "@/lib/objectStorage/objectStorage.service";

const USER_PHOTO_FIELDS = ["profilePhoto"];

export async function GET(req: NextRequest) {
  try {
    verifyAuth(req);
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim();

    const filter: Record<string, unknown> = { role: "admin" };
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const users = await User.find(filter).sort({ createdAt: -1 });
    const withPhotos = await appendPhotoUrls(
      users.map(toPublicUser),
      USER_PHOTO_FIELDS
    );

    return NextResponse.json({ success: true, data: withPhotos });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    verifyAuth(req);
    await dbConnect();

    const payload = await req.json();
    const { name, email, password, profilePhoto } = payload;

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

    const existing = await User.findOne({ email: email.trim().toLowerCase() });
    if (existing) {
      return NextResponse.json(
        { success: false, error: "An administrator with this email already exists." },
        { status: 400 }
      );
    }

    const { updatedPayload, uploadUrls } = await createObjectWithPhotos(
      { profilePhoto },
      USER_PHOTO_FIELDS
    );

    const user = await User.create({
      name,
      email: email.trim().toLowerCase(),
      password,
      role: "admin",
      profilePhoto: updatedPayload.profilePhoto,
    });

    return NextResponse.json(
      { success: true, data: toPublicUser(user), uploadUrls },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 }
    );
  }
}