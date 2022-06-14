import React from 'react'

const EditMyProfileComponent = () => {
  // className = 'form-control', bootstrapov input forme, da lepse izgleda
  return (
    <div>
      
        <div className='container-add-employee'>
          <div className='row'>
            <div>
              
                
              
              
                <form>
                  <div className='form-group mb-2'>
                    <label className='form-label'>First name: </label>
                    <input  
                        type="text"
                        placeholder="Insert first name" 
                        name = "firstName" 
                        className="form-control" 
                        /*
                        value={firstName}
                        onChange = {(e) => setFirstName(e.target.value)}
                        */
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
                        /*
                        value={lastName}
                        onChange = {(e) => setLastName(e.target.value)}
                        */
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
                        /*
                        value={email}
                        onChange = {(e) => setEmail(e.target.value)}
                        */
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
                        /*
                        value={phoneNumber}
                        onChange = {(e) => setPhoneNumber(e.target.value)}
                        */
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
                      /*
                      value={username}
                      onChange = {(e) => setUsername(e.target.value)}
                      disabled = {true}
                      */
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
                      /*
                      value={address}
                      onChange = {(e) => setAddress(e.target.value)}
                      
                      */
                      >
                      </input>
                  </div>

                  <div className='form-group'>
                    <label className='form-label'>Password: </label>
                    <input  
                        type="text"
                        placeholder="Insert password" 
                        name = "password" 
                        className="form-control" 
                        /*
                        value={password}
                        onChange = {(e) => setPassword(e.target.value)}
                        */
                        >
                        
                    </input>
                  </div>


                  

                  
                </form>
              
            </div>
          </div>
        </div>
        
    </div>
  )
}

export default EditMyProfileComponent