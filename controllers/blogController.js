import Blog from "../models/BlogSchema.js" // Import the Blog model

// Create a new blog post
const createBlog = async (req, res) => {
  try {
    const { title, content, author, tags } = req.body;
    const blog = new Blog({
      title,
      content,
      author,
      tags,
    });

    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ error: "Failed to create a blog post" });
  }
};

// Get a list of all blog posts
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "name email"); // Populate author field with user details
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blog posts" });
  }
};

// Get a single blog post by ID
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "name email"
    ); // Populate author field with user details
    if (!blog) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the blog post" });
  }
};

// Update a blog post by ID
const updateBlogById = async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("author", "name email"); // Populate author field with user details

    if (!updatedBlog) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the blog post" });
  }
};

// Delete a blog post by ID
const deleteBlogById = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndRemove(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.json(deletedBlog);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the blog post" });
  }
};

export { createBlog, getAllBlogs, getBlogById, updateBlogById, deleteBlogById };
