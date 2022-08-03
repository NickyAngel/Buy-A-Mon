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
    this.props.history.push("/completedOrder");
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
        {this.props.cart.items && this.props.cart.items.length !== 0 ? (
          <div>
            {items.map((item) => (
              <Link to={`/items/${item.id}`} key={item.id}>
                {item.name}
                <img height="400vh" width="400vh" src={items.imageUrl} />
                {item.price}
              </Link>
            ))}
          </div>
        ) : (
          <div>No items in Cart </div>
        )}

        <h1>Checkout </h1>
        <form>
          <div className="checkout">
            <label htmlFor="email">Check Out Confirmation:</label>
            <input
              name="email"
              onChange={this.handleChange}
              type="text"
              value={this.state.email}
              id="email"
              placeholder="email..."
            />
            <input
              name="password"
              onChange={this.handleChange}
              type="text"
              value={this.state.email}
              id="password"
              placeholder="password..."
            />
          </div>

          <button onSubmit={() => this.handlesubmit()} type="submit">
            Submit Payment
          </button>
        </form>
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
