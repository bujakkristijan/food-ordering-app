import logo from './logo.svg';
import './App.css';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import RegistrationComponent from './components/registration/RegistrationComponent';
import FooterComponent from './components/FooterComponent';
/*import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; */
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import NavbarStyledComponent from './components/Navbar/NavbarStyledComponent';
import LoginComponent from './components/login/LoginComponent';
import MyProfileComponent from './components/My-profile/MyProfileComponent';
import ListMealComponent from './components/meal/ListMealComponent';
import MenuMealTypeComponent from './components/menu/MenuMealTypeComponent';
import ListMealTypeComponent from './components/meal-type/ListMealTypeComponent';
import ListMealByMealTypeComponent from './components/meals-by-meal-type/ListMealByMealTypeComponent';
import CartComponent from './components/cart/CartComponent';
import FinalOrderByIdComponent from './components/final-order-by-id/FinalOrderByIdComponent';
import { ActiveFinalOrdersComponent } from './components/active-final-orders/ActiveFinalOrdersComponent';
import MyActiveFinalOrdersComponent from './components/my-active-final-orders/MyActiveFinalOrdersComponent';
import OrderHistoryComponent from './components/order-history/OrderHistoryComponent';
import MyDeliveredFinalOrdersComponent from './components/my-delivered-final-orders/MyDeliveredFinalOrdersComponent';
import ListUserComponent from './components/user/ListUserComponent';
// <NavbarComponent/> ovo je bilo pre nego sto sam menjao
//od V6, nema SWITCH, vec je zamenjeno sa ROUTES, component sa element i nije vise {ListUserComponent} vec {<ListUserComponent/>}
function App() {
  const role = localStorage.role;
  return (
    // <div className='container-main'>
      <Router>
        <NavbarStyledComponent/>
        <div className='router-view'>
         
          <Routes>
            <Route path='/' element = {<LoginComponent/>}></Route> 
            <Route path='/employees' element = {<ListEmployeeComponent/>}></Route>
            {role==="ADMIN" && <Route path='/create-employee' element = {<CreateEmployeeComponent/>}/>}
            <Route path='/edit-employee/:id' element = {<CreateEmployeeComponent/>}></Route>
            <Route path='/registration' element = {<RegistrationComponent/>}></Route>
            <Route path='/login' element = {<LoginComponent/>}></Route>
            <Route path='/my-profile' element = {<MyProfileComponent/>}></Route>
            <Route path='/meals' element = {<ListMealComponent/>}></Route>
            <Route path='/menu' element = {<MenuMealTypeComponent/>}></Route>
            <Route path='/meal-types' element = {<ListMealTypeComponent/>}></Route>
            <Route path='/meals-by-meal-type/:mealTypeId' element = {<ListMealByMealTypeComponent/>}></Route>
            <Route path='/cart' element = {<CartComponent/>}></Route>
            <Route path='/final-order/:id' element = {<FinalOrderByIdComponent/>}></Route>
            <Route path='/active-final-orders' element = {<ActiveFinalOrdersComponent/>}></Route>
            <Route path='/my-active-final-orders' element = {<MyActiveFinalOrdersComponent/>}></Route>
            <Route path='/my-delivered-final-orders' element = {<MyDeliveredFinalOrdersComponent/>}></Route>
            <Route path='/order-history' element = {<OrderHistoryComponent/>}></Route>
            <Route path='/users' element = {<ListUserComponent/>}></Route>

          </Routes>
        </div>
        
        <FooterComponent/>
      </Router>
      
    // </div>
  );
}

export default App;
