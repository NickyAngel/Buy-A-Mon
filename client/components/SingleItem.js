import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class SingleItem extends React.Component {
  componentDidMount() {
    this.props.singleItem(this.props.match.params.id);
  }

  render() {
    const name = this.props.singleItem.name;
    const imageUrl = this.props.singleItem.imageUrl;
    const description = this.props.singleItem.description;
    const price = this.props.singleItem.price;

    return (
      <div>
        <img width="400vh" height="400vh" src={imageUrl} />
        <h1>{name}</h1>
        <h4>{price}</h4>
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
  item: (id) => dispatch(fetchItem(id)),
});

export default connect(mapState, mapDispatch)(SingleItem);
