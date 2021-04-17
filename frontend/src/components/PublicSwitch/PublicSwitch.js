import React from 'react';
import './PublicSwitch.css';

import { 
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Home from '../Home';
import Signin from '../Signin';
import Signup from '../Signup';

const PublicSwitch = () => {
  return(
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

    { /* Fallback path */ }
    <Redirect to="/home" />
  </Switch>
  );
};

export default PublicSwitch;
