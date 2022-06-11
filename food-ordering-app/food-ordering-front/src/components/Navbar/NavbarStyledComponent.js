import React from 'react'
/*import { Nav, NavLink, Bars,NavMenu,NavBtn,NavBtnLink } from './NavbarElements' */
import styles from './NavbarElements.css' // OVO MORA DA BI UCITAO CSS, IAKO SE STYLES NE KORISTI NIGDE DIREKTNO !!!!
import { Link } from 'react-router-dom'

const NavbarStyledComponent = () => {

     /*Link je brzi dosta od a elementa*/ 
  return (
    
        <div className='header'>
            <Link to="/employees">
              {/* <h1 className='logo'>Logo</h1> */}
              <img className='logo' src={require('../../images/logo.png')} alt=''/>  
            </Link>
           <div/>
           <div className='navMenu'>
               <Link className='navLink' id='employeeLink' to='/employees' >
                    Employees
               </Link>
               <Link className='navLink' to='/employees' >
                    Users
               </Link>
               <Link className='navLink' to='/employees' >
                    Menu
               </Link>
               <Link className='navLink' to='/signin' >
                    Order history
               </Link>
           </div>
           <div className='navBtn'>
                <Link className='registrationLink' to='/registration' >
                 

                Registration
                    <div className='registrationLine'></div>
                  
                    
               </Link>

               <Link id='signInBtn' className='btn btn-success' to='login'>Sign in</Link>
           </div>
        </div>
       
    
  )
}

export default NavbarStyledComponent