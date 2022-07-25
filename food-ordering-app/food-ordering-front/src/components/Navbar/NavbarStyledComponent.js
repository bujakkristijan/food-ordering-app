import React, {useSelector} from 'react-redux';
/*import { Nav, NavLink, Bars,NavMenu,NavBtn,NavBtnLink } from './NavbarElements' */
import styles from './NavbarElements.css' // OVO MORA DA BI UCITAO CSS, IAKO SE STYLES NE KORISTI NIGDE DIREKTNO !!!!
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import LoginService from '../../services/LoginService';
import Swal from 'sweetalert2'
import { Button } from 'bootstrap';
import { useDispatch } from 'react-redux';
import {deleteAllItems} from '../../store-redux/cart/cartSlice'

const NavbarStyledComponent = () => {

     const navigate = useNavigate();
     const dispatch = useDispatch();


     const cart = useSelector((state) => state.cart);

     let sumQuantityFromCartItems = 0;
     if(cart.length>0){
          for(let i = 0; i<cart.length; i++){
               console.log("USAOOOO OPET OVDEEEEE");
               sumQuantityFromCartItems += cart[i].quantity;
         }
     }


     const logout = () =>{
          LoginService.logout().then((response) =>{
               const responseFromServer = response.data;
               if(responseFromServer === "valid"){
                    clearLocalStorage();
                    alertSuccess();
                    navigate("/menu");
                    dispatch(deleteAllItems());
               }
               else{
                    alert("failed to logout");
               }
          })
     }

     const clearLocalStorage = () =>{
          localStorage.clear();
     }

     const alertSuccess = () =>{
  
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Successfully signed out!',
            showConfirmButton: false,
            timer: 1500
          });
      
          /* TEST */
      
       
        }
     // const sumQuantityFromCartItems = cart.reduce((prev,curr)=>prev+=curr,0);

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
               <Link className='navLink' to='/menu' >
                    Menu
               </Link>
               <Link className='navLink' to='/signin' >
                    Order history
               </Link>
               <Link className='navLink' to='/meals' >
                    Meals
               </Link>
               <Link className='navLink' to='/meal-types' >
                    Meal types
               </Link>
           </div>
           <div className='navBtn'>
           <Link className='cartLink' to='/cart' >
                 
               <div className='number-cart'>{sumQuantityFromCartItems}</div>
               <img className='logo-cart' src={require('../../images/cart2.png')} alt=''/>  
                   
                     
          </Link>
           <Link className='myProfileLink' to='/my-profile' >
                 

                 MyProfile
                   
                     
          </Link>
                <Link className='registrationLink' to='/registration' >
                 

                Registration
                    <div className='registrationLine'></div>
                  
                    
               </Link>

               <Link id='signInBtn' className='btn btn-success' to='login'>
                    Sign in
               </Link>

               <button id='signOutBtn' className='btn btn-success' onClick={() => logout() }>
                    Sign out
               </button>

           </div>
        </div>
       
    
  )
}

export default NavbarStyledComponent