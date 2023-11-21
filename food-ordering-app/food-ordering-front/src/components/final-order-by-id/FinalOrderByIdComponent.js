import React, {useState, useEffect} from 'react'
import MealService from '../../services/MealService'
import {Link, useNavigate, useParams} from 'react-router-dom'
import Swal from 'sweetalert2'
import './FinalOrderByIdComponent';
import ItemsByFinalOrderIdComponent from './ItemsByFinalOrderIdComponent';
import { Modal, Button } from 'react-bootstrap';
import Moment from 'moment';
import './FinalOrderByIdComponent.css';


const FinalOrderByIdComponent = () => {

    const {id} = useParams();
    const [orderItemsByFinalOrderId, setOrderItemsByFinalOrderId] = useState([]);
    const [finalOrder, setFinalOrder] = useState({}); // mora {} ne moze null ili undefined
    //const orderItemsByFinalOrderIdList = {orderItemsByFinalOrderId}; //nzm jel mora ovako kad hocu da saljem modalu OVAKO NIJE HTELO DA RADI KAD OVO SALJEM MODALU!!!
    const [show, setShow] = useState(false);

    useEffect(() => {
        getFinalOrderById(id);
        //alert("FinalOrder kasnije eff" + JSON.stringify(finalOrder));
        // console.log(JSON.stringify(finalOrder));    
    }, [])

    const getFinalOrderById = (id) =>{
        MealService.getFinalOrderById(id).then((response) =>{
            setFinalOrder(response.data);
            //alert("FinalOrder " + JSON.stringify(finalOrder));           
            // alert("Setovani order itemsi", JSON.stringify(orderItemsByFinalOrderId));
        });
        // alert("FinalOrder kasnije" + JSON.stringify(finalOrder));      
    }
    
    const handleShowItemsByFinalOrderId = (finalOrderId) => {      
        getOrderItemsByFinalOrderId(finalOrderId);
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
        <div className='container-final-order'>
        <div className='title-id-final-order'>Final order with id: {id}</div>
        {/* <div className='table-responsive-container'>
            <table id="table" className='table table-hover tableElement'>
                <thead className='thead-name'>
                    <tr>          
                        <th className='theadth'>Address</th>
                        <th className='theadth'>Phone number</th>
                        <th className='theadth'>Final price</th>
                        <th className='theadth'>Date and time</th>
                        <th className='theadth'>Status</th>
                        <th className='theadth'>Action</th>
                    </tr>
                </thead>
                <tbody>
                        <tr>
                            <td className='td-content'>{finalOrder.address}</td>
                            <td className='td-content'>{finalOrder.phoneNumber}</td>  
                            <td className='td-content'>{finalOrder.finalPrice},00 RSD</td>
                            <td className='td-content'>{Moment(finalOrder.date).format("YYYY-MM-DD HH:mm:ss") }</td>
                            <td className='td-content'>{finalOrder.status}</td>      
                            <td className='td-content'>
                                <button className='btn-show-items' onClick={() => handleShowItemsByFinalOrderId(finalOrder.id)}>Show items</button>
                            </td>
                        </tr>
                </tbody>
            </table>
        </div> */}

        <div className='final-order-card-container'>
            <div className='info-main-container'>
                <div className='info-container'>
                    <label className='label-desc'>Address:</label>
                    <label className='label-content'>{finalOrder.address}</label>
                </div>
                <div className='info-container'>
                    <label className='label-desc'>Phone:</label>
                    <label className='label-content'>{finalOrder.phoneNumber}</label>
                </div>
                <div className='info-container'>
                    <label className='label-desc'>Price:</label>
                    <label className='label-content'>{finalOrder.finalPrice},00 RSD</label>
                </div>
                <div className='info-container'>
                    <label className='label-desc'>Date:</label>
                    <label className='label-content'>{Moment(finalOrder.date).format("YYYY-MM-DD HH:mm:ss")}</label>
                </div>
                <div className='info-container'>
                    <label className='label-desc'>Status:</label>
                    <label className='label-content'>{finalOrder.status}</label>
                </div>
            </div>
            <div className='action-container'>
                <button className='show-items-btn' onClick={() => handleShowItemsByFinalOrderId(finalOrder.id)}>Show items</button>
            </div>
            
        </div>

    </div>

    <Modal centered show={show} onHide={handleClose} dialogClassName="modalCustomShowItems">
    <Modal.Header closeButton>
        <Modal.Title>Ordered items</Modal.Title>
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

export default FinalOrderByIdComponent