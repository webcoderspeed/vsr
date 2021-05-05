import express from 'express';
const router = express.Router();
import Blog from '../models/blogModel.js';
import multer from 'multer'
import { v4 as uuidV4 } from 'uuid'

// Handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidV4()}` + file.originalname);
  }
});
const pathName = 'http://localhost:5000/'
const imageMimeTypes = [
  'image/jpg',
  'image/jpeg',
  'image/gif',
  'image/png',
  'image/webp'
]
const fileFilter = (req, file, cb) => {
  cb(null, imageMimeTypes.includes(file.mimetype))
}
const upload = multer({storage, fileFilter})

// Handle GET Request
router.get('/', (req, res, next) => {
  Blog.find().sort({date: 'descending'})
  .exec()
  .then(docs => {
    const response = {
      count: docs.length,
      blogs: docs.map(blog => {
        return {
            title: blog.title,
            image:blog.image,
            description: blog.description,
            author: blog.author,
            date: blog.date.toISOString().split('T')[1],
            id:blog._id,
            request: {
              type:'GET',
              description:'Fetch the individual Blog',
              url: `/blogs/${blog._id}`
          }
        }
      })
    }
    res.status(200).json(response);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error:err
    });
  });
});


// Fetching Indiviual Item
router.get('/:blogId', (req, res, next) => {
  const id = req.params.blogId;
  Blog.findById(id)
  .exec()
  .then(doc => {
    doc ? (
      res.status(200).json({
        blog: doc,
        request: {
          type: 'GET',
          description:'fetch all blogs',
          url: `/blogs`
        }
      })
    ) : (
      res
      .status(404)
      .json({
        message: 'No valid entry found for the provided blog!'
      })
    )
  })
  .catch(err => {
    console.log(err);
    res
    .status(500)
    .json({
      error:err,
    });
  });
});


// Handling POST Request
router.post('/', upload.single('image'),(req, res, next) => {
  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    image:pathName + req.file.path,
    description: req.body.description,
  })
  blog.save()
  .then(result => {
    res.status(201).json({
      message:'Created Blog Successfully!',
      createdProduct: {
            title: result.title,
            image:result.image,
            description: result.description,
            author: result.author,
            date: result.date,
            request: {
              type:'GET',
              description:'Fetch the individual Blog',
              url: `/blogs/${blog._id}`
            }
      }
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});



// Handling DELETE Request
router.delete('/:blogId', (req, res, next) => {
  const id = req.params.blogId;
  Blog.remove({_id: id})
  .exec()
  .then(result => {
    res.status(200).json({
      message: 'Product deleted!',
      request: {
        type: 'POST',
        description:'To add a new blog',
        url:'/blogs/create',
        body: {
          title: 'String',
          author: 'String',
          description: 'String',
          image: 'images/png || images/jpeg'
        }
      }
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});




export default router