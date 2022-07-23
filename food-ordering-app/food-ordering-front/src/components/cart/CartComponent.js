import React, {useState, useEffect} from 'react'
import Swal from 'sweetalert2';
import MealService from '../../services/MealService'
import { Modal, Button } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom';
import {editItem, deleteItem, deleteAllItems} from '../../store-redux/cart/cartSlice'

import { useDispatch, useSelector } from 'react-redux';
import EditItemQuantityComponent from './EditItemQuantityComponent';
import InsertDetailsNotLoggedComponent from './InsertDetailsNotLoggedComponent';

const CartComponent = () => {

 const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState(false);
  const [showInsertDetails, setShowInsertDetails] = useState(false);

  const [id, setId] = useState(0);
  const [item, setItem] = useState(null);
  const [itemQuantity, setItemQuantity] = useState(1);

  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const itemsFromCart = useSelector((state) => state.cart);
  const itemsFromCartFinalOrder = { itemsFromCart, address, phoneNumber, setAddress, setPhoneNumber };

  //ako nije ulogovan mora da unese adresu i br telefona
  

  const itemObjToStore = { item, itemQuantity}
  
    useEffect(() => {
    
    
  }, [])

   
    const handleShowEdit = (itemFromCart) => {
        setShowEdit(true);
        setId(null); //mora ovako da se setuje, kada se vrsi izmena, nakon toga zapamti id od starog pa radi izmenu
        setItem(itemFromCart);
        setItemQuantity(itemFromCart.quantity)
    };

    const handleCloseEdit = () => {
        setShowEdit(false);
        setItem(null)
    }

    

    const alertAreYouSureDelete = (id) =>{
       
      console.log("okok: ",id)
        Swal.fire({
          title: 'Are you sure?',
          text: "If you click yes, items will be deleted!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            // deleteItemFromCart(id);
            dispatch(deleteItem(id));
            Swal.fire(
              'Deactivated!',
              'User has been deactivated.',
              'success'
            )
          }
        })
      }
    
      
      const submitFinalOrder = (itemsFromCartFinalOrder) =>{
        console.log("items fo" + JSON.stringify(itemsFromCartFinalOrder));
        MealService.sendItemsForFinalOrder(itemsFromCartFinalOrder).then((response) =>{
            const responseFromServer = response.data;
            if(responseFromServer == "success"){
                dispatch(deleteAllItems());
                console.log("cart posle birsanja ", itemsFromCart)
                alert("success");
                
                
            }
            else{
              alert("failed");
            }
        })
      }

      
      const checkIfLoggedInBeforeSubmit = () =>{
        if(localStorage.token == null || localStorage.token == ''){
          handleShowInsertDetails();
        }
        else{
          submitFinalOrder(itemsFromCartFinalOrder);
        }
      }

      const handleShowInsertDetails = () =>{
        setShowInsertDetails(true);
      }

      const handleCloseInsertDetails = () =>{
        setShowInsertDetails(false);
        setAddress('');
        setPhoneNumber('');
      }
    

    
  return (
    <>
    <div className='container'>
    <h2 className='text-center'>Items from cart</h2>
    <button className="btn btn-success" onClick={() => checkIfLoggedInBeforeSubmit()}>Make final order</button>
    <table className='table table-bordered table-hover'>
        <thead>
            <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
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
                        <button className='btn btn-info' onClick={() =>handleShowEdit(itemFromCart)}>Update</button>
                        <button className='btn btn-danger' onClick={() => alertAreYouSureDelete(itemFromCart.meal.id)} 
                        style={{ marginLeft: "5px" }}>Delete</button> 
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
    */
}
    <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
            <Modal.Title>Edit quantity</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <EditItemQuantityComponent itemFromCart={item} itemQuantity={itemQuantity} setItemQuantity={setItemQuantity} />
        </Modal.Body>

        <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEdit}>Close</Button>
            <Button variant="primary" onClick={()=>dispatch(editItem(itemObjToStore))}>Save changes</Button>
        </Modal.Footer>
    </Modal> 

    <Modal show={showInsertDetails} onHide={handleCloseInsertDetails}>
        <Modal.Header closeButton>
            <Modal.Title>Insert neccessary details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <InsertDetailsNotLoggedComponent details={itemsFromCartFinalOrder} />
        </Modal.Body>

        <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEdit}>Close</Button>
            <Button variant="primary" onClick={() => submitFinalOrder(itemsFromCartFinalOrder)}>Save changes</Button>
        </Modal.Footer>
    </Modal> 

    </>
  )
}

export default CartComponent