const Blog = require('../models/blog')

exports.addBlog = async (req, res) => {
  try {
    console.log(req.body.id)
    let blog = false
    if(req.body.id){
        blog = await Blog.findOne({ where : { id: req.body.id} });
    }
    if (blog) {
      const response = await blog.update({title : req.body.title, content : req.body.content});
      if (response) {
        return res.status(200).json({
          message: "Blog updated successfully",
        });
      }
    } else {
        console.log("inside else")
      const response = await Blog.create({title : req.body.title, content : req.body.content, email : req.body.email});

      if (response) {
        return res.status(201).json({
          message: "Blog created successfully",
        });
      } else {
        return res.status(500).json({
          message: "Failed to create blog",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error occured",
      error: error,
    });
  }
};

exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({ where : {id: req.params.id} });
    if (blog) {
      return res.status(200).send(blog);
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error occured",
      error: error,
    });
  }
};

exports.getUserBlog = async (req, res) => {
  try {
    const blog = await Blog.findAll({ where : {email: req.params.email} });
    if (blog) {
      return res.status(200).json({
        message: "Success",
        blogs: blog,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error occured",
      error: error,
    });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blog = await Blog.findAll()
    if (blog) {
      return res.status(200).json({
        message: "Blog found",
        blog: blog,
      });
    } else {
      return res.status(400).json({
        message: "No Blogs found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error occured",
      error: error,
    });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const resp = await Blog.destroy({ where : {id: req.body.blogId} });
    if (resp) {
      return res.status(200).json({
        message: "Blog deleted successfully",
      });
    } else {
      return res.status(400).json({
        message: "Blog Not Found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error occured",
      error: error,
    });
  }
};
