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
// <NavbarComponent/> ovo je bilo pre nego sto sam menjao
//od V6, nema SWITCH, vec je zamenjeno sa ROUTES, component sa element i nije vise {ListUserComponent} vec {<ListUserComponent/>}
function App() {
  return (
    <div>
      <Router>
        <NavbarStyledComponent/>
        <div className='container'>
          <Routes>
            <Route path='/' element = {<ListEmployeeComponent/>}></Route> 
            <Route path='/employees' element = {<ListEmployeeComponent/>}></Route>
            <Route path='/create-employee' element = {<CreateEmployeeComponent/>}></Route>
            <Route path='/edit-employee/:id' element = {<CreateEmployeeComponent/>}></Route>
            <Route path='/registration' element = {<RegistrationComponent/>}></Route>
            <Route path='/login' element = {<LoginComponent/>}></Route>
            <Route path='/my-profile' element = {<MyProfileComponent/>}></Route>
          </Routes>
        </div>
        
        <FooterComponent/>
      </Router>
      
    </div>
  );
}

export default App;
