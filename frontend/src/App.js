import logo from './logo.svg';
import './App.css';

import { 
  BrowserRouter as Router, 
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Signin from './components/Signin';
import Signup from './components/Signup';

const App = () => {
  return (
    <Router>
      <Navbar/>
      <div className="content container">
        <Switch>
          <Route path='/home'>
            <Home/>
          </Route>
          <Route path='/signin'>
            <Signin/>
          </Route>
          <Route path='/signup'>
            <Signup/>
          </Route>
          { /* Fallback path */ }
          <Redirect to="/home" />
        </Switch>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
