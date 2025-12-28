import express from "express"
import { upload } from "../utils/multer.js";
import { createListing, getListings } from "../controllers/adopt.controller.js";

const router = express.Router();

router.post("/create-listing",upload.array("images") ,createListing);
router.get("/get-all-listings", getListings);


// router.stack.forEach((layer) => {
//   if (layer.route) {
//     const path = layer.route.path;
//     const method = Object.keys(layer.route.methods)[0].toUpperCase();
//     console.log(`[AUTH ROUTES] ${method} ${path}`);
//   }
// });

export default router;
