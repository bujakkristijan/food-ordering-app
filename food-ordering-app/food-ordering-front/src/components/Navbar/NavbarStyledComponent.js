import React from 'react'
import { Nav, NavLink, Bars,NavMenu,NavBtn,NavBtnLink } from './NavbarElements'

const NavbarStyledComponent = () => {
  return (
    
        <Nav>
            <NavLink to="/">
              <h1>Logo</h1>
            </NavLink>
           <Bars/>
           <NavMenu>
               <NavLink to='/employees' activeStyle>
                    Employees
               </NavLink>
               <NavLink to='/employees' activeStyle>
                    Users
               </NavLink>
               <NavLink to='/employees' activeStyle>
                    Menu
               </NavLink>
               <NavLink to='/signin' activeStyle>
                    Order history
               </NavLink>
           </NavMenu>
           <NavBtn>
               <NavBtnLink className='btn btn-success' to='signin'>Sign in</NavBtnLink>
           </NavBtn>
        </Nav>
       
    
  )
}

export default NavbarStyledComponent