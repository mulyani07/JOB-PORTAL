import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import bodyParser from "body-parser";
import path from "path";

dotenv.config({});

connectDB();
const PORT  = process.env.PORT || 8080;
const app = express();

const _dirname = path.resolve();



app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:'job-portal-production-3aed.up.railway.app',
    credentials:true
}

app.use(cors(corsOptions));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get('*', (_,res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`);
})
