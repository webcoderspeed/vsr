import React from 'react'
import { Link } from 'react-router-dom'

const BlogList = ({blogs, title}) => {

    return (
        <div className='blog-list'>
            <h2>{!blogs && title}</h2>

            {blogs.map(blog => (
                <div className="blog-preview" key={blog.id}>
                 <Link to={`/blogs/${blog.id}`}>
                    <h2>{blog.title}</h2>
                    <p>Written by {blog.author || 'Speed'}</p>
                    <p>{blog.date}</p>
                 </Link>
                </div>
            ))}
        </div>
    )
}

export default BlogList


