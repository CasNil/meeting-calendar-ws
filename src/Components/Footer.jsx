import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer
      className="footer mt-auto bg-black text-white py-2 text-center"
      style={{ position: "absolute", bottom: 0, width: "100%" }}
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
