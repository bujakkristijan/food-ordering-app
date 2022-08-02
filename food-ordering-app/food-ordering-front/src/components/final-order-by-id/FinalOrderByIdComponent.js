import React, {useState, useEffect} from 'react'
import MealService from '../../services/MealService'
import {Link, useNavigate, useParams} from 'react-router-dom'
import Swal from 'sweetalert2'
import './FinalOrderByIdComponent';

const FinalOrderByIdComponent = () => {

    const {id} = useParams();
    const [finalOrder, setFinalOrder] = useState({}); // mora {} ne moze null ili undefined

    useEffect(() => {
        getFinalOrderById();
    }, [])


    const getFinalOrderById = () =>{
        MealService.getFinalOrderById(id).then((response) =>{
            setFinalOrder(response.data);
        });
    }
    
    return (
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
                            <button className='btn btn-info' >Show items</button>
                        </td>

                    </tr>
                
            </tbody>

        </table>

    </div>
  )
}

export default FinalOrderByIdComponent