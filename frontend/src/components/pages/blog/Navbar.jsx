import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='navbar'>
            <NavLink to='/blogs'><h1>The Blog</h1></NavLink>
            <div className="links">
                <NavLink to="/blogs">Home</NavLink>
                <NavLink to="blogs/create" style={{
                    color:'white',
                    backgroundColor:'#f2356d',
                    borderRadius:'8px'
                }}>New Blog</NavLink>
            </div>
        </div>
    )
}

export default Navbar