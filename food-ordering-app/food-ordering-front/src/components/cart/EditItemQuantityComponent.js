import React, {useState, useEffect} from 'react';
import MealService from '../../services/MealService';
import {Form} from 'react-bootstrap'


const EditItemQuantityComponent = (props) => {
   const itemFromCart = props.itemFromCart;
   const itemQuantity = props.itemQuantity
   const setItemQuantity = props.setItemQuantity;
//    const [itemQuantity, setItemQuantity] = useState(itemFromCart.quantity);
//   const {itemFromCart} = props; 
  // const {user} = props !!!!
  // className = 'form-control', bootstrapov input forme, da lepse izgleda

  return (
    <div>    
        <div className='container-add-meal'>
                <h5>Meal: {itemFromCart?.meal.name}</h5>
                <h5>Price: {itemFromCart?.meal.price},00 RSD</h5>
                <form>
                  <div className='form-group mb-2'>
                    <h5 className='form-label'>Insert quantity: </h5>
                    <input  
                        type="number"
                        placeholder="Insert name" 
                        name = "name" 
                        className="form-control" 
                        min={1}
                        value={itemQuantity}
                        onChange = {(e) => setItemQuantity(+e.target.value)}                     
                        >            
                    </input>
                  </div> 
                </form>             
            </div>       
    </div>
  )
}

export default EditItemQuantityComponent