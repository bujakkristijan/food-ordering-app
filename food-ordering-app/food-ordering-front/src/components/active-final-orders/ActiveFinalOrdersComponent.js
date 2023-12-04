import MealService from '../../services/MealService'
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Modal, Button } from 'react-bootstrap'
import './ActiveFinalOrdersComponent.css';
import ItemsByFinalOrderIdComponent from '../final-order-by-id/ItemsByFinalOrderIdComponent';
import {Form} from 'react-bootstrap'
import Moment from 'moment';

export const ActiveFinalOrdersComponent = () => {

    const [allActiveFinalOrders, setAllActiveFinalOrders] = useState([]);
    const [orderItemsByFinalOrderId, setOrderItemsByFinalOrderId] = useState([]);
    const [show, setShow] = useState(false);
    //proba
    const [status, setStatus] = useState('');
    const [activeOrderId, setActiveOrderId] = useState(1);

    let activeOrderIdLet = 0;
    
    const statusOptions = ["ORDERED", "IN PREPARATION", "IN DELIVERY"];

    useEffect(() => {
        getAllActiveFinalOrders();
    }, [])

    const getAllActiveFinalOrders = () =>{
        MealService.getAllActiveFinalOrders().then(response =>{
            setAllActiveFinalOrders(response.data);
        })
    }
    
    const handleShowItemsByFinalOrderId = (finalOrderId) => {
        getOrderItemsByFinalOrderId(finalOrderId);
        setActiveOrderId(finalOrderId);
        setShow(true);
    };

    const handleClose= () => {
        setShow(false);
        setOrderItemsByFinalOrderId([]);
    }

    const getOrderItemsByFinalOrderId = (finalOrderId) =>{
        MealService.getOrderItemsByFinalOrderId(finalOrderId).then((response) =>{
            setOrderItemsByFinalOrderId(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }

    const changeFinalOrderStatus = (activeFinalOrderId, status) =>{
        setStatus(status);
        activeOrderIdLet = activeFinalOrderId; // OVAKO SAM MORAO DA NE PAMTI VREDNOST OD PRETHODNOG
        // setActiveOrderId(activeFinalOrderId); ZASTO PAMTI VREDNOST PRETHODNOG ??? 
        const finalOrderWithStatusAndId = { activeOrderId: activeOrderIdLet, status };
        MealService.changeFinalOrderStatus(finalOrderWithStatusAndId).then((response)=>{
            const responseFromServer = response.data;
            if(responseFromServer === "success"){
                alertSuccess('Successfully changed status!');
                getAllActiveFinalOrders();
                activeOrderIdLet = 0;
            }
            else{
                activeOrderIdLet = 0;
                alertFail();
            }
        })
    }

    const alertAreYouSureDelete = (id) =>{
        Swal.fire({
          title: 'Are you sure?',
          text: `If you click yes, final order with ID: ${id} will be deleted from the database!`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            deleteFinalOrder(id);
          }
        })
      }

      const deleteFinalOrder = (finalOrderId) =>{
        MealService.deleteFinalOrder(finalOrderId).then((response) =>{
            if(response.data === "success"){
                alertSuccess("Successfully deleted final order and all its order items!");
                getAllActiveFinalOrders();
            }
            else if(response.data === "fail"){
                alertFail();
            } 
        }).catch(error => {
            console.log(error);
        })
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

      const alertFail =() =>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'      
        });
      }

  return (
    <>
    <div className='container'>
            <div className='title-active-final-orders'>Active final orders</div>
            <table id='table' className='table table-hover tableElement'>
                <thead className='thead-name'>
                    <tr>
                        <th className='theadth'>ID</th>
                        <th className='theadth'>Address</th>
                        <th className='theadth'>Phone number</th>
                        <th className='theadth'>Date</th>
                        <th className='theadth'>Status</th>
                        <th className='theadth'>Final price</th>
                        <th className='theadth'>Orders</th>
                        {localStorage.role === "EMPLOYEE" && <th className='theadth'>Change status</th>} 
                        {localStorage.role === "ADMIN" && <th className='theadth'>Action</th>}                      
                    </tr>
                </thead>
                {/*mora src={"data:image/png;base64," + meal.image}, ne moze samo src={meal.image}  */}
                <tbody>
                    {allActiveFinalOrders.map(
                        activeFinalOrder => <tr key={activeFinalOrder.id}>
                            <td className='td-content'>{activeFinalOrder.id}</td>
                            <td className='td-content'>{activeFinalOrder.address}</td>
                            <td className='td-content'>{activeFinalOrder.phoneNumber}</td>
                            <td className='td-content'>{Moment(activeFinalOrder.date).format("YYYY-MM-DD HH:mm:ss") }</td>
                            <td className='td-content'>{activeFinalOrder.status}</td>
                            <td className='td-content'>{activeFinalOrder.finalPrice},00</td>                                                     
                            <td className='td-content'>
                                <button className='btn btn-success' style={{whiteSpace: "nowrap"}} onClick={() => handleShowItemsByFinalOrderId(activeFinalOrder.id)}>Show items</button>
                            </td>
                            {localStorage.role === "EMPLOYEE" && <Form.Select className='selectStatus' value={JSON.stringify(activeFinalOrder.status)} onChange={(e)=>changeFinalOrderStatus(activeFinalOrder.id, JSON.parse(e.target.value))}>
                                                {statusOptions.map((statusOption)=> {
                                                return (
                                                    <option className='option' key={activeFinalOrder.id} value={JSON.stringify(statusOption)} >{statusOption}</option>
                                                )
                                                })}                       
                            </Form.Select>}
                            <td className='td-content'>                 
                            {localStorage.role === "ADMIN" && <button className='btn btn-danger' onClick={() => alertAreYouSureDelete(activeFinalOrder.id)}
                                style={{marginLeft:"5px"}}>Delete</button>}
                            </td>     
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

        <Modal size='lg' centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Ordered items for id: {activeOrderId}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <ItemsByFinalOrderIdComponent orderItemsList = {orderItemsByFinalOrderId}/>
        </Modal.Body>

        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
        </Modal>
        </>
  )
}
