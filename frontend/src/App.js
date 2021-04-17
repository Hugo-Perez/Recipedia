import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router } from "react-router-dom";

import Auth from "./utils/auth";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PublicSwitch from "./components/PublicSwitch";
import PrivateSwitch from "./components/PrivateSwitch";

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
      <div className="content container">
        {currentUser ? <PublicSwitch /> : <PrivateSwitch />}
      </div>
      <Footer />
    </Router>
  );
};

export default App;
