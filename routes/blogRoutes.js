import express from "express";
import { getDB } from "../config/db.js";

const router = express.Router();

// POST → Add new blog post
router.post("/", async (req, res) => {
  const { title, body, image } = req.body;

  if (!title || !body || !image) {
    return res.status(400).send({ error: "Title, body, and image are required." });
  }

  try {
    const db = getDB();
    const blogCollection = db.collection("blogs");

    const newBlog = {
      title,
      body,
      image,
      createdAt: new Date(),
    };

    await blogCollection.insertOne(newBlog);
    res.status(201).send({ message: "Blog post uploaded successfully", data: newBlog });
  } catch (error) {
    console.error("Error uploading blog:", error);
    res.status(500).send({ error: "Failed to upload blog post" });
  }
});

// GET → Fetch all blog posts
router.get("/", async (req, res) => {
  try {
    const db = getDB();
    const blogCollection = db.collection("blogs");

    const blogs = await blogCollection.find().sort({ createdAt: -1 }).toArray();

    res.status(200).send({
      message: "Blogs fetched successfully",
      count: blogs.length,
      data: blogs, 
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).send({ error: "Failed to fetch blogs" });
  }
});

export default router;
