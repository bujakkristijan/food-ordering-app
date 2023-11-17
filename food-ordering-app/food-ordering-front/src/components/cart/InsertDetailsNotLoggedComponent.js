import React, {useState, useEffect} from 'react';
import MealService from '../../services/MealService';
import {Form} from 'react-bootstrap'


const InsertDetailsNotLoggedComponent = (props) => {
   
   const address = props.details.address;
   const phoneNumber = props.details.phoneNumber;
   const setAddress = props.details.setAddress;
   const setPhoneNumber = props.details.setPhoneNumber;
   const finalPrice = props.details.finalPrice;

  return (
    <div> 
        <div className='container-add-meal'>
                <h5>Final price: {finalPrice},00 RSD </h5>
                <form>
                  <div className='form-group mb-2'>
                    <h5 className='form-label'>Insert address: </h5>
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

                  <div className='form-group mb-2'>
                    <h5 className='form-label'>Insert phone number: </h5>
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
                </form>  
            </div>   
    </div>
  )
}

export default InsertDetailsNotLoggedComponent