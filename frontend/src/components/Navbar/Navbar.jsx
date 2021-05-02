import React, {useState} from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import {IconContext} from 'react-icons/lib'
import {Button} from '../../globalStyles'
import { connect } from 'react-redux';
import { signOut as SignOut } from '../../store/actions/authActions';

import { 
    Nav, 
    NavbarContainer, 
    NavLogo, 
    NavIcon, 
    MobileMenu,
    NavMenu,
    NavItem,
    NavLinks,
    NavItemBtn,
    NavBtnLink
} from './Navbar.Elements'

const Navbar = ({auth, signOut}) => {

    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    return (
        <>
        <IconContext.Provider value={{color:'#fff'}}>
            <Nav>
               <NavbarContainer>
                    <NavLogo to ='/'>
                        <NavIcon />
                        Virtual Study Resource
                    </NavLogo>
                    <MobileMenu onClick ={handleClick}>
                        {click ? <FaTimes /> : <FaBars />}
                    </MobileMenu>
                    <NavMenu onClick={handleClick} click={click}>
                        <NavItem>
                            <NavLinks to='/'>
                                Home
                            </NavLinks>
                        </NavItem>                    
                       <NavItem>
                            <NavLinks to='/courses'>
                                Courses
                            </NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to='/meetings'>
                                Meetings
                            </NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to='/library'>
                                Library
                            </NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to='/pricing'>
                                Pricing
                            </NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to='/blog'>
                                Blog
                            </NavLinks>
                        </NavItem>
                        <NavItemBtn>
                        {
                            (auth.uid) ? (
                                 <NavBtnLink to='/'>
                        <Button onClick={signOut} primary>Logout</Button>
                        </NavBtnLink> )
                            : 
                        <NavBtnLink to='/sign-up'>
                        <Button primary>Sign Up</Button>
                        </NavBtnLink>     
                        }    
                        </NavItemBtn>
                    </NavMenu>
                </NavbarContainer>
            </Nav>
            </IconContext.Provider>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile:state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(SignOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)