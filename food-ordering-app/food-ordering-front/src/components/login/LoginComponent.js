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
            
                <h2 className='text-center'>Sign in</h2>
                <div className='card-body'>
                  <form>
                    <div className='form-group mb-2'>
                      <label className='form-label'>Username: </label>
                      <input  
                          type="text"
                          placeholder="Insert username" 
                          name = "username" 
                          className="form-control" 
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
                          className="form-control" 
                          value={password}
                          onChange = {(e) => setPassword(e.target.value)}
                          >  
                      </input>
                    </div>
                  <div className='buttons-container'>
                    <button id='submitBtn'className='btn btn-success mt-2' onClick={(e) => submitLogin(e)}>Log in</button>
                    <Link to="/registration" className='btn btn-danger mt-2' style={{marginLeft:"10px"}}>Register</Link> 
                  </div>
                  
                  </form>
                </div>
        </div>
        
    </div>
  )
}

export default LoginComponent