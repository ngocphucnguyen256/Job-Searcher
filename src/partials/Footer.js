import React from "react";
import Typography from "@mui/material/Typography";

import ScrollToTop from "react-scroll-to-top";

function Footer() {
  return (
    <footer className="footer">
      <ScrollToTop smooth color="#1976d2" />
      <div className="footer__container">
        <Typography
          variant="h1"
          className="company"
          gutterBottom
          component="h1"
        >
          HỆ THỐNG WEBSITE TRUNG GIAN TUYỂN DỤNG VÀ TÌM KIẾM VIỆC LÀM
        </Typography>
      </div>
    </footer>
  );
}

export default Footer;
