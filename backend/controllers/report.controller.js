import { validationResult } from "express-validator";
import { Report } from "../models/report.model.js";
import { uploadMultipleToCloudinary } from "../utils/cloudinaryUpload.js";
import { errorHandler } from "../utils/errorHandler.js";

export const createReport = async (req, res , next) => {
  // Input validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { animalType, description, locationText, reporterName, reporterContact } = req.body;

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


    const report = new Report({
      animalType,
      description,
      locationText,
      images,
      reporterName: reporterName || null,
      reporterContact: reporterContact || null
    });

    await report.save();
    return res.status(201).json(report);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getReports = async (req, res) => {
  try {
    // Basic filtering / pagination (optional)
    const { page = 1, limit = 20 } = req.query;
    const skip = (Math.max(1, page) - 1) * limit;

    const reports = await Report.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit, 10));

    const total = await Report.countDocuments();

    return res.json({ data: reports, meta: { total } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
