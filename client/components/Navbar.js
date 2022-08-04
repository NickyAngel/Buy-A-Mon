import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";



const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <h1>Pokemon Cards</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login (one that comes with boilerplate?)</Link>
          <Link to="/signup">Sign Up (one that comes with boilerplate?)</Link>
          <Link to="/allitems">All Items</Link>
          <Link to="/checkout">Check Out</Link>
          <Link to="/signupform">Sign Up</Link>
         
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
