import React, {useState, useEffect} from 'react'
import Swal from 'sweetalert2';
import MealService from '../../services/MealService'
import { Modal, Button } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom';
import {editItem, deleteItem, deleteAllItems} from '../../store-redux/cart/cartSlice'
import { useDispatch, useSelector } from 'react-redux';
import EditItemQuantityComponent from './EditItemQuantityComponent';
import InsertDetailsNotLoggedComponent from './InsertDetailsNotLoggedComponent';
import './CartComponent.css';

const CartComponent = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  const itemsFromCartFinalOrder = { itemsFromCart, address, phoneNumber, finalPrice, setAddress, setPhoneNumber };

  let itemsFromCartData;

  //ako nije ulogovan mora da unese adresu i br telefona
  
  const itemObjToStore = { item, itemQuantity}

    useEffect(() => {
      console.log("itemsfromcart" + JSON.stringify(itemsFromCart));
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
            dispatch(deleteItem(id));
            Swal.fire(
              'Deleted!',
              'Item has been deleted!',
              'success'
            )
          }
        })
      }
         
      const submitFinalOrder = () =>{
        //moze i bez ove provere za token jer svakako ova metoda se poziva samo nakon unosenja adrese i broja telefona u modalu kada korisnik nije ulogovan
        if((localStorage.token === null || localStorage.token === undefined) && (address.trim() === "" || phoneNumber.trim() === "")){
          alertInvalidInput("Invalid input, please insert address and phone number");
        }
        else if((localStorage.token === null || localStorage.token === undefined) && !isValidNumber(phoneNumber)){
          alertInvalidInput("Invalid phone number or it has less than 5 digits");
        }
        else{
          alertAreYouSureFinalOrder();
        }
      }

      const alertInvalidInput = (message) =>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: message,
        })
      }

      const isValidNumber = (input) => {
        // ^\d{5,}$: Uses a regular expression to ensure that the input consists of at least 5 digits. 
        // Here's a breakdown:
        // ^: Asserts the start of the string.
        // \d{5,}: Matches at least 5 digits (\d is a shorthand for a digit, and {5,} means at least 5 occurrences).
        // $: Asserts the end of the string.
        if(isNaN(input) || /^\d{5,}$/.test(input) === false){
          return false;
        }
        else{
          return true;
        }
      }

      const checkIfLoggedInBeforeSubmit = () =>{
        if(localStorage.token === null || localStorage.token === undefined){
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
      }
    
      const alertAreYouSureFinalOrder = () =>{
        sumFinalPrice();
        setFinalPrice(finalPriceVar);
        let textStr;
        if(localStorage.token === null || localStorage.token === undefined){
          textStr = "Final price is: "+ finalPriceVar.toFixed(2) + " RSD! If you click yes, you will make final order!";
          itemsFromCartData = { itemsFromCart, address, phoneNumber, finalPrice: finalPriceVar};
          
        }
        else{
          textStr = "Final price is: "+ finalPriceVar.toFixed(2) + " RSD (10% OFF)! If you click yes, you will make final order!";
          itemsFromCartData = { itemsFromCart, finalPrice: finalPriceVar};
        }
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
            sendFinalOrderAndHandleRepsonseFromServer(itemsFromCartData);
          }
          else{
            finalPriceVar = 0;
          }
        })
      }

      const sendFinalOrderAndHandleRepsonseFromServer = (finalOrderDetails) =>{
        MealService.sendItemsForFinalOrder(finalOrderDetails).then((response) =>{
          const responseFromServer = response.data;
          //ako je response razlicit od 0, znaci da je uspesno upisan final order i prosledjen id, po defaultu je 0
          if(responseFromServer != 0){
              dispatch(deleteAllItems());
              // bude undefined u stvari, null == undefined ce biti true, null === undefined je false. mogu i proveriti samo sa == null
              if(localStorage.token === null || localStorage.token === undefined){
                handleCloseInsertDetails();
                alertFinalOrderStringCheckInfo(responseFromServer);
              }
              else{
                alertSuccess("Successfully ordered items!");
                setTimeout(() => navigate("/my-active-final-orders"), 1500);
              }     
          }
          else{
            alertInvalidInput("Failed to make final order! Try again!");
          }
        })
      }

      const sumFinalPrice = () =>{
        finalPriceVar = 0;
        if(localStorage.token == null || localStorage.token == ''){
          for(let i=0; i<itemsFromCart.length; i++){
            console.log(itemsFromCart[i].mealPrice);
            finalPriceVar += itemsFromCart[i].mealPrice*itemsFromCart[i].quantity;
          }
        }
        else{
          for(let i=0; i<itemsFromCart.length; i++){
            finalPriceVar += (itemsFromCart[i].mealPrice)*0.9*itemsFromCart[i].quantity;
          }
        }
      }

      const editItemQuantity = () =>{
        dispatch(editItem(itemObjToStore));
        handleCloseEdit();
        alertSuccess("Successfully edited item quantity!");
      }

      const alertSuccess = (message) =>{
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: message,
          showConfirmButton: false,
          timer: 1500
        });
      }

      const alertFinalOrderStringCheckInfo = (finalOrderId) =>{
        let linkStr = "/final-order/"+finalOrderId;
        let textStr = "localhost:3000/final-order/"+finalOrderId;
        Swal.fire({
          title: 'Successfully ordered items! You can check status opening this link',
          icon: 'success',
          html:
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
    <div className='cart-main-container'>
    {itemsFromCart.length !== 0 ? <div className='cart-title'>
      Items from cart
      <svg className='cart-icon-svg-title' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
      </div> 
      : 
      <div className='cart-title'>Cart is empty</div>
    }

    {itemsFromCart.length !== 0 && <div className='cart-container'>
    {
      itemsFromCart.map((itemFromCart) => {
          return(
            <div className='cart-item-container'>
              <div className='item-image-container'>                  
                <img className='item-meal-pic' src={"data:image/png;base64," + itemFromCart.mealImage} alt=''/>                   
              </div> 
              
              <div className='item-info-container'>
                <div className='item-name-container'>
                  <div className='item-name-text'>
                  {itemFromCart.mealName}
                  </div>
                  <div className='item-type-text'>
                    ({itemFromCart.mealTypeName})
                  </div>
                </div>
                <div className='item-description'>
                  {itemFromCart.mealDescription}
                </div>
                <div className='item-price'>
                  {itemFromCart.mealPrice},00 RSD
                </div>
                <div className='item-quantity'>
                  x{itemFromCart.quantity}
                </div>
              </div>

              <div className='item-action-container'>
              <svg className='action-icon-mobile update' onClick={() =>handleShowEdit(itemFromCart)} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>
                <div className='button-icon-container update' onClick={() =>handleShowEdit(itemFromCart)}>
                  <button className='btn-action update' >Update</button>
                  <svg className='action-icon update' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>
                </div>

                <svg className='action-icon-mobile delete' onClick={() => alertAreYouSureDelete(itemFromCart.mealId)} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                <div className='button-icon-container delete' onClick={() => alertAreYouSureDelete(itemFromCart.mealId)}>
                  <button className='btn-action delete' >Delete</button> 
                  <svg className='action-icon delete' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                </div>
              </div>
          </div>
          )
      })
    }

        {itemsFromCart.length !== 0 && <button className="btn-send-final-order" onClick={() => checkIfLoggedInBeforeSubmit()}>
        Send final order
        <svg className='icon-send-final-order' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/></svg>
        </button>}
    </div>}




</div>

    <Modal show={showEdit} onHide={handleCloseEdit} dialogClassName="modalCustomEdit" className="d-flex align-items-center justify-content-center">
        <Modal.Header closeButton>
            <Modal.Title>Edit quantity</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <EditItemQuantityComponent itemFromCart={item} itemQuantity={itemQuantity} setItemQuantity={setItemQuantity} />
        </Modal.Body>

        <Modal.Footer>
            <Button variant="primary" onClick={()=>editItemQuantity()}>Save changes</Button>
            <Button variant="secondary" onClick={handleCloseEdit}>Close</Button>
        </Modal.Footer>
    </Modal> 
  
    <Modal show={showInsertDetails} onHide={handleCloseInsertDetails} dialogClassName="modalCustomInsertDetails" className="d-flex align-items-center justify-content-center">
        <Modal.Header closeButton>
            <Modal.Title>Insert neccessary details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <InsertDetailsNotLoggedComponent details={itemsFromCartFinalOrder} />
        </Modal.Body>

        <Modal.Footer>
            <Button variant="primary" onClick={() => submitFinalOrder()}>Confirm final order</Button>
            <Button variant="secondary" onClick={handleCloseInsertDetails}>Close</Button>
        </Modal.Footer>
    </Modal> 
    </>
  )
}

export default CartComponent