import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
  animalType: { type: String, required: true, trim: true }, // dog/cat/other
  description: { type: String, required: true, trim: true },
  locationText: { type: String, required: true, trim: true }, // address/landmark
  images: [
    {
      public_id: {
        type: String,
        required: [true, "Please add at least one product image"],
      },
      url: {
        type: String,
      },
    },
  ],
  status: {
    type: String,
    enum: ["pending", "contacted", "resolved"],
    default: "pending",
  },
  reporterName: { type: String, default: null },
  reporterContact: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
});

export const Report = mongoose.model("Report", ReportSchema);
