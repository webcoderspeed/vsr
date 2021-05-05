import React,{ useState } from 'react'
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

const CreateBlog = ({profile}) => {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [isPending, setIsPending] = useState(false)
    const history = useHistory()


      const author = profile.firstName + profile.lastName


    const handleSubmit = (e) => {
        e.preventDefault()
        setIsPending(true)

        const formData = new FormData();
            formData.append('title', title);
            formData.append('author', author);
            formData.append('image', image);
            formData.append('description', description);
        
        fetch('/blogs',{
            method:'POST',
            body: formData
        })
        .then(() => {
            console.log('New Blog Added!')
            setIsPending(false)
            history.push('/blogs')
        })

    }

    return (
        <div className='create'>
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title: </label>
                <input type="text" 
                required 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
                <input type="file" 
                required 
                onChange={(e) => setImage(e.target.files[0])}
                />
                <label>Blog body: </label>
                <textarea required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled>Adding Blog...</button>}
            </form>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        profile:state.firebase.profile
    }
}

export default connect(mapStateToProps)(CreateBlog)

