import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  statusCode: 429,
  message: "Too Many Requests!",
});

app.use(limiter);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.use(
  express.json({
    limit: "25kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "15kb",
  })
);

app.use(express.static("public"));
app.use(cookieParser());

// import statement
import patientRouter from "./routes/patient.routes";
import servicesRouter from "./routes/services.routes";
import authenticateRouter from "./routes/authtication.routes";

// main routes
app.use("/api/v1/patient", patientRouter);
app.use("/api/v1/services", servicesRouter);
app.use("/api/v1/authenticate", authenticateRouter);

export default app;
