import { Schema, Document, models, model } from "mongoose";

export interface IBlog extends Document {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  photo: string;
  tags: string[];
  content: string;
  author?: string;
  views: number;
  featured?: boolean;
  altText: string;
}

const BlogSchema = new Schema<IBlog>(
  {
    slug: {
      type: String,
      required: [true, "Slug Required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    title: { type: String, required: [true, "Title Required"] },
    metaTitle: { type: String, required: [true, "Meta Title Required"] },
    metaDescription: {
      type: String,
      required: [true, "Meta Description Required"],
    },
    tags: { type: [String], default: [] },
    photo: { type: String, required: [true, "Photo Required"] },
    content: { type: String, required: [true, "Content Required"] },
    author: { type: String, default: "" },
    views: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    altText: {
      type: String,
      required: [true, "Please provide alt text for the blog photo."],
    },
  },
  { timestamps: true }
);

const Blog = models.Blog || model<IBlog>("Blog", BlogSchema);
export default Blog;