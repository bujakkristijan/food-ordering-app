import React, {useState, useEffect} from 'react'
import MealService from '../../services/MealService'
import {Link, useNavigate, useParams} from 'react-router-dom'
import Swal from 'sweetalert2'
import './FinalOrderByIdComponent';
import ItemsByFinalOrderIdComponent from './ItemsByFinalOrderIdComponent';
import { Modal, Button } from 'react-bootstrap';

const FinalOrderByIdComponent = () => {

    const {id} = useParams();
    const [orderItemsByFinalOrderId, setOrderItemsByFinalOrderId] = useState([]);
    const [finalOrder, setFinalOrder] = useState({}); // mora {} ne moze null ili undefined
    

    //const orderItemsByFinalOrderIdList = {orderItemsByFinalOrderId}; //nzm jel mora ovako kad hocu da saljem modalu OVAKO NIJE HTELO DA RADI KAD OVO SALJEM MODALU!!!

    const [show, setShow] = useState(false);



    

    useEffect(() => {
        getFinalOrderById(id);
        //alert("FinalOrder kasnije eff" + JSON.stringify(finalOrder));
        console.log(JSON.stringify(finalOrder));
        
    }, [])


    const getFinalOrderById = (id) =>{
        MealService.getFinalOrderById(id).then((response) =>{
            setFinalOrder(response.data);
            //alert("FinalOrder " + JSON.stringify(finalOrder));
            //setOrderItemsByFinalOrderId(response.data.orders);
            // alert("Setovani order itemsi", JSON.stringify(orderItemsByFinalOrderId));
        });
        //alert("FinalOrder kasnije" + JSON.stringify(finalOrder));
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
            alert("ORDER ITEMS SETOVANI" + JSON.stringify(orderItemsByFinalOrderId));
            console.log('s');
        }).catch(error =>{
            console.log(error);
        })
    }




    return (
        <>
        <div className='container'>
        <h2 className='text-center'>Final order with id: {id}</h2>
        <table id="table" className='table table-bordered table-hover'>
            <thead>
                <tr>
                    {/* <th>Order ID</th> */}
                    <th>Address</th>
                    <th>Phone number</th>
                    <th>Final price</th>
                    <th>Status</th>
                    <th>Action</th>
                    

                </tr>
            </thead>
            {/*mora src={"data:image/png;base64," + meal.image}, ne moze samo src={meal.image}  */}
            <tbody>
                    <tr>
                        {/* <td>{finalOrder.id}</td> */}
                        <td>{finalOrder.address}</td>
                        <td>{finalOrder.phoneNumber}</td>  
                        <td>{finalOrder.finalPrice}</td>
                        <td>{finalOrder.status}</td>
                        
                        
                        <td>
                            <button className='btn btn-info' onClick={() => handleShowItemsByFinalOrderId(finalOrder.id)}>Show items</button>
                        </td>

                    </tr>
                
            </tbody>

        </table>

    </div>

    <Modal size='lg' centered show={show} onHide={handleClose}>
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