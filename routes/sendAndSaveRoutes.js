import express from "express";
import { getDB } from "../config/db.js"; 
import sendEmail from "../components/nodemailer.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const { price, formData } = req.body;
  const db = getDB();
  const contactCollection = db.collection("contacts");

  if (!price) {
    return res.status(400).send({ error: "Price is required" });
  }

  if (!formData || typeof formData !== "object") {
    return res.status(400).send({ error: "Invalid form data" });
  }

  const newContact = {
    ...formData,
    price,
    date: new Date(),
  };

  try {
    await contactCollection.insertOne(newContact);
  } catch {
    return res.status(500).send({ error: "database error" });
  }

  try {
    await sendEmail(newContact); 
  } catch (emailError) {
    console.error("Email sending failed:", emailError);
  }
res.send({message:"hasib"});

});




router.get("/", async (req, res) => {
  
res.send({message:"hasib"});

});



export default router;