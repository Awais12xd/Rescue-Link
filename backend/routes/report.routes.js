import express from "express"
import { createReport, getReports } from "../controllers/report.controller.js";
import { upload } from "../utils/multer.js";

const router = express.Router();

router.post("/create-report",upload.array("images") ,createReport);
router.get("/get-all-reports", getReports);


// router.stack.forEach((layer) => {
//   if (layer.route) {
//     const path = layer.route.path;
//     const method = Object.keys(layer.route.methods)[0].toUpperCase();
//     console.log(`[AUTH ROUTES] ${method} ${path}`);
//   }
// });

export default router;
