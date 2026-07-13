import mongoose from "mongoose";

const stopSchema = new mongoose.Schema(
  {
    place: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",
      required: true,
    },
    scheduledAt: { type: Date },
    notes: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const tripSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Trip title is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    collaborators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    startDate: { type: Date },
    endDate: { type: Date },
    stops: [stopSchema],
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Trip = mongoose.model("Trip", tripSchema);

export default Trip;
