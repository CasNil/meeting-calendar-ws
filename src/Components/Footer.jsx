import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer
      className="footer bg-black text-white py-2 text-center"
      style={{ marginTop: "auto" }}
    >
      <div className="container">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} Meeting Calendar All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
