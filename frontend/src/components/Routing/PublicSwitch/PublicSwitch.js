import React from 'react';
import './PublicSwitch.css';

import { 
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Welcome from '../../Welcome';
import Signin from '../../Signin';
import Signup from '../../Signup';

const PublicSwitch = () => {
  return(
    <Switch>
    { /* Public routes */ }
    <Route path='/home'>
      <Welcome/>
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
