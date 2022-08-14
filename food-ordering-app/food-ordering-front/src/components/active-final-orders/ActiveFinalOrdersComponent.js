import MealService from '../../services/MealService'
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Modal, Button } from 'react-bootstrap'
import './ActiveFinalOrdersComponent.css';

export const ActiveFinalOrdersComponent = () => {

    const [allActiveFinalOrders, setAllActiveFinalOrders] = useState([]);


    useEffect(() => {
      getAllActiveFinalOrders();
    }, [])

    const getAllActiveFinalOrders = () =>{
        MealService.getAllActiveFinalOrders().then(response =>{
            setAllActiveFinalOrders(response.data);
        })
    }
    
  return (
    <div className='container'>
            <h2 className='text-center'>Active final orders</h2>
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
                        <th className='theadth'>Action</th>
                        

                    </tr>
                </thead>
                {/*mora src={"data:image/png;base64," + meal.image}, ne moze samo src={meal.image}  */}
                <tbody>
                    {allActiveFinalOrders.map(
                        activeFinalOrder => <tr key={activeFinalOrder.id}>
                            <td className='td-content'>{activeFinalOrder.id}</td>
                            <td className='td-content'>{activeFinalOrder.address}</td>
                            <td className='td-content'>{activeFinalOrder.phoneNumber}</td>
                            <td className='td-content'>{activeFinalOrder.date}</td>
                            <td className='td-content'>{activeFinalOrder.status}</td>
                            <td className='td-content'>{activeFinalOrder.finalPrice}</td>
                            
                            
                            <td className='td-content'>
                                <button className='btn btn-info' >Show orders</button>
                            </td>
                            <td className='td-content'>
                                <button className='btn btn-success' >Click if delivered</button>
                            </td>

                        </tr>
                    )}
                </tbody>

            </table>

        </div>

  )
}
