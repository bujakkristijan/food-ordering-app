import React, {useSelector} from 'react-redux';
import './NavbarElements.css';
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import LoginService from '../../services/LoginService';
import Swal from 'sweetalert2'
import { Button } from 'bootstrap';
import { useDispatch } from 'react-redux';
import {deleteAllItems} from '../../store-redux/cart/cartSlice'

const NavbarStyledComponent = () => {
     console.log("check")
     const navigate = useNavigate();
     const dispatch = useDispatch();
     const cart = useSelector((state) => state.cart);
     let sumQuantityFromCartItems = 0;
     if(cart.length>0){
          for(let i = 0; i<cart.length; i++){
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
        }

        const checkRole = () =>{
          if(localStorage.role === "ADMIN"){
               return (<Link className='navLink' to='/users' >
               Users
          </Link>)
          }
        }
  return (
        <div className='header'>
               <Link to="/menu">
                    <img className='logo' src={require('../../images/logo2.png')} alt=''/>  
               </Link>
               <div className='navMenu'>
                    {localStorage.role==="ADMIN" && <Link className='navLink' id='employeeLink' to='/employees' >
                    Employees
               </Link>}
               
                {
                checkRole()
                }
              
               {localStorage.role!="ADMIN" && localStorage.role!="EMPLOYEE" && <Link className='navLink' to='/menu' >
                    Menu
               </Link>}
               {(localStorage.role==="ADMIN" || localStorage.role ==="EMPLOYEE") && <Link className='navLink' to='/order-history' >
                    Order history
               </Link>}
               {localStorage.role==="ADMIN" && <Link className='navLink' to='/meals' >
                    Meals
               </Link>}
               {localStorage.role==="ADMIN" && <Link className='navLink' to='/meal-types' >
                    Meal types
               </Link>}
               {localStorage.role==="EMPLOYEE" && <Link className='navLink' to='/active-final-orders' >
                    Active orders
               </Link>}
           </div>
           <div className='navBtn'>
           {localStorage.role!="ADMIN" && localStorage.role!="EMPLOYEE" && <Link className='cartLink' to='/cart' >
               <div className='number-cart'>{sumQuantityFromCartItems}</div>
               <img className='logo-cart' src={require('../../images/cart2.png')} alt=''/>         
          </Link>}
           {localStorage.role==="USER" && <Link className='myProfileLink' to='/my-profile' >  
                 My Profile      
          </Link>}
               {localStorage.role==="USER" && <Link className='myProfileLink' to='/my-active-final-orders' >
                    My active orders                   
               </Link>}
               {localStorage.role==="USER" && <Link className='myProfileLink' to='/my-delivered-final-orders' >                  
                    My order history                   
               </Link>}
                <Link className='registrationLink' to='/registration' >          
                    Registration          
               </Link>
               {localStorage.token == null && <Link id='signInBtn' className='btn btn-success' to='login'>
                    Sign in
               </Link>}
               {localStorage.token != null && <button id='signOutBtn' className='btn btn-success' onClick={() => logout() }>
                    Sign out
               </button>}
           </div>
        </div>
  )
}

export default NavbarStyledComponent