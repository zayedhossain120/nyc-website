import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import { verifyAuth } from "@/lib/auth";
import {
  appendPhotoUrls,
  createObjectWithPhotos,
} from "@/lib/objectStorage/objectStorage.service";

const BLOG_PHOTO_FIELDS = ["photo"];

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const limit = Math.max(1, Number(searchParams.get("limit")) || 20);
    const search = searchParams.get("search")?.trim();

    const filter = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { tags: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const blogs = await Blog.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await Blog.countDocuments(filter);
    const data = await appendPhotoUrls(blogs, BLOG_PHOTO_FIELDS);

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

    const { updatedPayload, uploadUrls } = await createObjectWithPhotos(
      reqData,
      BLOG_PHOTO_FIELDS
    );

    const blog = await Blog.create(updatedPayload);

    return NextResponse.json({ success: true, data: blog, uploadUrls }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 }
    );
  }
}