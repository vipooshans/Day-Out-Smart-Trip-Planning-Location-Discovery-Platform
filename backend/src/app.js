import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/authRoutes.js";
import placeRoutes from "./routes/placeRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Day Out API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/places", placeRoutes);
app.use("/api/trips", tripRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
