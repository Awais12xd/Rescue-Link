import express from "express"

const router = express.Router();

router.get("/test"  , (req,res) => {
    console.log("req is comming")
    res.json({
        "Status" : "Test is done"
    })
});


// router.stack.forEach((layer) => {
//   if (layer.route) {
//     const path = layer.route.path;
//     const method = Object.keys(layer.route.methods)[0].toUpperCase();
//     console.log(`[AUTH ROUTES] ${method} ${path}`);
//   }
// });

export default router;
