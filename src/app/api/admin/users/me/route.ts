import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { verifyAuth } from "@/lib/auth";
import { toPublicUser } from "@/lib/toPublicUser";
import { appendPhotoUrls } from "@/lib/objectStorage/objectStorage.service";

const USER_PHOTO_FIELDS = ["profilePhoto"];

export async function GET(req: NextRequest) {
  try {
    const decoded = verifyAuth(req);
    await dbConnect();

    const user = await User.findById(decoded.adminId);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Administrator not found" },
        { status: 404 }
      );
    }

    const data = await appendPhotoUrls(toPublicUser(user), USER_PHOTO_FIELDS);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 }
    );
  }
}
