import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Inquiry from "@/models/Inquiry";
import { verifyAuth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    verifyAuth(req);
    await dbConnect();

    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: inquiries });
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

    const payload = await req.json();
    const name = payload.name?.toString().trim();
    const email = payload.email?.toString().trim().toLowerCase();

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Name and email are required to submit a project inquiry." },
        { status: 400 }
      );
    }

    const inquiry = await Inquiry.create({
      name,
      email,
      company: payload.company?.toString().trim(),
      budget: payload.budget?.toString().trim(),
      timeline: payload.timeline?.toString().trim(),
      serviceInterest: payload.serviceInterest?.toString().trim(),
      message: payload.message?.toString().trim(),
    });

    return NextResponse.json(
      { success: true, data: inquiry, message: "Your project inquiry has been submitted successfully." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    verifyAuth(req);
    await dbConnect();

    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "Both id and status are required." },
        { status: 400 }
      );
    }

    const updated = await Inquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Inquiry not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
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

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "An id query parameter is required." },
        { status: 400 }
      );
    }

    const deleted = await Inquiry.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Inquiry not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 }
    );
  }
}