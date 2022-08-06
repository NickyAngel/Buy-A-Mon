import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSingleItem } from "../store/singleItem";
import { deleteItem, createItem, editItem } from "../store";

class SingleItem extends React.Component {
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
  deleteItem: (id) => dispatch(deleteItem(id)),
  createItem: (id) => dispatch(createItem(id)),
  editItem: (id) => dispatch(editItem(id)),
});

export default connect(mapState, mapDispatch)(SingleItem);

// {
//   this.props.user.role === "administrator" ? (
//     <div>
//       <img width="400vh" height="400vh" src={imageUrl} />
//       <h1>{name}</h1>
//       <h4>${price / 100}</h4>
//       <h4>{description}</h4>
//       <Link to="/pokemon/addToCart"> Add to Cart</Link>
//       <Button className="create" onClick={() => this.props.createItem(item.id)}>
//         Add Item
//       </Button>
//       <Button className="delete" onClick={() => this.props.deleteItem(item.id)}>
//         Delete Item
//       </Button>
//       <Button className="edit" onClick={() => this.props.editItem(item.id)}>
//         Edit Item
//       </Button>
//     </div>
//   ) : (
//     <div>
//       <img width="400vh" height="400vh" src={imageUrl} />
//       <h1>{name}</h1>
//       <h4>${price / 100}</h4>
//       <h4>{description}</h4>
//       <Link to="/pokemon/addToCart"> Add to Cart</Link>
//     </div>
//   );
// }
