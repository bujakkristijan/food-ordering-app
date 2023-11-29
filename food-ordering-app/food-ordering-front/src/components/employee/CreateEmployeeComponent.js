import React, {useState, useEffect} from 'react'
import UserService from '../../services/UserService'
import {Link, useNavigate, useParams} from 'react-router-dom'
import Swal from 'sweetalert2'

const CreateEmployeeComponent = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [address, setAddress] = useState('')

  //za update
  const {id} = useParams();

  const navigate = useNavigate();

  //ako postoji id, znaci da se radi izmena i prvo se setuju podaci dobijeni od servera
  useEffect(() => {
    id && UserService.getEmployeeById(id).then((response) =>{
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setEmail(response.data.email);
      setPhoneNumber(response.data.phoneNumber);
      setUsername(response.data.username);
      setPassword(response.data.password);
      setAddress(response.data.address);
    }).catch(error =>{
      console.log(error)
    })
  }, [])

  const createOrUpdateEmployee = (e) => {
    e.preventDefault();

    const user = {firstName, lastName, email, username, phoneNumber, password, address}
    
    if(firstName.trim() === '' || lastName.trim() === ''
      || email.trim() === '' || username.trim() === '' || phoneNumber.trim() === '' 
      || password.trim() === '' || address.trim() === ''){
       alertInvalid("Invalid input, make sure everything is filled!")
    }
    else if (validateEmail() === false){
      alertInvalid("Invalid email! Try again!");
    }
    else if(!isValidNumber(phoneNumber)){
      alertInvalid("Invalid phone number or it has less than 5 digits");
    }
    else{
      //ako id postoji, odnosno ako je prosledjen radi se izmena postojeceg
      if(id){
        UserService.updateEmployee(id, user).then((response) =>{
          if(response.data.toString() === "success"){
            alertSuccess('Successfully updated employee!');
            navigate("/employees");
          }
          else if(response.data.toString() == "invalid"){
            alertInvalid("Invalid input, make sure everything is filed correctly and try again!");
          }
          else if(response.data.toString() === "emailNotUnique"){
            alertInvalid("Email already exists! Try again!");
          }
          else if(response.data.toString() === "usernameNotUnique"){
            alertInvalid("Username already exists! Try again!");
          }
          else if(response.data.toString() === "fail"){
            alertInvalid("Sorry, failed to save new employee!");
          }
        }).catch(error =>{
          console.log(error);
        })
      }
      //ako nije prosledjen id, radi se kreiranje novog
      else{
        UserService.createEmployee(user).then((response) =>{
          console.log(response.data);
          if(response.data.toString() === "success"){
            alertSuccess('Successfully created employee!');
            navigate("/employees");
          }
          else if(response.data.toString() === "invalid"){
            alertInvalid("Invalid input, make sure everything is filed correctly and try again!");
          }
          else if(response.data.toString() === "emailNotUnique"){
            alertInvalid("Email already exists! Try again!");
          }
          else if(response.data.toString() === "usernameNotUnique"){
            alertInvalid("Username already exists! Try again!");
          }
          else if(response.data.toString() === "fail"){
            alertInvalid("Sorry, failed to save new employee!");
          }
        }).catch(error =>{
          console.log("Error: " + error);
        })
      } 
    }
  }

  const isValidNumber = (input) => {
    // ^\d{5,}$: Uses a regular expression to ensure that the input consists of at least 5 digits. 
    // Here's a breakdown:
    // ^: Asserts the start of the string.
    // \d{5,}: Matches at least 5 digits (\d is a shorthand for a digit, and {5,} means at least 5 occurrences).
    // $: Asserts the end of the string.
    if(isNaN(input) || /^\d{5,}$/.test(input) === false){
      return false;
    }
    else{
      return true;
    }
  }

  const validateEmail = () => {
    //treba bez ''
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const alertInvalid = (message) =>{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    })
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

const title = () => {
  if(id){
    return <h2 className='text-center'>Update employee</h2>
  }
  else{
    return <h2 className='text-center'>Create employee</h2>
  }
}
//ako postoji id, odnosno ako je izmena, disabluje se input
const usernameInput = () => {
  if(id){
    return <input  
              type="text"
              placeholder="Insert username" 
              name = "username" 
              className="form-control" 
              value={username}
              onChange = {(e) => setUsername(e.target.value)}
              disabled = {true}
              > 
            </input>
  }
  else{
    return <input  
              type="text"
              placeholder="Insert username" 
              name = "username" 
              className="form-control" 
              value={username}
              onChange = {(e) => setUsername(e.target.value)}
            >
            </input>
  }
}

  return (
    <div>
      <br/> 
        <div className='container-add-employee'>
          <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
              {
                title()
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
                      usernameInput()
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

                  <button className='btn btn-success' onClick={(e) => createOrUpdateEmployee(e)}>Submit</button>
                  <Link to="/employees" className='btn btn-danger' style={{marginLeft:"5px"}}>Cancel</Link>
                </form>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default CreateEmployeeComponent