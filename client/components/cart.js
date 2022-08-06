import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCart, updateCart, clearItem } from '../store/cart';
import { me } from '../store/auth';

export class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
    };
  }
  async componentDidMount() {
    const user = await this.props.getUser();
    const userId = user.auth.id;
    this.setState({ id: userId });
    this.props.getCart(userId);
  }

  render() {
    let { cart } = this.props || {};
    console.log(this.props);

    return (
      <div>
        <h1>Cart</h1>
        <div id="cartItems">
          {cart.map(item => {
            //console.log(item);
            return (
              <div className="cartItems" key={item.id}>
                <Link to={`/items/${item.id}`}>
                  {item.name}
                  <img height="100vh" width="100vh" src={item.imageUrl} />
                </Link>
                <div>
                  <h3>Total Price: ${item.totalPriceAtSaleTime / 100}</h3>
                  <h3>Quantity: {item.qty}</h3>

                  {/* UPDATE CART FEATURE */}
                  <button
                    onClick={evt => {
                      this.props.update(
                        { qty: ++item.qty, id: item.id, add: true, ...item },
                        this.state.id
                      );
                    }}
                  >
                    Add 1
                  </button>
                  <button
                    onClick={evt => {
                      this.props.update(
                        { qty: --item.qty, id: item.id, add: false, ...item },
                        this.state.id
                      );
                    }}
                  >
                    Minus 1
                  </button>
                  <button
                    onClick={evt => {
                      this.props.delete(item.id, this.state.id);
                    }}
                  >
                    Remove Pokemon
                  </button>

                  {/* UPDATE CART FEATURE */}
                </div>
              </div>
            );
          })}
        </div>
        <button>
          <Link to="/checkout">CHECKOUT</Link>
        </button>
      </div>
    );
  }
}
const mapState = state => {
  return {
    cart: state.cart,
  };
};
const mapDispatch = dispatch => {
  return {
    getCart: id => dispatch(fetchCart(id)),
    getUser: () => dispatch(me()),
    //UPDATE CART
    update: (thingToUpdate, userId) =>
      dispatch(updateCart(thingToUpdate, userId)),
    delete: (itemId, userId) => dispatch(clearItem(itemId, userId)),
  };
};

export default connect(mapState, mapDispatch)(Cart);
