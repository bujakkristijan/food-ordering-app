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
    const loginParams = {username, password}
    LoginService.login(loginParams).then((response) =>{
        responseFromServer = response.data.messageInvalidUsernameOrPassword.toString();
        if(responseFromServer == "no"){
            alertSuccess();
            localStorage.token = response.data.token;
            const decodedToken = jwt_decode(response.data.token);
            localStorage.role = decodedToken.role; //stavlja se role u localstorage nakon sto se dekodira pomocu jwt-decode  
            navigateDependingOnRole(localStorage.role);
        }
        else if(responseFromServer == "yes"){
            console.log(responseFromServer);
            alertInvalid(responseFromServer)
        }
        else if(responseFromServer =="deactivatedUser"){
            alertInvalid(responseFromServer);
        }
    })
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

const alertSuccess = () =>{
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Successfully signed in!',
      showConfirmButton: false,
      timer: 1500
    });
  }

  const alertInvalid = (invalidText) =>{
    if(invalidText == "yes"){
      var titleContent = "Invalid username or password!";
    }
    else if(invalidText == "deactivatedUser"){
      var titleContent = "Can't log in! User deactivated!";
    }
    
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: titleContent,
    })
  }
//card col-md-6 offset-md-3 offset-md-3' za formu siroko da je, 4 4 4 da je uze i centrirano lepo, ali po vertikali nzm kako da namestim
  return (
    <div>
      <br/> 
        <div id='loginContainerId' className='loginContainer'>
          <div className='row'>
            <div className='card col-md-4 offset-md-4 offset-md-4'>
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
                <button id='submitBtn'className='btn btn-success' onClick={(e) => submitLogin(e)}>Log in</button>
                <Link to="/registration" className='btn btn-danger' style={{marginLeft:"5px"}}>Register</Link> 
                </form>
              </div>
            </div>
          </div>
        </div>
        
    </div>
  )
}

export default LoginComponent