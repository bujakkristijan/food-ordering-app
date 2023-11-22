import React, {useState, useEffect} from 'react'
import MealService from '../../services/MealService'
import { Modal, Button } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom';
import MealQuantityComponent from './MealQuantityComponent';
import { addItem } from '../../store-redux/cart/cartSlice';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import './ListMealByMealTypeComponent.css';

const ListMealByMealTypeComponent = () => {

    const {mealTypeId} = useParams();

    const [meals, setMeals] = useState([]);

    const [mealQuantity, setMealQuantity] = useState(1);
    
    const [show, setShow] = useState(false);

    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [mealType, setMealType] = useState(undefined);
    const [imageName, setImageName] = useState('');

    const [description, setDescription] = useState('');

    const meal = {id, name, mealType, price, image};
    // const meal = {id, name, price, image};

    // const orderItem = {mealFromCartDTO, quantity: mealQuantity};
    //const orderItem = {meal, quantity: mealQuantity};
     
    const mealQuantityObj = {mealQuantity, setMealQuantity};

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [dataFetchingComplete, setDataFetchingComplete] = useState(false);

    useEffect(() => {
        getMealsByMealTypeId();
    }, [])

    const handleShowMealQuantity = (meal) => {   
        //mora ovako da se setuje, kada se vrsi izmena, nakon toga zapamti id od starog pa radi izmenu
        setId(meal.id);
        setName(meal.name);
        setPrice(meal.price);
        // treba setMealType(meal.mealType) umesto setMealType(meal.mealType.typeName); ukoliko hocu da citam i mealType
        // u tabeli na front-u, jer posle kada se salje na server-u, ne moze da parsira typeName sto dobije, pa bude bad request
        // ili da menjam logiku na back-u za model, mada onda bi se sve zapetljalo
        // bolje resenje bi bilo da ne saljem objekte vec varijable, jer se posle ulancaju objekti
        // i dosta nepotrebnih podataka se salje
        setMealType(meal.mealType)
        // setMealType(meal.mealType.typeName);
        setImage(meal.image);
        setImageName(meal.imageName);
        setDescription(meal.description);
        setMealQuantity(1);
        setShow(true); 
    };

    const handleClose = () => {
        setShow(false);
        setId(null);
        setName('');
        setPrice('');
        setImage('');
        setImageName('');
        setDescription('');
        setMealType(undefined);
        setMealQuantity(1);
        }

    const getMealsByMealTypeId = () =>{
        MealService.getMealsByMealTypeId(mealTypeId).then((response)=>{
            setMeals(response.data);
            setDataFetchingComplete(true);
            console.log("meals" + JSON.stringify(response.data));
        }).catch(error => {
            console.log(error);
        })
    }

    const handleAddItemToCart = () =>{    
        // console.log("orderitem" + JSON.stringify(orderItem));
        let orderItem = {mealId: id, mealName: name, mealTypeName: mealType.typeName, mealDescription: description, mealImage: image, mealImageName: imageName, mealPrice: price, quantity: mealQuantity};
        if(orderItem.quantity>0){
            dispatch(addItem(orderItem));
            alertSuccess('Successfully added item to cart!');
            setTimeout(() => handleClose(), 1500) ;
        }
        else{
            alertInvalidInput('Invalid input, quantity must be positve number!');
        }
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

      const alertInvalidInput = (message) =>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: message  
        });
      }

      const navigateToCart = () =>{
        navigate("/cart");
      }

  return (
    <> 
    {dataFetchingComplete && meals.length === 0 && <div className='title-empty-meal-type'>Sorry, there are no offers for this category</div>}
    {meals.length !== 0 && <div className='container-meal-by-meal-type'>
            <div className='meal-type-title'>
                    <div className='meal-type-title-text'>
                        <div className='meal-type-title-desc'>Category: </div>
                        {meals[0].mealType.typeName}
                    </div>
                </div>

            <div className='container-meals-by-meal-type'>
                {
                    meals.map((meal) => {
                        return(
                            <div className='card-meals-by-meal-type' key={meal.id}>   
                                <img className='image' src={"data:image/png;base64," + meal.image} alt=''></img>     
                                <div className='name-container'>
                                    <h4 className='name-content'>{meal.name}</h4>
                                </div>
                                <div className='meal-info-container'>
                                    {/* <div>{meal.mealType.typeName}</div> */}
                                    <div className='meal-description'>{meal.description}</div>
                                    <div className='meal-price'>{meal.price},00 RSD</div>
                                </div>
                                <button className='btn-add-to-cart' onClick={() =>handleShowMealQuantity(meal)}>
                                    Add to cart
                                    <svg className='cart-icon-svg' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
                                </button>
                            </div>
                        )
                    })
                }
            </div>

            <button className="btn-go-to-cart" onClick={navigateToCart}>
                Go to cart
                <svg className='cart-icon' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
            </button> 
        </div>}

        <Modal show={show} onHide={handleClose} dialogClassName="modalCustomInsert" className="d-flex align-items-center justify-content-center">
        <Modal.Header closeButton>
            <Modal.Title>Insert quantity</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <MealQuantityComponent meal = {meal} mealQuantity = {mealQuantityObj} />
        </Modal.Body>

        <Modal.Footer>
            <Button variant="primary" onClick={() => handleAddItemToCart()}>Confirm</Button> 
            <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
        </Modal>
        </>

  )
}

export default ListMealByMealTypeComponent