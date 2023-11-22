import React, {useState, useEffect} from 'react';
import MealService from '../../services/MealService';
import {Form} from 'react-bootstrap'


const EditItemQuantityComponent = (props) => {
   const itemFromCart = props.itemFromCart;
   const itemQuantity = props.itemQuantity
   const setItemQuantity = props.setItemQuantity;

  return (
    <div className='main-quantity-container'>
    <div className='meal-info-container'>
      <div className='meal-container'>
          <label className='label-meal-info'>Meal:</label>
          {/* mora ovako sa ? inace puca cim se zatvori modal, jer se vrv setuje item na null a onda renderuje u modalu ponovo, ili bih mogao da proverim da li je itemFromCart != null   */}
          <label className='label-meal-value'>{itemFromCart?.mealName}</label>
      </div>

      <div className='meal-container'>
          <label className='label-meal-info'>Price:</label>
          <label className='label-meal-value'>{itemFromCart?.mealPrice},00 RSD</label>
      </div>              
    </div>
        
        <div className="quantity-container">
          <button
            className='btn-decrease'
            type="button"
            onClick={() => {
              // Decrease the value by 1, but not below 1
              // u sustini poredi vrednosti koja je veca pa nju vraca, ispod 1 nece moci da se setuje
              const newValue = Math.max(1, itemQuantity - 1);
              setItemQuantity(newValue);
            }}
          >
            <svg className='icon-minus' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>
          
          </button>
          <label className='value-label'>{itemQuantity}</label>
          <button
            className='btn-increase'
            type="button"
            onClick={() => {
              // Increase the value by 1
              const newValue = itemQuantity + 1;
              setItemQuantity(newValue);
            }}
          >
           <svg className='icon-plus' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg> 
          </button>
        </div>
    </div>    
  )
}

export default EditItemQuantityComponent