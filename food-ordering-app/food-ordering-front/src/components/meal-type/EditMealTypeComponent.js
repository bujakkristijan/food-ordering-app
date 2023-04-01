import React, {useState, useEffect}  from 'react'
import {Form} from 'react-bootstrap'
import MealTypeService from '../../services/MealService';

const EditMealTypeComponent = (props) => {
    const mealType = props.mealType; // u props se nalazi i user i metoda handle submit
    const selectedFile = props.file;
  // const {user} = props !!!!
  // className = 'form-control', bootstrapov input forme, da lepse izgleda

  const onChoseFile = (e) =>{
    console.log(e.target.files[0]);
    selectedFile.setSelectedFile(e.target.files[0]);
  }

  return (
    <div> 
        <div className='container-add-meal'>
                <form>
                  <div className='form-group mb-2'>
                    <label className='form-label'>TypeName: </label>
                    <input  
                        type="text"
                        placeholder="Insert name" 
                        name = "typeName" 
                        className="form-control"                       
                        value={mealType.typeName}
                        onChange = {(e) => mealType.setTypeName(e.target.value)}                    
                        >                   
                    </input>
                  </div>

                  <div className='form-group mb-2'>
                    <label className='form-label'>Description: </label>
                    <input  
                        type="text"
                        placeholder="Insert description" 
                        name = "description" 
                        className="form-control"                        
                        value={mealType.description}
                        onChange = {(e) => mealType.setDescription(e.target.value)}                      
                        >                        
                    </input>
                  </div>
             
                  <div className='form-group mb-2'>
                    <label className='form-label'>Upload image </label>
                    <input  
                        type="file"
                        placeholder="Insert price" 
                        name = "image" 
                        className="form-control"                       
                        onChange = {(e) =>onChoseFile(e)}                      
                        >                        
                    </input>
                  </div>
                </form>           
            </div>     
    </div>
  )
}

export default EditMealTypeComponent