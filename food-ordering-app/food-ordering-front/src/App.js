import logo from './logo.svg';
import './App.css';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import NavbarComponent from './components/NavbarComponent';
import FooterComponent from './components/FooterComponent';
/*import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; */
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';

//od V6, nema SWITCH, vec je zamenjeno sa ROUTES, component sa element i nije vise {ListUserComponent} vec {<ListUserComponent/>}
function App() {
  return (
    <div>
      <Router>
        <NavbarComponent/>
        <div className='container'>
          <Routes>
            <Route path='/' element = {<ListEmployeeComponent/>}></Route> 
            <Route path='/employees' element = {<ListEmployeeComponent/>}></Route>
            <Route path='/create-employee' element = {<CreateEmployeeComponent/>}></Route>
            <Route path='/edit-employee/:id' element = {<CreateEmployeeComponent/>}></Route>
          </Routes>
        </div>
        
        <FooterComponent/>
      </Router>
      
    </div>
  );
}

export default App;
