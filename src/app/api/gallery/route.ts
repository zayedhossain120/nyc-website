import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Gallery, { IGallery } from "@/models/Gallery";
import { verifyAuth } from "@/lib/auth";
import {
  appendPhotoUrls,
  createObjectWithPhotos,
  deletePhotosFromObject,
} from "@/lib/objectStorage/objectStorage.service";

const GALLERY_PHOTO_FIELDS = ["photo"];

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const limit = Math.max(1, Number(searchParams.get("limit")) || 40);
    const search = searchParams.get("search")?.trim();

    const filter = search
      ? {
          $or: [
            { projectName: { $regex: search, $options: "i" } },
            { tags: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const items = await Gallery.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await Gallery.countDocuments(filter);
    const data = await appendPhotoUrls(items, GALLERY_PHOTO_FIELDS);

    return NextResponse.json({
      success: true,
      meta: { page, limit, total },
      data,
    });
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

    const reqData = await req.json();
    const items = Array.isArray(reqData) ? reqData : [reqData];

    const results: IGallery[] = [];
    const allUploadUrls: Record<string, string>[] = [];

    for (const item of items) {
      const { updatedPayload, uploadUrls } = await createObjectWithPhotos(
        item,
        GALLERY_PHOTO_FIELDS
      );
      allUploadUrls.push(uploadUrls);
      results.push(updatedPayload as IGallery);
    }

    const created = await Gallery.insertMany(results);

    return NextResponse.json(
      { success: true, data: created, uploadUrls: allUploadUrls },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    verifyAuth(req);
    await dbConnect();

    const { ids } = await req.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { success: false, error: "Please provide an array of IDs to delete." },
        { status: 400 }
      );
    }

    const existing = await Gallery.find({ _id: { $in: ids } });
    if (existing.length === 0) {
      return NextResponse.json(
        { success: false, error: "No matching items found." },
        { status: 404 }
      );
    }

    for (const item of existing) {
      await deletePhotosFromObject(item, GALLERY_PHOTO_FIELDS);
    }

    const res = await Gallery.deleteMany({ _id: { $in: ids } });

    return NextResponse.json({
      success: true,
      data: { deletedCount: res.deletedCount },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 }
    );
  }
}