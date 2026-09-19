import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { verifyAuth } from "@/lib/auth";
import { toPublicUser } from "@/lib/toPublicUser";
import {
  deletePhotosFromObject,
  updateObjectWithPhotos,
} from "@/lib/objectStorage/objectStorage.service";

const USER_PHOTO_FIELDS = ["profilePhoto"];

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    verifyAuth(request);
    await dbConnect();

    const { id } = await context.params;
    const existing = await User.findById(id);
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Administrator not found" },
        { status: 404 }
      );
    }

    const { name, profilePhoto } = await request.json();

    const { updatedPayload, uploadUrls } = await updateObjectWithPhotos(
      { profilePhoto },
      existing,
      USER_PHOTO_FIELDS
    );

    if (name) existing.name = name;
    if (updatedPayload.profilePhoto !== undefined) {
      existing.profilePhoto = updatedPayload.profilePhoto;
    }

    await existing.save();

    return NextResponse.json({ success: true, data: toPublicUser(existing), uploadUrls });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const decoded = verifyAuth(request);
    await dbConnect();

    const { id } = await context.params;

    if (decoded.adminId === id) {
      return NextResponse.json(
        { success: false, error: "You cannot delete your own account while signed in." },
        { status: 400 }
      );
    }

    const existing = await User.findById(id);
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Administrator not found" },
        { status: 404 }
      );
    }

    const adminCount = await User.countDocuments({ role: "admin" });
    if (adminCount <= 1) {
      return NextResponse.json(
        { success: false, error: "Cannot delete the last remaining administrator." },
        { status: 400 }
      );
    }

    await deletePhotosFromObject(existing, USER_PHOTO_FIELDS);
    await User.deleteOne({ _id: id });

    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 }
    );
  }
}