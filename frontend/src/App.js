import logo from './logo.svg';
import './App.css';

import { 
  BrowserRouter as Router, 
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Auth from './utils/auth';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Signin from './components/Signin';
import Signup from './components/Signup';

const App = () => {

  const logOut = () => {
    Auth.logout();
    window.location.reload();
  };

  return (
    <Router>
      <Navbar/>
      <div className="content container">
        <Switch>
          { /* Public routes */ }
          <Route path='/home'>
            <Home/>
          </Route>
          <Route path='/signin'>
            <Signin/>
          </Route>
          <Route path='/signup'>
            <Signup/>
          </Route>
          { /* Logged in routes */ }

          { /* Fallback path */ }
          <Redirect to="/home" />
        </Switch>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
