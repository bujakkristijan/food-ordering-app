import React from 'react'
import { useState } from 'react';

const EditPasswordComponent = (props) => {
  const passwordObj = props.passwordObj;
  
  return (
    <div>
        <div className='container-add-employee'>
                <form>
                  <div className='form-group mb-2'>
                    <label className='form-label'>Old password: </label>
                    <input  
                      type="password"
                      placeholder="Insert old password" 
                      name = "password" 
                      className="form-control"                
                      value={passwordObj.oldPassword}
                      onChange = {(e) => passwordObj.setOldPassword(e.target.value)}                              
                      >
                      </input>
                  </div>

                  <div className='form-group'>
                    <label className='form-label'>New password: </label>
                    <input  
                        type="password"
                        placeholder="Insert new password" 
                        name = "password" 
                        className="form-control"                 
                        value={passwordObj.newPassword}
                        onChange = {(e) => passwordObj.setNewPassword(e.target.value)}                 
                        >                 
                    </input>
                  </div>        
                </form>       
            </div>  
    </div>
  )
}

export default EditPasswordComponent