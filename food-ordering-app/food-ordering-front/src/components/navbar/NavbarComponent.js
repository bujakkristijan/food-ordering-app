import React, {useSelector} from 'react-redux';
import './NavbarComponent.css';
import { Link, useNavigate } from 'react-router-dom'
import LoginService from '../../services/LoginService';
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux';
import {deleteAllItems} from '../../store-redux/cart/cartSlice'

const NavbarComponent = () => {
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
                    setTimeout(()=>navigate("/menu"), 1500);
                    dispatch(deleteAllItems());
               }
               else{
                    clearLocalStorage();
                    alert("Server logout error!");
                    navigate("/menu");
               }
          }).catch(error =>{
               console.log(error);
               clearLocalStorage();
               alert("Some error occured!");
               navigate("/menu");
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

        const showMenu = () => {
          const navLinksButtonsContainer = document.querySelector(".nav-links-buttons-container");
          navLinksButtonsContainer.style.right = "0px";
          navLinksButtonsContainer.style.boxShadow = "0 0 0 10000px rgba(0, 0, 0, .50)";
        }
      
        const hideMenu = () => {
          const navLinksButtonsContainer = document.querySelector(".nav-links-buttons-container");
          navLinksButtonsContainer.style.right = "-280px";
          navLinksButtonsContainer.style.boxShadow = "0 0 0 0 rgba(0,0,0,0)";
        }


  return (
     <div className='header'>
          <Link to="/menu">
               <img className='logo' src={require('../../images/logo2.png')} alt=''/>  
          </Link>
          {localStorage.role!="ADMIN" && localStorage.role!="EMPLOYEE" && <Link className='navLinkMenu' to='/menu' >
               MENU
          </Link>}
          {localStorage.role!="ADMIN" && localStorage.role!="EMPLOYEE" && <Link className='cartLink' to='/cart' >
                    <div className='number-cart-div'>
                         <div className='number-cart'>{sumQuantityFromCartItems}</div>
                    </div>
                    <svg className='logo-cart' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
                    {/* <img className='logo-cart' src={require('../../images/cart2.png')} alt=''/>          */}
               </Link>}

          <div className='nav-links-buttons-container'>
               <svg class="x-icon" onClick={hideMenu} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg>
               {(localStorage.role ==="ADMIN" || localStorage.role ==="USER" || localStorage.role ==="EMPLOYEE") && <div className='navMenu'>
                    {/* <svg class="x-icon" onClick={hideMenu} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg> */}
                    {localStorage.role==="ADMIN" && <Link className='navLink' id='employeeLink' to='/employees' >
                    Employees
                    </Link>}
                    {
                    checkRole()
                    }
               
                    {(localStorage.role==="ADMIN" || localStorage.role ==="EMPLOYEE") && <Link className='navLink' to='/order-history' onClick={() => {
                                                                                if (window.innerWidth < 1200) {
                                                                                     hideMenu();
                                                                                }}} >
                         Order history
                    </Link>}
                    {localStorage.role==="ADMIN" && <Link className='navLink' to='/meals' >
                         Meals
                    </Link>}
                    {localStorage.role==="ADMIN" && <Link className='navLink' to='/meal-types' >
                         Meal types
                    </Link>}
                    {(localStorage.role==="EMPLOYEE" || localStorage.role==="ADMIN") && <Link className='navLink' to='/active-final-orders' onClick={() => {
                                                                                if (window.innerWidth < 1200) {
                                                                                     hideMenu();
                                                                                }}}>
                         Active orders
                    </Link>}
          
                    {localStorage.role==="USER" && <Link className='myProfileLink' onClick={() => {
                                                                                if (window.innerWidth < 1200) {
                                                                                     hideMenu();
                                                                                }}} to='/my-profile' >  
                         My Profile      
                    </Link>}
                    {localStorage.role==="USER" && <Link className='myProfileLink' onClick={() => {
                                                                                if (window.innerWidth < 1200) {
                                                                                     hideMenu();
                                                                                }}} to='/my-active-final-orders' >
                         My active orders                   
                    </Link>}
                    {localStorage.role==="USER" && <Link className='myProfileLink' onClick={() => {
                                                                                if (window.innerWidth < 1200) {
                                                                                     hideMenu();
                                                                                }}} to='/my-delivered-final-orders' >                  
                         My order history                   
                    </Link>}
                    </div>}

               <div className='navBtn'>
                    {localStorage.token == null && <Link className='registrationLink' to='/registration' onClick={() => {
                                                                                if (window.innerWidth < 1200) {
                                                                                     hideMenu();
                                                                                }}}> 
                         <svg className='icon-registration-nav' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>         
                         Sign up          
                    </Link>}
                    {localStorage.token == null && <Link id='signInBtn' className='btn-login-logout' onClick={() => {
                                                                                if (window.innerWidth < 1200) {
                                                                                     hideMenu();
                                                                                }}} to='login'>
                    <svg className="icon-log" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/></svg>
                         Sign in
                    </Link>}
                    {localStorage.token != null && <button id='signOutBtn' className='btn-login-logout' onClick={() => {
                                                                                logout();
                                                                                if (window.innerWidth < 1200) {
                                                                                     hideMenu();
                                                                                }}}>
                    <svg className="icon-log" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/></svg>
                         Sign out
                    </button>}
               </div>  
          </div>
          <svg class="bars-icon" onClick={showMenu} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
     </div>
  )
}

export default NavbarComponent