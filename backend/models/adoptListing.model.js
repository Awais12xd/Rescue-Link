// models/AdoptListing.js
import mongoose from "mongoose";

const AdoptListingSchema = new mongoose.Schema({
  animalType: { type: String, required: true, trim: true },
  ageApprox: { type: String, default: null, trim: true },
  gender: { type: String, enum: ["Unknown", "Male", "Female"], default: "Unknown" },
  description: { type: String, default: null, trim: true },
  locationText: { type: String, default: null, trim: true },
  contactName: { type: String, default: null, trim: true },
  contactPhone: { type: String, default: null, trim: true },
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
  status: { type: String, enum: ["available", "adopted", "removed"], default: "available" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// index for fast listing & text search on description/location (optional)
AdoptListingSchema.index({ description: "text", locationText: "text", animalType: "text" });


export default mongoose.model("AdoptListing", AdoptListingSchema);

