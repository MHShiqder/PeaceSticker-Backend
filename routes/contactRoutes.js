import express from "express";
import sendMessage from "../components/sendMessage.js";

const router = express.Router();



router.post("/", async (req, res) => {
  try {
    const { email, message } = req.body;

    if (!email || !message) {
      return res.status(400).json({ error: "Email and message are required." });
    }

    await sendMessage(email, message);
    res.status(200).json({ success: true, message: "Message sent successfully." });

  } catch (error) {
    console.error("Error while sending message:", error);
    res.status(500).json({ 
      success: false, 
      error: "An error occurred while sending the message. Please try again later." 
    });
  }
});





export default router;