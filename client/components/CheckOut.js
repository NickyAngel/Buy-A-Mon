import React from "react";
import { connect } from "react-redux";

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handle() {
    this.props.checkout(this.state.email);
    this.props.history.push("/");
  }
  handleSubmit(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  //cart table?

  // order table? or add products.item.map
  //add total
  render() {
    return (
      <div>
        <h1>Checkout </h1>

        {this.props.orders.item && this.props.orders.item.length !== 0 ? (
          <div>
            {items.map((item) => (
              <Link to={`/items/${item.id}`} key={item.id}>
                {item.name}
                <img height="400vh" width="400vh" src={item.imageUrl} />
                {item.price}
              </Link>
            ))}

            <button onSubmit={() => this.handlesubmit()} type="submit">
              "Submit Payment" c
            </button>
          </div>
        ) : (
          <div>No items in Cart </div>
        )}
      </div>
    );
  }
}

const mapState = (state) => ({
  cart: state.cart,
  cards: state.cards,
});

const mapDispatch = (dispatch) => {
  return {};
};

export default connect(mapState, mapDispatch)(Checkout);
