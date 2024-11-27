import React from "react";
import { BsCalendar2CheckFill, BsFillPersonFill } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black">
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <BsCalendar2CheckFill className="" />
        </a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link text-white" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/about">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/services">
                Services
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/contact">
                Contact
              </a>
            </li>
          </ul>

          <div className="dropdown">
            <button
              className="btn btn-light dropdown-toggle border-0 bg-black text-white d-flex align-items-center"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
            >
              <BsFillPersonFill className="me-2" />
              Demo
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="dropdownMenuButton"
            >
              <li>
                <a className="dropdown-item" href="/logout">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
