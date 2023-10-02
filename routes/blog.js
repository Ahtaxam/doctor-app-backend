import express, { Router } from "express"
import { uploadBlog,getBlogs, getBlogById } from "../controllers/blogContainer.js";

const router = express.Router();

router.post('/', uploadBlog);
router.get('/', getBlogs);
router.get('/:id', getBlogById)

export default router