import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import sendAndSaveRoutes from "./routes/sendAndSaveRoutes.js";


const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Register routes
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
