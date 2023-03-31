import React, {useEffect} from 'react'

const ItemsByFinalOrderIdComponent = (props) => {

    const orderItems = props.orderItemsList;

  return (
    <div className='container'>     
            <table id="table" className='table table-bordered table-hover'>
                <thead>
                    <tr>
                        <th>Meal name</th>
                        <th>Meal type</th>
                        <th>Price for one</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                {/*mora src={"data:image/png;base64," + meal.image}, ne moze samo src={meal.image}  */}
                <tbody>
                    {orderItems.map(
                        orderItem => <tr key={orderItem.meal.id}>
                            <td>{orderItem.meal.name}</td>
                            <td>{orderItem.meal.mealType.typeName}</td>
                            <td>{orderItem.meal.price}</td>
                            <td>{orderItem.quantity}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
  )
}

export default ItemsByFinalOrderIdComponent