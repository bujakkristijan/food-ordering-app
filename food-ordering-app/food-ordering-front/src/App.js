import './App.css';
import { useEffect } from 'react';
import ListEmployeeComponent from './components/employee/ListEmployeeComponent';
import RegistrationComponent from './components/registration/RegistrationComponent';
import FooterComponent from './components/footer/FooterComponent';
/*import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; */
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import CreateEmployeeComponent from './components/employee/CreateEmployeeComponent';
import LoginComponent from './components/login/LoginComponent';
import MyProfileComponent from './components/my-profile/MyProfileComponent';
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
import jwtDecode from 'jwt-decode';
import { Navigate } from 'react-router-dom';
import NavbarComponent from './components/navbar/NavbarComponent';
//od V6, nema SWITCH, vec je zamenjeno sa ROUTES, component sa element i nije vise {ListUserComponent} vec {<ListUserComponent/>}
const PrivateRoute = ({ element, allowedRoles }) => {
  const userRole = localStorage.getItem('role');
  const navigate = useNavigate();
  
  useEffect(() => {
    checkIsTokenValid();
  }, []);

  const checkIsTokenValid = () => {
    if (localStorage.token) {
      try {
        const decodedToken = jwtDecode(localStorage.token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          console.log('Token is expired');
          localStorage.clear();
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.clear();
      }
    }
  };

  if (!localStorage.token || !allowedRoles.includes(userRole)) {
    return <p style={{ textAlign: "center", fontSize: "26px", fontWeight: "500"}}>You do not have permission to access this page.</p>;
  }

  // Render the protected component
  return element;
};

function App() {
  return (
    <>
      <Router>
        <NavbarComponent/>
        <div className="router-view">
          <Routes>
            <Route path="/" element={<LoginComponent />} />
            <Route path="/employees" element={<PrivateRoute element={<ListEmployeeComponent />} allowedRoles={['ADMIN']} />} />
            <Route path="/create-employee" element={<PrivateRoute element={<CreateEmployeeComponent />} allowedRoles={['ADMIN']} />} />
            <Route path="/edit-employee/:id" element={<PrivateRoute element={<CreateEmployeeComponent />} allowedRoles={['ADMIN']} />} />
            <Route path="/registration" element={<RegistrationComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/my-profile" element={<PrivateRoute element={<MyProfileComponent />} allowedRoles={['USER']} />} />
            <Route path="/meals" element={<PrivateRoute element={<ListMealComponent />} allowedRoles={['ADMIN']} />} />
            <Route path="/menu" element={<MenuMealTypeComponent />} />
            <Route path="/meal-types" element={<PrivateRoute element={<ListMealTypeComponent />} allowedRoles={['ADMIN']} />} />
            <Route path="/meals-by-meal-type/:mealTypeId" element={<ListMealByMealTypeComponent />} />
            <Route path="/cart" element={<CartComponent />} />
            <Route path="/final-order/:id" element={<FinalOrderByIdComponent />} />
            <Route path="/active-final-orders" element={<PrivateRoute element={<ActiveFinalOrdersComponent />} allowedRoles={['ADMIN', 'EMPLOYEE']} />} />
            <Route path="/my-active-final-orders" element={<PrivateRoute element={<MyActiveFinalOrdersComponent />} allowedRoles={['USER']} />} />
            <Route path="/my-delivered-final-orders" element={<PrivateRoute element={<MyDeliveredFinalOrdersComponent />} allowedRoles={['USER']} />} />
            <Route path="/order-history" element={<PrivateRoute element={<OrderHistoryComponent />} allowedRoles={['ADMIN', 'EMPLOYEE']} />} />
            <Route path="/users" element={<PrivateRoute element={<ListUserComponent />} allowedRoles={['ADMIN']} />} />
          </Routes>
        </div>
        <FooterComponent />
      </Router>
    </>
  );
}
export default App;
