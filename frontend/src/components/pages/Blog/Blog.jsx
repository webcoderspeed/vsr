import React, { useEffect } from 'react'
import BlogList from './BlogList';
import useFetch from '../../customHooks/useFetch';
import Navbar from './Navbar'
import './Blog.css'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

const Blog = ({auth}) => {
    const { data: blogs, isPending, error } = useFetch('/blogs') ;

    useEffect(() => {

    }, [blogs])

    if (!auth.uid) {
     return <Redirect to = 'sign-in' /> 
    }   


    return (
        <>
        <Navbar />
        <div className='home'>
            {error && <div>{error.message}</div>}
            { isPending && <div>Loading Blogs...</div>}
            {blogs && <BlogList blogs={blogs.blogs} title='All Blogs' />}
        </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
}

export default connect(mapStateToProps)(Blog);
