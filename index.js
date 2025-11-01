import express from "express";
import { connectDB } from "./config/db.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import sendAndSaveRoutes from "./routes/sendAndSaveRoutes.js";
// import cors from "cors";

const app = express();
const port = process.env.PORT || 5000;

// ✅ Fix CORS for all origins and methods
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // allow all origins
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200); 
  }
  next();
});

app.use(express.json());

// Routes
app.use("/create-payment-intent-peace", paymentRoutes);
app.use("/send-and-save", sendAndSaveRoutes);

app.get("/", (req, res) => {
  res.send("✅ Server running successfully!");
});

try {
  await connectDB();
  app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
} catch (err) {
  console.error("❌ Database connection failed:", err);
}
