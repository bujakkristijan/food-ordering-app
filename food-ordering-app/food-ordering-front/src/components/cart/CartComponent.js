import React, {useState, useEffect} from 'react'
import Swal from 'sweetalert2';
import MealService from '../../services/MealService'
import { Modal, Button } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom';
import {editItem, deleteItem, deleteAllItems} from '../../store-redux/cart/cartSlice'

import { useDispatch, useSelector } from 'react-redux';
import EditItemQuantityComponent from './EditItemQuantityComponent';
import InsertDetailsNotLoggedComponent from './InsertDetailsNotLoggedComponent';
import './CartComponent.css';

const CartComponent = () => {

 const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState(false);
  const [showInsertDetails, setShowInsertDetails] = useState(false);

  const [id, setId] = useState(0);
  const [item, setItem] = useState(null);
  const [itemQuantity, setItemQuantity] = useState(1);

  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  var finalPriceVar;
  
  const [finalPrice, setFinalPrice] = useState(0);

  const itemsFromCart = useSelector((state) => state.cart);
  let itemsFromCartWhenLoggedWithFinalPrice = { itemsFromCart, finalPrice}
  const itemsFromCartFinalOrder = { itemsFromCart, address, phoneNumber, finalPrice, setAddress, setPhoneNumber };

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
        // console.log("items fo" + JSON.stringify(itemsFromCartFinalOrder));
        MealService.sendItemsForFinalOrder(itemsFromCartFinalOrder).then((response) =>{
            const responseFromServer = response.data;
            // alert("Response from server: " + responseFromServer);
            //ako je response razlicit od 0, znaci da je uspesno upisan final order i prosledjen id, po defaultu je 0
            if(responseFromServer != 0){
                dispatch(deleteAllItems());
                // console.log("cart posle birsanja ", itemsFromCart)
                if(localStorage.token == null || localStorage.token == ''){
                  handleCloseInsertDetails();
                  alertFinalOrderStringCheckInfo(responseFromServer);
                }
                else{
                  alertSuccessOrdered();
                }     
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
          alertAreYouSureFinalOrder();
        }
      }

      const handleShowInsertDetails = () =>{
        sumFinalPrice();
        setFinalPrice(finalPriceVar);
        setShowInsertDetails(true);
        
      }

      const handleCloseInsertDetails = () =>{
        setShowInsertDetails(false);
        setAddress('');
        setPhoneNumber(''); 
        // setFinalPrice(0);
        // finalPriceVar = 0;
      }
    

      const alertAreYouSureFinalOrder = () =>{
        sumFinalPrice();
        setFinalPrice(finalPriceVar);
        // console.log(JSON.stringify(finalPriceVar));
        // console.log(finalPriceVar);
        let textStr;
        textStr = "Final price is: "+ finalPriceVar.toFixed(1) + " RSD. (10% OFF)! If you click yes, you will make final order!";
        Swal.fire({
          title: 'Are you sure?',
          text: textStr,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, make it!'
        }).then((result) => {
          if (result.isConfirmed) {
            // console.log("FINAL PRICE VAR " + finalPriceVar);
            // console.log("OBJ " + JSON.stringify(itemsFromCartWhenLoggedWithFinalPrice));
            // console.log("FINAL PRICE SETOVAН " + JSON.stringify(finalPrice));
            setFinalPrice(finalPriceVar);
            // console.log("krajnja vrednost: ",itemsFromCartWhenLoggedWithFinalPrice)
            itemsFromCartWhenLoggedWithFinalPrice = { itemsFromCart, finalPrice: finalPriceVar}
            submitFinalOrder(itemsFromCartWhenLoggedWithFinalPrice);
          }
          else{
            finalPriceVar = 0;
          }
        })
      }

      const sumFinalPrice = () =>{
        finalPriceVar = 0;
        // console.log("items from cart" + itemsFromCart);
        if(localStorage.token == null || localStorage.token == ''){
          for(let i=0; i<itemsFromCart.length; i++){
            console.log(itemsFromCart[i].meal.price);
            finalPriceVar += itemsFromCart[i].meal.price*itemsFromCart[i].quantity;
          }
        }
        else{
          for(let i=0; i<itemsFromCart.length; i++){
            // console.log("items from cart for" + itemsFromCart[i].meal.price);
            finalPriceVar += (itemsFromCart[i].meal.price)*0.9*itemsFromCart[i].quantity;
          }
        }
      }

      const editItemQuantity = () =>{
        dispatch(editItem(itemObjToStore));
        handleCloseEdit();
        alertSuccessEdit();
      }

      const alertSuccessEdit = () =>{
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Successfully edited item quantity!',
          showConfirmButton: false,
          timer: 1500
        });
      }

      const alertSuccessOrdered = () =>{
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Successfully ordered items!',
          showConfirmButton: false,
          timer: 1500
        });
      }
      // const generateStringForOrderToCheckIfNotLoggedIn =(finalOrderId)=>{
      //    let textStr = "localhost:3000/finalOrder/"+finalOrderId;
      //    return textStr;
      // }

      const alertFinalOrderStringCheckInfo = (finalOrderId) =>{
        let linkStr = "/final-order/"+finalOrderId;
        let textStr = "localhost:3000/final-order/"+finalOrderId;
        // <Link to={`/final-order/${finalOrderId}`}>localhost:3000/final-order/{finalOrderId}</Link>
        Swal.fire({
          title: 'Successfully ordered items! You can check status opening this link',
          icon: 'success',
          html:
          // <Link to={`/final-order/${finalOrderId}`}>localhost:3000/final-order/{finalOrderId}</Link>,
            `<a href=${linkStr}>${textStr}</a>`,
          showCloseButton: true,
          focusConfirm: false,
          confirmButtonText:
            '<i class="fa fa-thumbs-up"></i> Okay!',
          confirmButtonAriaLabel: 'Thumbs up, great!',
          
        })
      }

    
  return (
    <>
    <div className='container'>
    <h2 className='text-center'>Items from cart</h2>
    <button className="btn btn-success mb-2" onClick={() => checkIfLoggedInBeforeSubmit()}>Make final order</button>
    <table id="table" className='table table-hover tableElement'>
        <thead className='thead-name'>
            <tr>
                <th className='theadth'>Image</th>
                <th className='theadth'>Name</th>
                <th className='theadth'>Price</th>
                <th className='theadth'>Quantity</th>
                <th className='theadth'>Action</th>               
            </tr>
        </thead>
        {/*mora src={"data:image/png;base64," + meal.image}, ne moze samo src={meal.image}  */}
        <tbody>
            {itemsFromCart.map(
                itemFromCart => <tr key={itemFromCart.meal.id}>                    
                    <td className='td-content-img'>                  
                      <img className='mealPic' src={"data:image/png;base64," + itemFromCart.meal.image} alt=''/>                   
                    </td>                       
                    <td className='td-content'>{itemFromCart.meal.name}</td>
                    <td className='td-content'>{itemFromCart.meal.price}</td>
                    <td className='td-content'>{itemFromCart.quantity}</td>                    
                    <td className='td-content'>
                        <button className='btn btn-success' onClick={() =>handleShowEdit(itemFromCart)}>Update</button>
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
            <Button variant="primary" onClick={()=>editItemQuantity()}>Save changes</Button>
        </Modal.Footer>
    </Modal> 
    {/* ()=>dispatch(editItem(itemObjToStore)) */}

    <Modal show={showInsertDetails} onHide={handleCloseInsertDetails}>
        <Modal.Header closeButton>
            <Modal.Title>Insert neccessary details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <InsertDetailsNotLoggedComponent details={itemsFromCartFinalOrder} />
        </Modal.Body>

        <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEdit}>Close</Button>
            <Button variant="primary" onClick={() => submitFinalOrder(itemsFromCartFinalOrder)}>Confirm final order</Button>
        </Modal.Footer>
    </Modal> 
    </>
  )
}

export default CartComponent