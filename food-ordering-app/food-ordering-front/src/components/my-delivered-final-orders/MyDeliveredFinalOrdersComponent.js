import MealService from '../../services/MealService'
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Modal, Button } from 'react-bootstrap'
import './MyDeliveredFinalOrdersComponent.css';
import ItemsByFinalOrderIdComponent from '../final-order-by-id/ItemsByFinalOrderIdComponent';
import Moment from 'moment';

const MyDeliveredFinalOrdersComponent = () => {

    const [myDeliveredFinalOrders, setMyDeliveredFinalOrders] = useState([]);
    const [orderItemsByFinalOrderId, setOrderItemsByFinalOrderId] = useState([]);
    const [show, setShow] = useState(false);

    const [activeOrderId, setActiveOrderId] = useState(1);

    useEffect(() => {
      getMyDeliveredFinalOrders();
    }, [])

    const getMyDeliveredFinalOrders = () =>{
        MealService.getMyDeliveredFinalOrders().then(response =>{
            setMyDeliveredFinalOrders(response.data);
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
            setOrderItemsByFinalOrderId(response.data);
            console.log('s');
        }).catch(error =>{
            console.log(error);
        })
    } 

  return (
    <>
    <div className='container-my-order-history'>
            <div className='title-my-order-history'>My order history</div>
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
                    {myDeliveredFinalOrders.map(
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
         {myDeliveredFinalOrders.map(
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
                            <button className='show-items-btn' onClick={() => handleShowItemsByFinalOrderId(activeFinalOrder.id)}>Show items</button>
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
export default MyDeliveredFinalOrdersComponent