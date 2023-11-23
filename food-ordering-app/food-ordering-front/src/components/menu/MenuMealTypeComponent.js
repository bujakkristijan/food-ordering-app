import React, {useState, useEffect} from 'react'
import MealTypeService from '../../services/MealTypeService';
import './MenuMealTypeComponent.css';
import { Link } from 'react-router-dom';

const MenuMealTypeComponent = () => {

const [mealTypes, setMealTypes] = useState([]);

useEffect(() =>{
    getAllMealTypes();
}, [])

const getAllMealTypes = () =>{
    MealTypeService.getAllMealTypes().then((response) =>{
        setMealTypes(response.data);
    }).catch(error =>{
        console.log(error);
    })
}
  return (
    <div className='container-mealType'>
        {
            mealTypes.map((mealType) => {
                return(
                    <div className='card-meal-type' key={mealType.id}>   
                        <img className='image' src={"data:image/png;base64," + mealType.image} alt=''></img>     
                        <div className='name-container'>
                            <h4 className='name-content'>{mealType.typeName}</h4>
                        </div>
                        <div className='description-container'>
                            <p>{mealType.description}</p>
                        </div>
                        <Link className='btn-see-items' to={`/meals-by-meal-type/${mealType.id}`}>
                            Show offers
                            <svg className='show-items-icon' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M64 144a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM64 464a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm48-208a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z"/></svg>
                        </Link>
                    </div>
                )
            })
        }
    </div>
  )
}

export default MenuMealTypeComponent