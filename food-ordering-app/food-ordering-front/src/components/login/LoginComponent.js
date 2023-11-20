import React, {useState} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import Swal from 'sweetalert2'
import LoginService from '../../services/LoginService'
import styles from './LoginComponent.css'
import jwt_decode from 'jwt-decode';


const LoginComponent = () => {

const [username, setUsername] = useState('')
const [password, setPassword] = useState('')

const navigate = useNavigate();

var responseFromServer;

const submitLogin = (e) =>{
    e.preventDefault();
    if(username.trim() === '' || password.trim() === ''){
        alertInvalid("Invalid input, make sure everything is filed correctly and try again!");
      }
    else{
      const loginParams = {username, password}
      LoginService.login(loginParams).then((response) =>{
        responseFromServer = response.data.message.toString();
        if(responseFromServer === "success"){
            alertSuccess("Successfully signed in!");
            localStorage.token = response.data.token;
            const decodedToken = jwt_decode(response.data.token);
            localStorage.role = decodedToken.role; //stavlja se role u localstorage nakon sto se dekodira pomocu jwt-decode  
            setTimeout(() => navigateDependingOnRole(localStorage.role), 1500);
        }
        else if(responseFromServer === "fail"){
            alertInvalid("Invalid username or password!");
        }
        else if(responseFromServer === "deactivatedUser"){
            alertInvalid("Can't log in! User deactivated!");
        }
      });
    }
    
}

const navigateDependingOnRole = (role) =>{
  if(role === "ADMIN"){
    navigate('/meals')
  }
  else if(role === "USER"){
    navigate('/menu')
  }
  else if(role === "EMPLOYEE"){
    navigate('/active-final-orders')
  }
}

const alertSuccess = (message) =>{
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500
    });
  }

  const alertInvalid = (message) =>{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    })
  }
//card col-md-6 offset-md-3 offset-md-3' za formu siroko da je, 4 4 4 da je uze i centrirano lepo, ali po vertikali nzm kako da namestim
  return (
    <div className='login-main-container'>
     
        <div id='loginContainerId' className='loginContainer'>
         
            {/* <div className='card col-md-4 offset-md-4 offset-md-4'> */}
            
                <div className='title-login'>
                <svg className="icon-log-login" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/></svg>
                  Sign in</div>
                <div className='card-body login'>
                  <form>
                    <div className='form-group mb-2'>
                      <label className='form-label'>Username: </label>
                      <input  
                          type="text"
                          placeholder="Insert username" 
                          name = "username" 
                          className="form-control login-input" 
                          value={username}
                          onChange = {(e) => setUsername(e.target.value)}
                          > 
                      </input>
                    </div>
                    <div className='form-group mb-2'>
                      <label className='form-label'>Password: </label>
                      <input  
                          type="password"
                          placeholder="Insert password" 
                          name = "password" 
                          className="form-control login-input" 
                          value={password}
                          onChange = {(e) => setPassword(e.target.value)}
                          >  
                      </input>
                    </div>
                  
                    <button className='login-submit-btn' onClick={(e) => submitLogin(e)}>Submit</button>
                    {/* <Link id="registrationBtn" to="/registration" className='btn btn-danger mt-2' style={{marginLeft:"10px"}}>Register</Link>  */}
                  <div className='registration-div'>
                    <div className='registration-label'>Don't have an account?&nbsp;</div>
                    <Link className='registration-link' to='/registration'>Sign up</Link>
                  </div>
                  
                  </form>
                </div>
        </div>
        
    </div>
  )
}

export default LoginComponent