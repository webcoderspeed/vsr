import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import useFetch from '../../customHooks/useFetch';


const BlogDetails = () => {

    const { id } = useParams();
    const { data: blog, error, isPending } = useFetch('/blogs/' + id)


    const history = useHistory()

    const [isEditing, setIsEditing] = useState(false)


    // Handle Delete
    const handleDelete = () => {
        fetch('/blogs/'+ id,{
            method:'DELETE'
        })
        .then(() => {
            history.push('/blogs')
        })
    }

    // Handle Edit And Save
    let title =  document.querySelector('.blog-title')
    let body =  document.querySelector('.blog-body')


    const handleEdit = () => {
        title.contentEditable=true;
        body.contentEditable=true;
        setIsEditing(true)
    }

    const handleSave = () => {
        title.contentEditable=false;
        body.contentEditable=false;
        setIsEditing(false)
        
        const editedBlog = {...blog,title: title.textContent, body:body.textContent} 

        fetch('/blogs/'+ id,{
            method:'PUT',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify(editedBlog)
        })
        .then(() => {
            history.push('/blogs/'+blog.id)
        })
      
    }

    return (
        <div className='blog-details'>
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blog && (
                <article>
                    <h2 className='blog-title'>{blog.blog.title}</h2>
                    <img
                    style={{
                        height:'250px'
                    }}
                    src={blog.blog.image} alt={blog.blog.title} />
                    <div className='blog-body'>{blog.blog.description}</div>
                    <button onClick={handleDelete}>Delete Blog</button>
                    {!isEditing && <button
                    style={{
                        marginLeft:'25px'
                    }}
                    onClick={handleEdit}
                    >Edit Blog</button>}
                    {isEditing && <button onClick={handleSave}
                    style={{
                        marginLeft:'25px'
                    }}
                    >Save</button>}
                </article>
            )}
        </div>
    )
}

export default BlogDetails