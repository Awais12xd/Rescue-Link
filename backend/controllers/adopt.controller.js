// controllers/adoptController.js
import fs from "fs";
import path from "path";
import { validationResult } from "express-validator";
import adoptListingModel from "../models/adoptListing.model.js";
import { uploadMultipleToCloudinary } from "../utils/cloudinaryUpload.js";
import { errorHandler } from "../utils/errorHandler.js";

const UPLOAD_RELATIVE_DIR = "/uploads/adopt/"; // served statically by express: app.use('/uploads', express.static(...))

/**
 * Create a new adopt listing
 * Accepts multipart/form-data with fields:
 *  - animalType (required), ageApprox, gender, description, locationText,
 *    contactName (required), contactPhone (required), contactEmail (optional)
 *  - images: uploaded files (multiple)
 */
export const createListing = async (req, res , next) => {
  try {
    // express-validator errors (if used at route)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      animalType,
      ageApprox,
      gender = "Unknown",
      description,
      locationText,
      contactName,
      contactPhone,
    } = req.body;

     const files = req.files;
    console.log(files)
    if (!files || files.length === 0) {
      return next(new errorHandler("Please upload at least one image", 400));
    };

    // ✅ Upload multiple images to Cloudinary
    const cloudinaryResults = await uploadMultipleToCloudinary(files);
    const images = cloudinaryResults.map(result => ({
      public_id: result.public_id,
      url:  result.url,
    }));

    const listing = new adoptListingModel({
      animalType,
      ageApprox: ageApprox || null,
      gender,
      description: description || null,
      locationText: locationText || null,
      contactName,
      contactPhone,
      images,
      status: "available"
    });

    await listing.save();
    return res.status(201).json({ data: listing });
  } catch (err) {
    console.error("createListing error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * Get listings (paginated, filterable)
 * Query params:
 *  - page, limit
 *  - q (text search)
 *  - status (available/adopted)
 */
export const getListings = async (req, res , next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
        const skip = (Math.max(1, page) - 1) * limit;
    
        const adopts = await adoptListingModel.find()
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(parseInt(limit, 10));
    
        const total = await adoptListingModel.countDocuments();
    
        return res.json({ data: adopts, meta: { total } });

  } catch (err) {
    console.error("getListings error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * Get listing by id
 */
export const getListingById = async (req, res) => {
  try {
    const id = req.params.id;
    const listing = await AdoptListing.findById(id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    return res.json({ data: listing });
  } catch (err) {
    console.error("getListingById error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * Update listing (partial). Example usage: update status to 'adopted'
 * Body: { status: 'adopted' }
 */
export const updateListing = async (req, res) => {
  try {
    const id = req.params.id;
    const payload = req.body;
    const allowed = ["status", "description", "locationText", "contactName", "contactPhone", "contactEmail", "ageApprox", "gender"];
    const update = {};
    for (const k of allowed) {
      if (payload[k] !== undefined) update[k] = payload[k];
    }
    update.updatedAt = Date.now();

    const updated = await AdoptListing.findByIdAndUpdate(id, update, { new: true });
    if (!updated) return res.status(404).json({ message: "Listing not found" });
    return res.json({ data: updated });
  } catch (err) {
    console.error("updateListing error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * Delete listing and associated files (local storage)
 */
export const deleteListing = async (req, res) => {
  try {
    const id = req.params.id;
    const listing = await AdoptListing.findById(id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    // Remove files from local disk (optional)
    if (Array.isArray(listing.images) && listing.images.length) {
      listing.images.forEach((imgPath) => {
        try {
          // imgPath expected like "/uploads/adopt/<file>"
          const abs = path.join(process.cwd(), imgPath);
          if (fs.existsSync(abs)) fs.unlinkSync(abs);
        } catch (err) {
          console.warn("failed to remove file", imgPath, err.message);
        }
      });
    }

    await listing.remove();
    return res.json({ message: "Listing removed" });
  } catch (err) {
    console.error("deleteListing error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
