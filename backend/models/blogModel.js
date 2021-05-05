import mongoose from 'mongoose';

//Mongoose/Model Config
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true
    },
    date: {type: Date, default: Date.now, required:true},
});
const Blog = mongoose.model("Blog", blogSchema);

export default Blog