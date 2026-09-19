import { Schema, Document, models, model } from "mongoose";

export interface IGallery extends Document {
  photo: string;
  tags?: string[];
  projectName?: string;
}

const GallerySchema = new Schema<IGallery>(
  {
    photo: {
      type: String,
      required: [true, "Please provide a photo."],
    },
    tags: {
      type: [String],
      default: [],
    },
    projectName: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Gallery = models.Gallery || model<IGallery>("Gallery", GallerySchema);
export default Gallery;