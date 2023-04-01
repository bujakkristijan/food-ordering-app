import React, {useState} from 'react'
import Swal from 'sweetalert2'
import {Link, useNavigate, useParams} from 'react-router-dom'
import UserService from '../../services/UserService'
import styles from './RegistrationComponent.css' // da se importuje css, bez ovog ne radi 

const RegistrationComponent = () => {

const [firstName, setFirstName] = useState('')
const [lastName, setLastName] = useState('')
const [username, setUsername] = useState('')
const [email, setEmail] = useState('')
const [phoneNumber, setPhoneNumber] = useState('')
const [password, setPassword] = useState('')
const [address, setAddress] = useState('')

const navigate = useNavigate();

const createUser = (e) => {
    e.preventDefault(); // da se ne bi osvezavala stranica svaki put kad se form submituje, tako kaze indijac na yt
    const user = {firstName, lastName, email, username, phoneNumber, password, address}
    UserService.createUser(user).then((response) =>{
        console.log(response.data);
        if(response.data.toString() == "success"){
          alertSuccess();
          navigate("/employees");
        }
        else if(response.data.toString() == "invalidInput"){
          alertInvalid(response.data.toString());
        }
        else if(response.data.toString() == "emailOrUsernameAlreadyExist"){
          alertInvalid(response.data.toString());
        }
      }).catch(error =>{
        console.log("Error: " + error);
      })
}

const alertSuccess = () =>{  
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Successfully registered!',
      showConfirmButton: false,
      timer: 1500
    });
  }

  const alertInvalid = (invalidText) =>{
    if(invalidText == "invalidInput"){
      var titleContent = "Invalid input, make sure everything is filed correctly and try again!";
    }
    else if(invalidText == "emailOrUsernameAlreadyExist"){
      var titleContent = "Username or email already exist, try again!";
    }
    else if(invalidText == "emailAlreadyExist"){
      var titleContent = "Email already exist, try again!";
    }
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: titleContent,
    })
  }

  return (
    <div>
      <br/> 
        <div className='container-add-employee'>
          <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
              {
               <h2 className='text-center'>Registration</h2>
              }
              <div className='card-body'>
                <form>
                  <div className='form-group mb-2'>
                    <label className='form-label'>First name: </label>
                    <input  
                        type="text"
                        placeholder="Insert first name" 
                        name = "firstName" 
                        className="form-control" 
                        value={firstName}
                        onChange = {(e) => setFirstName(e.target.value)}
                        >    
                    </input>
                  </div>

                  <div className='form-group mb-2'>
                    <label className='form-label'>Last name: </label>
                    <input  
                        type="text"
                        placeholder="Insert last name" 
                        name = "lastName" 
                        className="form-control" 
                        value={lastName}
                        onChange = {(e) => setLastName(e.target.value)}
                        >                      
                    </input>
                  </div>

                  <div className='form-group mb-2'>
                    <label className='form-label'>Email: </label>
                    <input  
                        type="text"
                        placeholder="Insert email" 
                        name = "email" 
                        className="form-control" 
                        value={email}
                        onChange = {(e) => setEmail(e.target.value)}
                        >                        
                    </input>
                  </div>

                  <div className='form-group mb-2'>
                    <label className='form-label'>Phone number: </label>
                    <input  
                        type="text"
                        placeholder="Insert phone number" 
                        name = "phoneNumber" 
                        className="form-control" 
                        value={phoneNumber}
                        onChange = {(e) => setPhoneNumber(e.target.value)}
                        >                       
                    </input>
                  </div>

                  <div className='form-group mb-2'>
                    <label className='form-label'>Username: </label>
                    {
                      <input  
                      type="text"
                      placeholder="Insert username" 
                      name = "username" 
                      className="form-control" 
                      value={username}
                      onChange = {(e) => setUsername(e.target.value)}
                      >
                      </input>
                    }
                  </div>

                  <div className='form-group mb-2'>
                    <label className='form-label'>Password: </label>
                    <input  
                        type="text"
                        placeholder="Insert password" 
                        name = "password" 
                        className="form-control" 
                        value={password}
                        onChange = {(e) => setPassword(e.target.value)}
                        >                      
                    </input>
                  </div>

                  <div className='form-group mb-2'>
                    <label className='form-label'>Address: </label>
                    <input  
                        type="text"
                        placeholder="Insert address" 
                        name = "address" 
                        className="form-control" 
                        value={address}
                        onChange = {(e) => setAddress(e.target.value)}
                        >                    
                    </input>
                  </div>
                  <button id='registrationBtn' className='btn btn-success' onClick={(e) => createUser(e)}>Submit</button>
                  <Link to="/employees" className='btn btn-danger' style={{marginLeft:"5px"}}>Cancel</Link>
                </form>
              </div>
            </div>
          </div>
        </div>    
    </div>
  )
}

export default RegistrationComponent