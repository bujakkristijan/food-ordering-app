import logo from './logo.svg';
import './App.css';
import ListUserComponent from './components/ListUserComponent';
import NavbarComponent from './components/NavbarComponent';
import FooterComponent from './components/FooterComponent';
/*import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; */
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

//od V6, nema SWITCH, vec je zamenjeno sa ROUTES, component sa element i nije vise {ListUserComponent} vec {<ListUserComponent/>}
function App() {
  return (
    <div>
      <Router>
        <NavbarComponent/>
        <div className='container'>
          <Routes>
            <Route path='/' element = {<ListUserComponent/>}></Route> 
            <Route path='/users' element = {<ListUserComponent/>}></Route>
          </Routes>
        </div>
        
        <FooterComponent/>
      </Router>
      
    </div>
  );
}

export default App;
