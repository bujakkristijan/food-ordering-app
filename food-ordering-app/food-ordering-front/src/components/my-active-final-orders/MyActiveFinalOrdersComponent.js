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
    <div className='container'>
            <h2 className='text-center'>My active final orders</h2>
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
                    </tr>
                </thead>
                {/*mora src={"data:image/png;base64," + meal.image}, ne moze samo src={meal.image}  */}
                <tbody>
                    {myActiveFinalOrders.map(
                        activeFinalOrder => <tr key={activeFinalOrder.id}>
                            <td className='td-content'>{activeFinalOrder.id}</td>
                            <td className='td-content'>{activeFinalOrder.address}</td>
                            <td className='td-content'>{activeFinalOrder.phoneNumber}</td>
                            <td className='td-content'>{Moment(activeFinalOrder.date).format("YYYY-MM-DD HH:mm:ss") }</td>
                            <td className='td-content'>{activeFinalOrder.status}</td>
                            <td className='td-content'>{activeFinalOrder.finalPrice}</td>                         
                            <td className='td-content'>
                                <button className='btn btn-success' onClick={() => handleShowItemsByFinalOrderId(activeFinalOrder.id)}>Show items</button>
                            </td>
                            {/* <td className='td-content'>
                                <button className='btn btn-success' onClick={() => setFinalOrderToDelivered(activeFinalOrder.id)}>Click if delivered</button>
                            </td> */}
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
export default MyActiveFinalOrdersComponent