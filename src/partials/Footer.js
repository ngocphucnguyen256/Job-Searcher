import React from 'react';
import { Link } from 'react-router-dom';
import ScrollToTop from "react-scroll-to-top";

function Footer() {
  return (
    <footer className="footer">
      <ScrollToTop smooth color="#1976d2" />
      <div className="footer__container">
        <h2>Job Searcher</h2>
        <p>Kết nối với chúng tôi</p>
      </div>
    </footer>
  );
}

export default Footer;
