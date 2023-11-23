import React from 'react';
import './MealQuantityComponent.css';



const MealQuantityComponent = (props) => {
  const mealQuantity = props.mealQuantity; // u props se nalazi i user i metoda handle submit
  const meal = props.meal;
  // const {user} = props !!!!
  // className = 'form-control', bootstrapov input forme, da lepse izgleda
  
  return (
        <div className='main-quantity-container'>
            <div className='meal-info-modal-container'>
              <div className='meal-container'>
                  <label className='label-meal-info'>Meal:</label>
                  <label className='label-meal-value'>{meal.name}</label>
              </div>

              <div className='meal-container'>
                  <label className='label-meal-info'>Price:</label>
                  <label className='label-meal-value'>{meal.price},00 RSD</label>
              </div>              
            </div>
                
                <div className="quantity-container">
                  <button
                    className='btn-decrease'
                    type="button"
                    onClick={() => {
                      // Decrease the value by 1, but not below 1
                      const newValue = Math.max(1, mealQuantity.mealQuantity - 1);
                      mealQuantity.setMealQuantity(newValue);
                    }}
                  >
                    <svg className='icon-minus' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>
                  
                  </button>
                  <label className='value-label'>{mealQuantity.mealQuantity}</label>
                  <button
                    className='btn-increase'
                    type="button"
                    onClick={() => {
                      // Increase the value by 1
                      const newValue = mealQuantity.mealQuantity + 1;
                      mealQuantity.setMealQuantity(newValue);
                    }}
                  >
                   <svg className='icon-plus' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg> 
                  </button>
                </div>
            </div>    
  )
}

export default MealQuantityComponent