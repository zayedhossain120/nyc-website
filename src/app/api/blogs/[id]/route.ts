import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import { verifyAuth } from "@/lib/auth";
import {
  appendPhotoUrls,
  deletePhotosFromObject,
  updateObjectWithPhotos,
} from "@/lib/objectStorage/objectStorage.service";

const BLOG_PHOTO_FIELDS = ["photo"];

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await context.params;

    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }

    const data = await appendPhotoUrls(blog, BLOG_PHOTO_FIELDS);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    verifyAuth(request);
    await dbConnect();
    const payload = await request.json();

    const { id } = await context.params;

    const existing = await Blog.findById(id);
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }

    const { updatedPayload, uploadUrls } = await updateObjectWithPhotos(
      payload,
      existing,
      BLOG_PHOTO_FIELDS
    );

    const updated = await Blog.findByIdAndUpdate(id, updatedPayload, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json({ success: true, data: updated, uploadUrls });
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
    verifyAuth(request);
    await dbConnect();

    const { id } = await context.params;

    const existing = await Blog.findById(id);
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }

    await Blog.deleteOne({ _id: id });
    await deletePhotosFromObject(existing, BLOG_PHOTO_FIELDS);

    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 }
    );
  }
}