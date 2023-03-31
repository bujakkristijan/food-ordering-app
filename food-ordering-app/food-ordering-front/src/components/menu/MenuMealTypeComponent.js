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
                        <Link className='btn btn-success' to={`/meals-by-meal-type/${mealType.id}`}>See items</Link>
                    </div>
                )
            })
        }
    </div>
  )
}

export default MenuMealTypeComponent