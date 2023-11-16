import React, {useState, useEffect}  from 'react'
import {Form} from 'react-bootstrap'
import MealService from '../../services/MealService';

const EditMealComponent = (props) => {
    const meal = props.meal // u props se nalazi i user i metoda handle submit
    const selectedFile = props.file;
  // const {user} = props !!!!
  // className = 'form-control', bootstrapov input forme, da lepse izgleda
  const [mealTypes, setMealTypes] = useState([]);

  useEffect(() => {
    getAllMealTypes();
  }, [])
  
  const getAllMealTypes = () =>{
    MealService.getAllMealTypes().then((response) =>{
        setMealTypes(response.data);
    }).catch(error =>{
            console.log(error);
        })
  }

  const onChoseFile = (e) =>{
    console.log(e.target.files[0]);
    selectedFile.setSelectedFile(e.target.files[0]);
  }

  return (
    <div>
        <div className='container-add-meal'>   
                <form>
                  <div className='form-group mb-2'>
                    <label className='form-label'>Name: </label>
                    <input  
                        type="text"
                        placeholder="Insert name" 
                        name = "name" 
                        className="form-control" 
                        value={meal.name}
                        onChange = {(e) => meal.setName(e.target.value)}                       
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
                        value={meal.description}
                        onChange = {(e) => meal.setDescription(e.target.value)}                       
                        >                       
                    </input>
                  </div>

                  <div className='form-group mb-2'>
                    <label className='form-label'>Price: </label>
                    <input  
                        type="text"
                        placeholder="Insert price" 
                        name = "price" 
                        className="form-control"                      
                        value={meal.price}
                        onChange = {(e) => meal.setPrice(e.target.value)}                       
                        >                     
                    </input>
                  </div>

                 <div className='form-group mb-2'>
                    <label className='form-label'>Type: </label>
                    <Form.Select value={JSON.stringify(meal.mealType)} onChange={(e)=>meal.setMealType(JSON.parse(e.target.value))}>
                    {mealTypes.map((mealTypeItem)=> {
                      return (
                        <option key={mealTypeItem.id} value={JSON.stringify(mealTypeItem)} >{mealTypeItem.typeName}</option>
                      )
                    })}
                    </Form.Select>
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
                {/*
                  <div className='form-group mb-2'>
                    <label className='form-label'>Upload picture: </label>
                    <input  
                        type="text"
                        placeholder="Insert phone number" 
                        name = "phoneNumber" 
                        className="form-control" 
                        
                        value={user.phoneNumberEdit}
                        onChange = {(e) => user.setPhoneNumberEdit(e.target.value)}
                        
                        >
                        
                    </input>
                  </div>
                  */
                }          
                </form>             
            </div>     
    </div>
  )
}

export default EditMealComponent