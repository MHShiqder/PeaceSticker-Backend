import express from "express";
import { getDB } from "../config/db.js"; 
import sendEmail from "../components/nodemailer.js";
import { v4 as uuidv4 } from "uuid";
const router = express.Router();

const productMap = {
  9.95: { productId: "prod-1", quantity: 1, unitPrice: 9.95 },
  27.95: { productId: "prod-5", quantity: 5, unitPrice: +(27.95 / 5).toFixed(2) },
  49.95: { productId: "prod-10", quantity: 10, unitPrice: +(49.95 / 10).toFixed(2) },
};

router.post("/", async (req, res) => {
  const { price, formData } = req.body;
  const db = getDB();
  const contactCollection = db.collection("contacts");
  const newContact2 = {
    ...formData,
    price,
    date: new Date(),
  };

  if (!price || !productMap[price]) {
    return res.status(400).send({ error: "Invalid price" });
  }

  if (!formData || typeof formData !== "object") {
    return res.status(400).send({ error: "Invalid form data" });
  }

  const productDetails = productMap[price];

  // Construct the MongoDB document
  const newContact = {
    orderId: uuidv4(),
    orderDate: new Date(),
    customerId: uuidv4(),
    customerInfo: {
      firstName: formData.firstName || "",
      lastName: formData.lastName || "",
      email: formData.email || "",
      Address: {
        street: formData.address || "",
        city: formData.city || "",
        state: formData.state || "",
        zipCode: formData.zip || "",
        country: formData.country || ""
      }
    },
    items: [
      {
        productId: productDetails.productId,
        productName: "daretodeclare kit",
        quantity: productDetails.quantity,
        unitPrice: productDetails.unitPrice,
        totalItemPrice: price
      }
    ]
  };

  try {
    await contactCollection.insertOne(newContact);
  } catch {
    return res.status(500).send({ error: "Database error" });
  }

  try {
    await sendEmail(newContact2); 
  } catch (emailError) {
    console.error("Email sending failed:", emailError);
  }

  res.send({ message: "success" });
});




router.get("/", async (req, res) => {
  
  try {
    const db = getDB();
    const contactCollection = db.collection("contacts");

    // Fetch all documents in the collection
    const contacts = await contactCollection.find().sort({ date: -1 }).toArray();

    res.status(200).send({
      message: "Data fetched successfully",
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).send({ error: "Failed to fetch data" });
  }

});



export default router;