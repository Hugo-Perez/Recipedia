import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router } from "react-router-dom";

import Auth from "./utils/auth";

import Navbar from "./components/Routing/Navbar";
import PublicSwitch from "./components/Routing/PublicSwitch";
import PrivateSwitch from "./components/Routing/PrivateSwitch";
import Footer from "./components/Footer";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = Auth.getCurrentUser();

    if (user) setCurrentUser(user);
  }, []);

  const logOut = () => {
    Auth.logout();
    window.location.reload();
  };

  return (
    <Router>
      <Navbar />
      <div className='content container-fluid'>
        {currentUser ? <PrivateSwitch logOut={logOut} /> : <PublicSwitch />}
      </div>
      <Footer />
    </Router>
  );
};

export default App;
