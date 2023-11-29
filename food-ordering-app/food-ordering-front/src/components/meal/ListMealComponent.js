import MealService from '../../services/MealService'
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Modal, Button } from 'react-bootstrap'
import CreateMealComponent from './CreateMealComponent'
import EditMealComponent from './EditMealComponent';
import './ListMealComponent.css';
import UserService from '../../services/UserService';

const ListMealComponent = () => {

    const [meals, setMeals] = useState([]);
    const fd =  new FormData();

    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [imageName, setImageName] = useState('');

    // ovo treba na bolji nacin, a ne ovako, mada ako se ne brise iz baze ovaj meal type, radice okej
    // const [mealType, setMealType] = useState({id: 1, typeName: 'PIZZA'});
    const [mealType, setMealType] = useState(undefined);

    const [description, setDescription] = useState('');

    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const [selectedFile, setSelectedFile] = useState(undefined);

    const file = {selectedFile, setSelectedFile};

    const meal = {id, name, price, image, imageName, mealType, description, setDescription, setName, setPrice, setImage, setImageName, setMealType}

    useEffect(() => {
        getAllMeals();
    }, [])
    
    const getAllMeals = () =>{
        MealService.getAllMeals().then((response) =>{
            setMeals(response.data);
            if(response.data[0].mealType) setMealType(response.data[0].mealType);
        }).catch(error =>{
            console.log(error);
        })
    }

    const handleClose = () => {
        setShow(false);
        meal.setName('');
        meal.setPrice('');
        meal.setDescription('');
        meal.setMealType(meals[0].mealType);
        // meal.setMealType({id: 1, typeName: 'PIZZA'});
        }

    const handleCloseEdit = () => {
        setShowEdit(false);
        //meal.setId(0);
        meal.setName('');
        meal.setPrice('');
        meal.setDescription('');
        meal.setMealType(meals[0].mealType);
        // meal.setMealType({id: 1, typeName: 'PIZZA'});
        }
    const handleShow = () => {
        setShow(true);
        setId(null); //mora ovako da se setuje, kada se vrsi izmena, nakon toga zapamti id od starog pa radi izmenu
    };

    const handleShowEdit = (meal) => {
        setShowEdit(true);
        setId(meal.id);
        setName(meal.name);
        setPrice(meal.price);
        setMealType(meal.mealType);
        setDescription(meal.description);
    };

    const handleSubmitEdit = () => {
        if(meal.name.trim() === "" || isNaN(parseInt(meal.price)) || parseInt(meal.price) < 0){
            alert("Invalid input");
        }
        MealService.updateMeal(meal).then((response) =>{
            const responseFromServer = response.data;
            if(responseFromServer === "success"){
                alert("Uspesno editovano");
                handleCloseEdit();
                getAllMeals();  
            }
            else if(responseFromServer === "invalid"){
                alert("Invalid input");
            }
            else if(responseFromServer === "fail"){
                alert("Failed to edit meal");
            }
        }) 
    }

    const handleSubmit = () => {
        if(meal.name.trim() === "" || meal.description.trim() === "" || isNaN(parseInt(meal.price)) || parseInt(meal.price) < 0){
            alert("Invalid input");
        }
        else{
            if(selectedFile != null && selectedFile != undefined){
                fd.append('image', selectedFile);
                fd.append('meal', JSON.stringify(meal));
                console.log("Selected fileeee" + selectedFile);
            }
            else{
                //mora img da ima, jer nece na back-u da se nastavi zahtev je ne sadrzi sliku. Morao bih verovatno drugi api endpoint da gadjam kad nema sliku
                fd.append('image', selectedFile);
                fd.append('meal', JSON.stringify(meal));
            }
                MealService.createMeal(fd).then((response) =>{
                    const responseFromServer = response.data;
                    if(responseFromServer === "success"){
                        alert("Successfully added meal!");
                        handleClose();
                        getAllMeals(); 
                    }
                    else if(responseFromServer === "invalid"){
                        alert("Invalid input")
                    }
                    else if(responseFromServer === "fail"){
                        alert("Failed to add new meal")
                    }
                })
            }

    }


    const deleteMeal = (mealId) =>{
        MealService.deleteMeal(mealId).then((response) =>{
            if(response.data === "success"){
                alert("Succesfully deleted meal!");
                getAllMeals();
            }
            else if(response.data === "fail"){
                alert("Failed to delete meal!");
            }     
        }).catch(error => {
            console.log(error);
        })
    }

    const alertAreYouSureDelete = (id) =>{
          Swal.fire({
            title: 'Are you sure?',
            text: "If you click yes, meal will be deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              deleteMeal(id);
            }
          })
        }

  return (
    <>
    <div className='container'>
            <h2 className='text-center'>Meal list</h2>
            <button className="btn btn-success mb-2" onClick={handleShow}>Create new meal</button>
            <table id="table" className='table table-hover tableElement'>
                <thead className='thead-name'>
                    <tr>
                        <th className='theadth'>Meal ID</th>
                        <th className='theadth'>Image</th>
                        <th className='theadth'>Name</th>
                        <th className='theadth'>Type</th>
                        <th className='theadth'>Description</th>
                        <th className='theadth'>Price</th>
                        <th className='theadth'>Action</th>
                    </tr>
                </thead>
                {/*mora src={"data:image/png;base64," + meal.image}, ne moze samo src={meal.image}  */}
                <tbody>
                    {meals.map(
                        meal => <tr key={meal.id}>
                            <td className='td-content'>{meal.id}</td>
                            <td className='td-content-pic'>
                              <img className='mealPic' src={"data:image/png;base64," + meal.image} alt=''/> 
                            </td>  
                            <td className='td-content'>{meal.name}</td>
                            <td className='td-content'>{meal.mealType.typeName}</td>
                            <td className='td-content'>{meal.description}</td>
                            <td className='td-content'>{meal.price}</td>                         
                            <td className='td-content'>
                                <button className='btn btn-success' onClick={() =>handleShowEdit(meal)}>Update</button>
                                <button className='btn btn-danger' onClick={() => alertAreYouSureDelete(meal.id)}
                                    style={{ marginLeft: "5px" }}>Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

        <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create new meal</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <CreateMealComponent meal={meal} file = {file}/>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleSubmit}>Save changes</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit meal</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <EditMealComponent meal={meal} file = {file}/>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEdit}>Close</Button>
                    <Button variant="primary" onClick={handleSubmitEdit}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        </>
  )
}

export default ListMealComponent