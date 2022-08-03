import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import { fetchItems, } from "../redux";

export class AllItems extends React.Component {
  componentDidMount() {
    this.props.getItems();
  }
  render() {
    return (
      <div>
        <h1>Pokemon Cards</h1>

        {this.props.items.map((items) => (
          <div className="allItems" key={items.id}>
            <Link to={`/items/${items.id}`}>
              {items.name}
              <img height="400vh" width="400vh" src={items.imageUrl} />
            </Link>
          </div>
        ))}

        <button>
          <Link to="/pokemon/signup">SIGN UP</Link>
        </button>
        {/* <Link to="/card/add">Add to  Cart</Link> */}
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
    // getItems: () => dispatch(fetchItems())
  };
};

export default connect(mapState, mapDispatch)(AllItems);
