import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Thanks for purchasing our Pokemon</h1>
        <button>
          <Link to="/home">Click Here To View All Pokemon</Link>
        </button>
        <button>
          <Link to="/cart">Click Here To View Your Cart Items</Link>
        </button>
      </div>
    );
  }
}

const mapState = (state) => ({});

const mapDispatch = (dispatch) => {
  return {};
};

export default connect(mapState, mapDispatch)(Checkout);
