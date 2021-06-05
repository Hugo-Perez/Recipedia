import React from 'react';
import './Footer.css';

const Footer = () => {
  return(
    <footer id='footer' className='footer py-3 bg-dark'>
      <div className='container d-flex justify-content-between align-items-center flex-wrap'>
          <div className="lead">
            Website made by <a href="https://github.com/Hugo-Perez">
            Hugo Pérez Candal <i className="bi bi-github"/>
            </a>
          </div>

          <div className="lead">
            Follow us on social media:
            <a href="https://www.facebook.com"><i className="bi bi-facebook mx-1"/></a>
            <a href="https://www.twitter.com"><i className="bi bi-twitter mx-1"/></a>
            <a href="https://www.instagram.com"><i className="bi bi-instagram mx-1"/></a>
            <a href="https://www.youtube.com"><i className="bi bi-youtube mx-1"/></a>
          </div>
      </div>
    </footer>
  );
};

export default Footer;
