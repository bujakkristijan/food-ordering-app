import MealService from '../../services/MealService'
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Modal, Button } from 'react-bootstrap'
import './MyActiveFinalOrdersComponent.css';
import ItemsByFinalOrderIdComponent from '../final-order-by-id/ItemsByFinalOrderIdComponent';
import Moment from 'moment';

const MyActiveFinalOrdersComponent = () => {

    const [myActiveFinalOrders, setMyActiveFinalOrders] = useState([]);
    const [orderItemsByFinalOrderId, setOrderItemsByFinalOrderId] = useState([]);
    const [show, setShow] = useState(false);

    const [activeOrderId, setActiveOrderId] = useState(1);

    useEffect(() => {
      getMyActiveFinalOrders();
    }, [])

    const getMyActiveFinalOrders = () =>{
        MealService.getMyActiveFinalOrders().then(response =>{
            setMyActiveFinalOrders(response.data);
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
            //alert("RESPONSE ORDER ITEMS " + JSON.stringify(response.data));
            setOrderItemsByFinalOrderId(response.data); //ZASTO NE RADIIII OVO SRANJEEEE       
            console.log('s');
        }).catch(error =>{
            console.log(error);
        })
    }

  return (
    <>
    <div className='container-my-active-final-orders'>
            <div className='title-my-active-final-orders'>My active final orders</div>
            {/* <table id='table' className='table table-hover tableElement'>
                <thead className='thead-name'>
                    <tr>
                        <th className='theadth'>ID</th>
                        <th className='theadth'>Address</th>
                        <th className='theadth'>Phone number</th>
                        <th className='theadth'>Date</th>
                        <th className='theadth'>Status</th>
                        <th className='theadth'>Final price</th>
                        <th className='theadth'>Orders</th>
                    </tr>
                </thead>
                <tbody>
                    {myActiveFinalOrders.map(
                        activeFinalOrder => <tr key={activeFinalOrder.id}>
                            <td className='td-content'>{activeFinalOrder.id}</td>
                            <td className='td-content'>{activeFinalOrder.address}</td>
                            <td className='td-content'>{activeFinalOrder.phoneNumber}</td>
                            <td className='td-content'>{Moment(activeFinalOrder.date).format("YYYY-MM-DD HH:mm:ss") }</td>
                            <td className='td-content'>{activeFinalOrder.status}</td>
                            <td className='td-content'>{activeFinalOrder.finalPrice},00 RSD</td>                         
                            <td className='td-content'>
                                <button className='btn btn-success' onClick={() => handleShowItemsByFinalOrderId(activeFinalOrder.id)}>Show items</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table> */}
        <div className='final-order-main-container'>
         {myActiveFinalOrders.map(
                        activeFinalOrder => <div className='final-order-card-container' key={activeFinalOrder.id}>
                    <div className='info-main-container'>
                        <div id='idcont' className='info-container id'>
                            <label className='label-desc'>ID:</label>
                            <label className='label-content'>{activeFinalOrder.id}</label>
                        </div>
                        <div className='info-container'>
                            <label className='label-desc'>Address:</label>
                            <label className='label-content'>{activeFinalOrder.address}</label>
                        </div>
                        <div id="phonenumbercont" className='info-container phone-number'>
                            <label className='label-desc'>Phone:</label>
                            <label className='label-content'>{activeFinalOrder.phoneNumber}</label>
                        </div>
                        <div id="finalpricecont" className='info-container final-price'>
                            <label className='label-desc'>Price:</label>
                            <label className='label-content'>{activeFinalOrder.finalPrice},00 RSD</label>
                        </div>
                        <div id="datecont" className='info-container date'>
                            <label className='label-desc'>Date:</label>
                            <label className='label-content'>{Moment(activeFinalOrder.date).format("YYYY-MM-DD HH:mm:ss")}</label>
                        </div>
                        <div id="statuscont" className='info-container status'>
                            <label className='label-desc'>Status:</label>
                            <label className='label-content'>{activeFinalOrder.status}</label>
                        </div>
                    </div>
                        <div className='action-container'>
                            <button className='show-items-btn' onClick={() => handleShowItemsByFinalOrderId(activeFinalOrder.id)}>
                                Show items
                                <svg className='show-items-icon' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M64 144a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM64 464a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm48-208a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z"/></svg>
                            </button>
                            
                        </div>
                </div>
            )}
        </div>
        
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
export default MyActiveFinalOrdersComponent