import React, {useState, useEffect} from 'react'
import UserService from '../../services/UserService'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import './MyProfileComponent.css'
import EditMyProfileComponent from './EditMyProfileComponent'
import { Modal, Button } from 'react-bootstrap'
import EditPasswordComponent from './EditPasswordComponent'

const MyProfileComponent = () => {

    const [id, setId] = useState(null);

    const [firstName, setFirstName] = useState('')
    const [firstNameEdit, setFirstNameEdit] = useState('')

    const [lastName, setLastName] = useState('')
    const [lastNameEdit, setLastNameEdit] = useState('')

    const [username, setUsername] = useState('')
    const [usernameEdit, setUsernameEdit] = useState('')

    const [email, setEmail] = useState('')
    const [emailEdit, setEmailEdit] = useState('')

    const [phoneNumber, setPhoneNumber] = useState('')
    const [phoneNumberEdit, setPhoneNumberEdit] = useState('')

    const [password, setPassword] = useState('')
    const [passwordEdit, setPasswordEdit] = useState('')

    const [address, setAddress] = useState('')
    const [addressEdit, setAddressEdit] = useState('')

    const [role, setRole] = useState('');

    const user = {firstNameEdit, setFirstNameEdit, lastNameEdit, setLastNameEdit, usernameEdit, setUsernameEdit, emailEdit, setEmailEdit, phoneNumberEdit, setPhoneNumberEdit,  addressEdit, setAddressEdit}
    const userEdit = { id, firstName: firstNameEdit, lastName: lastNameEdit, username: usernameEdit, email: emailEdit, phoneNumber: phoneNumberEdit, address: addressEdit}

    const [show, setShow] = useState(false);
    const [showPassModal, setShowPassModal] = useState(false);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    let passwordObj = {oldPassword, newPassword, setNewPassword, setOldPassword};

    useEffect(() => {
        getCurrentUser(); 
      }, []);

    const handleClose = () => {
        setShow(false);
        }

    const handleClosePassModal = () => {
        setShowPassModal(false);
        setOldPassword('');
        setNewPassword('');
        }

    const handleShowPassModal = () =>{
        setShowPassModal(true);
        setPasswordEdit(password);
    }

    const handleShow = () => {
        setShow(true)
        setFirstNameEdit(firstName);
        setLastNameEdit(lastName);
        setEmailEdit(email);
        setPhoneNumberEdit(phoneNumber);
        // setPasswordEdit(password);
        setUsernameEdit(username);
        setAddressEdit(address);
    };

    

    const getCurrentUser = () =>{
        UserService.getCurrentUser().then((response) =>{
            setId(response.data.id);
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setEmail(response.data.email);
            setPhoneNumber(response.data.phoneNumber);
            setUsername(response.data.username);
            // setPassword(response.data.password);
            setAddress(response.data.address);
            setRole(response.data.role);
          }).catch(error =>{
            console.log(error)
          });
    }

    const handleSubmitChangePass = () =>{
        //validacija unosa
        if(oldPassword.trim() === '' || newPassword.trim()===0 ){
            alertInvalid("Invalid input, make sure everything is filed correctly and try again!")
        }
        else{
            UserService.changePassword(passwordObj).then((response) =>{
                const responseFromServer = response.data;
                if(responseFromServer === "success"){
                    alertSuccess("Successfully changed password!");
                    getCurrentUser();
                    handleClosePassModal();
                }
                else if(response.data.toString() === "fail"){
                    alertInvalid("Your old and inserted password don't match! Try again");
                }
            })
        }
    }

    const handleSubmit = () => {
        //validacija unosa
        console.log(firstNameEdit + " " + lastNameEdit + " " + emailEdit + " " + usernameEdit + " " + phoneNumberEdit + " " + addressEdit)
        if(firstNameEdit.trim() === '' || lastNameEdit.trim() === ''
            || emailEdit.trim() === '' || usernameEdit.trim() === '' 
            || phoneNumberEdit.trim() === '' || addressEdit.trim() === ''){
            alertInvalid("Invalid input, make sure everything is filed correctly and try again!")
        }
        else if (validateEmail() === false){
            alertInvalid("Invalid email! Make sure email is valid and try again!");
        }
        else if(!isValidNumber(phoneNumber)){
            alertInvalid("Invalid phone number or it has less than 5 digits");
        }
        else{
            UserService.updateUser(userEdit).then((response) =>{
                const responseFromServer = response.data;
                if(responseFromServer === "success"){
                    alertSuccess("Successfully edited profile!");
                    getCurrentUser();
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
            }).finally(()=> handleClose());
        }
    }

    const validateEmail = () => {
        //treba bez ''
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(emailEdit);
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
    
  return (
    <>
    <div className="container">
        <div className="main-body">
            <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                <div className="card">
                    <div className="card-body">
                    <div className="d-flex flex-column align-items-center text-center">
                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150"/>
                        <div className="mt-3">
                        <h4>{firstName} {lastName}</h4>
                        <p className="text-secondary mb-1">Full Stack Developer</p>
                        <p className="text-muted font-size-sm">{address}</p>
                        <button id="changePassBtn" className='btn btn-success'onClick={handleShowPassModal}>Change password</button>
                        {/* <Link className='btn btn-success' to={`/my-active-final-orders`}>Active orders</Link> */}
                        <Link className='btn btn-danger' style={{marginLeft:"5px"}} to={`/my-delivered-final-orders`}>Order history</Link>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="card mt-3">
                    <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                        <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-globe mr-2 icon-inline"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>Website</h6>
                        <span className="text-secondary">https://bootdey.com</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                        <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github mr-2 icon-inline"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>Github</h6>
                        <span className="text-secondary">bootdey</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                        <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-twitter mr-2 icon-inline text-info"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>Twitter</h6>
                        <span className="text-secondary">@bootdey</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                        <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram mr-2 icon-inline text-danger"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>Instagram</h6>
                        <span className="text-secondary">bootdey</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                        <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-facebook mr-2 icon-inline text-primary"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>Facebook</h6>
                        <span className="text-secondary">bootdey</span>
                    </li>
                    </ul>
                </div>
                </div>
                <div className="col-md-8">
                <div className="card mb-3">
                    <div className="card-body">
                    <div className="row">
                        <div className="col-sm-3">
                        <h4 className="mb-0">First name</h4>
                        </div>
                        <div className="col-sm-9 text-secondary">
                        {firstName}
                        </div>
                    </div>
                    <hr></hr>
                    <div className="row">
                        <div className="col-sm-3">
                        <h4 className="mb-0">Last name</h4>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {lastName}
                        </div>
                    </div>
                    <hr></hr>
                    <div className="row">
                        <div className="col-sm-3">
                        <h4 className="mb-0">Username</h4>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {username}
                        </div>
                    </div>
                    <hr></hr>
                    <div className="row">
                        <div className="col-sm-3">
                        <h4 className="mb-0">Email</h4>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {email}
                        </div>
                    </div>
                    <hr></hr>
                    <div className="row">
                        <div className="col-sm-3">
                        <h4 className="mb-0">Phone number</h4>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {phoneNumber}
                        </div>
                    </div>
                    <hr></hr>
                    <div className="row">
                        <div className="col-sm-3">
                        <h4 className="mb-0">Address</h4>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {address}
                        </div>
                    </div>
                    <hr></hr>
                    <div className="row">
                        <div className="col-sm-3">
                        <h4 className="mb-0">Role</h4>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {role}
                        </div>
                    </div>
                    {/* <div className="row">
                        <div className="col-sm-3">
                        <h4 className="mb-0">Password</h4>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            <label id="labelPassword">{password}</label>
                        </div>
                    </div> */}
                    <hr></hr>
                    <div className="row">
                        <div className="col-sm-12">
                            <button className="btn btn-success" onClick={handleShow}>Edit profile</button>
                            
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
    
    {/* NE MOZE MODAL.DIALOG, MORA MODAL SAMO */}
    <Modal show={show} onHide={handleClose} dialogClassName="modalEditProfile" className="d-flex align-items-center justify-content-center">
        <Modal.Header closeButton>
        <Modal.Title>Edit profile</Modal.Title>
        </Modal.Header>

            <Modal.Body>
                <EditMyProfileComponent user = {user} handleSubmit={handleSubmit}/>
            </Modal.Body>

        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={handleSubmit}>Save changes</Button>
        </Modal.Footer>
    </Modal>

     {/* NE MOZE MODAL.DIALOG, MORA MODAL SAMO */}
     <Modal show={showPassModal} onHide={handleClosePassModal} dialogClassName="modalEditPassword" className="d-flex align-items-center justify-content-center">
        <Modal.Header closeButton>
        <Modal.Title>Edit password</Modal.Title>
        </Modal.Header>

            <Modal.Body>
                <EditPasswordComponent passwordObj = {passwordObj} handleSubmitChangePass={handleSubmitChangePass}/>
            </Modal.Body>

        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={handleSubmitChangePass}>Save changes</Button>
        </Modal.Footer>
    </Modal>
    </>
  )
}

export default MyProfileComponent