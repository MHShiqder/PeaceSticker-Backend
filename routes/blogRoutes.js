import express from "express";
import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";

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

 
router.delete("/delete-all", async (req, res) => {
  try {
    const db = getDB();
    const blogCollection = db.collection("blogs");

    await blogCollection.deleteMany({});

    res.status(200).send({ message: "All blog posts have been deleted successfully" });
  } catch (error) {
    console.error("Error deleting blogs:", error);
    res.status(500).send({ error: "Failed to delete blog posts" });
  }
});


router.delete("/delete", async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).send({ error: "Title is required in query" });
  }

  try {
    const db = getDB();
    const blogCollection = db.collection("blogs");
// console.log(id,"id") 
     // Convert string id → ObjectId
    const objectId = new ObjectId(id);

    const result = await blogCollection.deleteOne({ _id: objectId });

    if (result.deletedCount === 0) {
      return res.status(404).send({ message: "No blog found with this title" });
    }

    res.status(200).send({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).send({ error: "Failed to delete blog" });
  }
});


export default router;
