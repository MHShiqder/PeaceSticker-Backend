import express from "express";
import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "../config/env.js";


const router = express.Router();
const stripe = new Stripe(STRIPE_SECRET_KEY);

router.post("/", async (req, res) => {
  

  try {
    const {price}=req.body;

    const amount = Math.round(Number(price) * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).send({ error: error.message });
  }
});

export default router;
