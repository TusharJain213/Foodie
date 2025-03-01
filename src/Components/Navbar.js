import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";

const Navbar = () => {
  let data = useCart();
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <Link className="navbar-brand fs-1 fst-italic" to="/">
          Foodie
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item">
              <Link className="nav-link active fs-5" to="/">
                Home <span className="sr-only"></span>
              </Link>
            </li>
          </ul>
          {localStorage.getItem("authToken") ? (
            <div>
              <div
                className="btn bg-white text-success mx-2"
                onClick={() => {
                  setCartView(true);
                }}
              >
                My Cart{" "}
                {data.length === 0 ? (
                  ""
                ) : (
                  <Badge pill bg="danger">
                    {" "}
                    {data.length}{" "}
                  </Badge>
                )}
              </div>
              {cartView ? (
                <Modal onClose={() => setCartView(false)}>
                  <Cart></Cart>
                </Modal>
              ) : null}
              <div
                className="btn bg-white text-danger mx-2"
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          ) : (
            <div className="d-flex">
              <Link className="btn bg-white text-success mx-1" to="/login">
                Login
              </Link>
              <Link className="btn bg-white text-success mx-1" to="/createuser">
                SignUp
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
