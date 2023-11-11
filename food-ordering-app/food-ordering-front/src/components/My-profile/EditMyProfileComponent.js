import React from 'react'

const EditMyProfileComponent = (props) => {
  const user = props.user // u props se nalazi i user i metoda handle submit
  // const {user} = props !!!!
  // className = 'form-control', bootstrapov input forme, da lepse izgleda
  
  return (
    <div>
        <div className='container-add-employee'>
                <form>
                  <div className='form-group mb-2'>
                    <label className='form-label'>First name: </label>
                    <input  
                        type="text"
                        placeholder="Insert first name" 
                        name = "firstName" 
                        className="form-control"  
                        value={user.firstNameEdit}
                        onChange = {(e) => user.setFirstNameEdit(e.target.value)}  
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
                        value={user.lastNameEdit}
                        onChange = {(e) => user.setLastNameEdit(e.target.value)}      
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
                        value={user.emailEdit}
                        onChange = {(e) => user.setEmailEdit(e.target.value)}     
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
                        value={user.phoneNumberEdit}
                        onChange = {(e) => user.setPhoneNumberEdit(e.target.value)}        
                        >         
                    </input>
                  </div>

                  <div className='form-group mb-2'>
                    <label className='form-label'>Username: </label>
                    <input  
                      type="text"
                      placeholder="Insert username" 
                      name = "username" 
                      className="form-control"             
                      value={user.usernameEdit}
                      onChange = {(e) => user.setUsernameEdit(e.target.value)}
                      disabled = {true}           
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
                      value={user.addressEdit}
                      onChange = {(e) => user.setAddressEdit(e.target.value)}                              
                      >
                      </input>
                  </div>
                </form>       
            </div>  
    </div>
  )
}

export default EditMyProfileComponent