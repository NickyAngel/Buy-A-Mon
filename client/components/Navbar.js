import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div id="navbar">
    <h1>BUY A MON</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          <Link to="/home">All Products</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <Link to="/cart">Cart</Link>
        </div>
      ) : (
        <div>
          <Link to="/home">All Products</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/cart">Cart</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    user: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
