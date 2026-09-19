import { Document, Model, Schema, models, model } from "mongoose";

export type InquiryStatus = "New" | "Contacted" | "In Review" | "Archived";

export interface IInquiry extends Document {
  name: string;
  email: string;
  company?: string;
  budget?: string;
  timeline?: string;
  serviceInterest?: string;
  message?: string;
  status: InquiryStatus;
}

const InquirySchema = new Schema<IInquiry>(
  {
    name: {
      type: String,
      required: [true, "Please provide your name."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email address."],
      trim: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Please provide a valid email address."],
    },
    company: { type: String, trim: true, default: "" },
    budget: { type: String, trim: true, default: "" },
    timeline: { type: String, trim: true, default: "" },
    serviceInterest: { type: String, trim: true, default: "" },
    message: { type: String, trim: true, default: "" },
    status: {
      type: String,
      enum: ["New", "Contacted", "In Review", "Archived"],
      default: "New",
    },
  },
  { timestamps: true }
);

const Inquiry: Model<IInquiry> = models.Inquiry || model<IInquiry>("Inquiry", InquirySchema);
export default Inquiry;