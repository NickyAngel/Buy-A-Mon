import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSingleItem } from "../store/singleItem";

class SingleItem extends React.Component {
  // componentDidMount() {
  //   this.props.singleItem(this.props.match.params.id);
  // }
  componentDidMount() {
    this.props.singleItem(this.props.match.params.id);
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
        <Link to="/pokemon/addToCart"> Add to Cart</Link>
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
});

export default connect(mapState, mapDispatch)(SingleItem);
