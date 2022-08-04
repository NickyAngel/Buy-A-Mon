import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteItem, createItem } from "../store";
import { fetchAllItems } from "../store/items";

export class AllItems extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: 1,
    };
    // this.addToCart = this.addToCart.bind(this);
  }
  componentDidMount() {
    this.props.getItems();
  }
  render() {
    let { items } = this.props;
    return (
      <div>
        <h1>Pokemon Cards</h1>

        <div id="allItems">
          {items.map((item) => {
            return (
              <div className="allItems" key={item.id}>
                <Link to={`/items/${item.id}`}>
                  {item.name}
                  <img height="400vh" width="400vh" src={item.imageUrl} />
                </Link>
                <div>
                  <h3>Price: ${item.price / 100}</h3>
                </div>
              </div>
            );
          })}

          <button>
            <Link to="/BuyAMon/signup">SIGN UP</Link>
          </button>
        </div>
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    items: state.items,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getItems: () => dispatch(fetchAllItems()),
    // deleteItem: (itemId) => dispatch(deleteItem(itemId)),
    // addItem: (itemId) => dispatch(createItem(itemId)),
  };
};

export default connect(mapState, mapDispatch)(AllItems);

// {userLoggedIn.role === "admin" ? (
//   <div>
//     <Button className="create" onClick={() => createItem(item.id)}>
//       Add Item
//     </Button>

//     <Button className="delete" onClick={() => deleteItem(item.id)}>
//       Delete Product
//     </Button>

//     <Button className="delete" onClick={() => editItem(item.id)}>
//       Edit Item
//     </Button>
//   </div>
// ) : (
//   "placeholder"
// )}
