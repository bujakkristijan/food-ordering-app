import React, {useState, useEffect} from 'react'

import MealService from '../../services/MealService'
import { Modal, Button } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom';


import { useDispatch, useSelector } from 'react-redux';

const CartComponent = () => {

  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const itemsFromCart = useSelector((state) => state.cart);
  
    useEffect(() => {
    
    
  }, [])

   
    const handleShow = () => {
        setShow(true);
        setId(null); //mora ovako da se setuje, kada se vrsi izmena, nakon toga zapamti id od starog pa radi izmenu
        
    };

    

    
  return (
    <>
    <div className='container'>
    <h2 className='text-center'>Meal list</h2>
    <button className="btn btn-success" onClick={handleShow}>Create new meal</button>
    <table className='table table-bordered table-hover'>
        <thead>
            <tr>
                <th>Meal ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Type</th>
                <th>Price</th>
                <th>Action</th>
                

            </tr>
        </thead>
        {/*mora src={"data:image/png;base64," + meal.image}, ne moze samo src={meal.image}  */}
        <tbody>
            {itemsFromCart.map(
                itemFromCart => <tr key={itemFromCart.meal.id}>
                    
                    <td>
                    
                      <img className='mealPicture' src={"data:image/png;base64," + itemFromCart.meal.image} alt=''/> 
                    
                        </td>
                        
                    <td>{itemFromCart.meal.name}</td>
                    <td>{itemFromCart.meal.price}</td>
                    <td>{itemFromCart.quantity}</td>
                    
                    <td>
                        {/* <button className='btn btn-info' onClick={() =>handleShowEdit(meal)}>Update</button>
                        <button className='btn btn-danger' onClick={() => alertAreYouSureDelete(meal.id)} 
                        style={{ marginLeft: "5px" }}>Delete</button> */}
                    </td>

                </tr>
            )}
        </tbody>

    </table>

</div>


{/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Create new meal</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <CreateMealComponent meal={meal} file = {file}/>
        </Modal.Body>

        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
            <Button variant="primary" onClick={handleSubmit}>Save changes</Button>
        </Modal.Footer>
    </Modal>

    <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
            <Modal.Title>Create new meal</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <EditMealComponent meal={meal} file = {file}/>
        </Modal.Body>

        <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEdit}>Close</Button>
            <Button variant="primary" onClick={handleSubmitEdit}>Save changes</Button>
        </Modal.Footer>
    </Modal> */}
    </>
  )
}

export default CartComponent