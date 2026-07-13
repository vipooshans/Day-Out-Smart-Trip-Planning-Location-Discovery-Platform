import mongoose from "mongoose";

const placeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Place name is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      enum: ["restaurant", "park", "museum", "cafe", "beach", "landmark", "shopping", "entertainment", "other"],
      default: "other",
    },
    address: {
      type: String,
      default: "",
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      },
    },
    images: [{ type: String }],
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    priceLevel: {
      type: Number,
      min: 0,
      max: 4,
      default: 0,
    },
    tags: [{ type: String }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

placeSchema.index({ location: "2dsphere" });

const Place = mongoose.model("Place", placeSchema);

export default Place;
