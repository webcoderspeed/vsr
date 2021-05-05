import asyncHandler from 'express-async-handler'
import Blog from '../models/blogModel.js'
import multer from 'multer';

// Handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}` + file.originalname);
  }
});
const pathName = '/uploads'
const imageMimeTypes = [
  'image/jpg',
  'image/jpeg',
  'image/gif',
  'image/png'
]
const fileFilter = (req, file, cb) => {
  cb(null, imageMimeTypes.includes(file.mimetype))
}
const upload = multer({storage, fileFilter})


// @desc    Fetch all blogs
// @route   GET /api/blogs
// @access  Public

const getBlogs = asyncHandler(async (req, res) => {
   const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

    const blogs = await Blog.find({ ...keyword })

    res.json({ blogs })
})

// @desc    Fetch single blog
// @route   GET /api/blogs/:id
// @access  Public
const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  if (blog) {
    res.json(blog)
  } else {
    res.status(404)
    throw new Error('Blog not found')
  }
})

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
// @access  specfied user who owns blog
const deleteBlog = asyncHandler( async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  if (blog) {
    await blog.remove()
    res.json({ message: 'Blog removed' })
  } else {
    res.status(404)
    throw new Error('Blog not found')
  }
})

// @desc    Create a product
// @route   POST /api/products
// @access  public
const createBlog = asyncHandler(upload.single('blogImage'), async (req, res) => {
  const blog = new Blog({
    title: req.body.blog,
    author: req.body.author,
    blogImage:pathName + req.file.path,
    category: req.body.category,
    description: req.body.description,
  })

  const createdBlog = await blog.save()
  res.status(201).json(createdBlog)
})


// @desc    Update a blog
// @route   PUT /api/blogs/:id
// @access  Private/Admin
const updateBlog = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    blogImage,
    category,
  } = req.body

  const blog = await Blog.findById(req.params.id)

  if (blog) {
    blog.title = title
    blog.description = description
    blog.blogImage = blogImage
    blog.brand = brand
    blog.category = category

    const updatedBlog = await product.save()
    res.json(updatedBlog)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export {
  getBlogs,
  getBlogById,
  deleteBlog,
  createBlog,
  updateBlog,
}