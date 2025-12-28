import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import testRoute from "./routes/test.routes.js"
import reportRoutes from "./routes/report.routes.js"
import adoptRoutes from "./routes/adopt.routes.js"
import { errorMiddle } from "./middlewares/error.middleware.js";


// Get absolute path
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const uploadsPath = path.join(__dirname, 'uploads');


const app = express();
//.env config
if(process.env.NODE_ENV !== "PRODUCTION"){
  dotenv.config({
    path:"./.env",
})
}


//cors config
const corsOptions = {
  origin: [ "https://rescue-link-umber.vercel.app", "http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

//Middlewears
app.use(cors(corsOptions));
// app.use(cookieParser());
app.use(express.json());
// app.use(express.urlencoded({extended:true}));
// app.use("/" , express.static("uploads"))
// ✅ Serve uploads with absolute path
// app.use("/", express.static(uploadsPath));


//Routes
app.use("/api", testRoute);
app.use("/api/report", reportRoutes);
app.use("/api/adopt", adoptRoutes);




//error handling
app.use(errorMiddle);

export {app}