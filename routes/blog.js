// Import the Blog controller functions
import express from "express";
import {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlogById,
    deleteBlogById,
} from "../controllers/blogController.js";

const router = express.Router();

// Create a new blog post
router.post("/createBlog", createBlog);

// Get a list of all blog posts
router.get("/getAllBlogs", getAllBlogs);

// Get a single blog post by ID
router.get("/getBlogById/:id", getBlogById);

// Update a blog post by ID
router.put("/updateBlogById/:id", updateBlogById);

// Delete a blog post by ID
router.delete("/deleteBlogById/:id", deleteBlogById);

export default router;
