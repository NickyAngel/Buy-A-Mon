import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSingleItem } from "../store/singleItem";
import { addItemToCart } from "../store/cart";
import { fetchCart } from "../store/cart";
import { me } from "../store/auth";

class SingleItem extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick(event) {
    event.preventDefault();

    const user = await this.props.getUser();
    const id = user.auth.id;
    let addQty = parseInt(event.target);

    if (!addQty) {
      addQty = 1;
    }

    const newItemOrder = {
      id: this.props.item.id,
      name: this.props.item.name,
      price: this.props.item.price,
      imageUrl: this.props.item.imageUrl,
      description: this.props.item.description,
      qty: addQty,
    };
    this.props.addItem(newItemOrder, id);
  }
  // componentDidMount() {
  //   this.props.singleItem(this.props.match.params.id);
  // }
  async componentDidMount() {
    const user = await this.props.getUser();
    const id = user.auth.id;
    this.props.singleItem(this.props.match.params.id);
    this.props.getCart(id);
  }

  render() {
    const name = this.props.item.name;
    const imageUrl = this.props.item.imageUrl;
    const description = this.props.item.description;
    const price = this.props.item.price;

    return (
      <div>
        <img width="400vh" height="400vh" src={imageUrl} />
        <h1>{name}</h1>
        <h4>${price / 100}</h4>
        <h4>{description}</h4>
        <button onClick={this.handleClick} type="submit">
          Add To Cart
        </button>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
    item: state.singleItem,
  };
};
const mapDispatch = (dispatch) => ({
  singleItem: (id) => dispatch(fetchSingleItem(id)),
  addItem: (item, userId) => dispatch(addItemToCart(item, userId)),
  getCart: (id) => dispatch(fetchCart(id)),
  getUser: () => dispatch(me()),
});

export default connect(mapState, mapDispatch)(SingleItem);
