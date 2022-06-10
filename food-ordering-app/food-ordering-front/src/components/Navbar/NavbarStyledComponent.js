import React from 'react'
import { Nav, NavLink, Bars,NavMenu,NavBtn,NavBtnLink } from './NavbarElements'
import styles from './NavbarElements.css'

const NavbarStyledComponent = () => {

     /**/ 
  return (
    
        <Nav className='header'>
            <NavLink to="/">
              {/* <h1 className='logo'>Logo</h1> */}
              <img className='logo' src={require('../../images/logo.png')} alt=''/>  
            </NavLink>
           <Bars/>
           <NavMenu>
               <NavLink id='employeeLink' to='/employees' >
                    Employees
               </NavLink>
               <NavLink to='/employees' >
                    Users
               </NavLink>
               <NavLink to='/employees' >
                    Menu
               </NavLink>
               <NavLink to='/signin' >
                    Order history
               </NavLink>
           </NavMenu>
           <NavBtn>
                <NavLink className='registrationLink' to='/signin' >
                 

                Registration
                    <div className='registrationLine'></div>
                  
                    
               </NavLink>

               <NavBtnLink className='btn btn-success' to='signin'>Sign in</NavBtnLink>
           </NavBtn>
        </Nav>
       
    
  )
}

export default NavbarStyledComponent