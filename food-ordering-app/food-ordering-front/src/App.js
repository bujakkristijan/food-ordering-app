import logo from './logo.svg';
import './App.css';
import ListUserComponent from './components/ListUserComponent';
import NavbarComponent from './components/NavbarComponent';
import FooterComponent from './components/FooterComponent';

function App() {
  return (
    <div>
      <NavbarComponent/>
      <ListUserComponent/>
      <FooterComponent/>
    </div>
  );
}

export default App;
