import React, {useState, useEffect} from 'react';
import MealService from '../../services/MealService';
import {Form} from 'react-bootstrap'


const MealQuantityComponent = (props) => {
  const mealQuantity = props.mealQuantity; // u props se nalazi i user i metoda handle submit
  const meal = props.meal;
  // const {user} = props !!!!
  // className = 'form-control', bootstrapov input forme, da lepse izgleda
  
  return (
    <div>  
        <div className='container-add-meal'>
                <h5>Meal: {meal.name}</h5>
                <h5>Price: {meal.price},00 RSD</h5>
                <form>
                  <div className='form-group mb-2'>
                    <h5 className='form-label'>Insert quantity: </h5>
                    <input  
                        type="number"
                        placeholder="Insert name" 
                        name = "name" 
                        className="form-control" 
                        min={1}
                        value={mealQuantity.mealQuantity}
                        onChange = {(e) => mealQuantity.setMealQuantity(+e.target.value)}                     
                        >                      
                    </input>
                  </div>  
                </form>         
            </div>    
    </div>
  )
}

export default MealQuantityComponent