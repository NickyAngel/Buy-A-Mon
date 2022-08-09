import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllItems } from "../store/items";

export class AllItems extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: 1,
    };
  }
  componentDidMount() {
    this.props.getItems();
  }
  render() {
    let { items } = this.props;
    return (
      <div>
        {this.props.user.role === "admin" ? (
          <div>
            <Link to="/createItem">
              <button className="creatItemButton">Add new Item</button>
            </Link>
            <Link to="/users">
              <button className="allUsers">All Users</button>
            </Link>
            <div>
              <div>
                <h1>Pokemon Cards</h1>

                <div id="allItems">
                  {items.map((item) => {
                    return (
                      <div className="allItems" key={item.id}>
                        <Link to={`/items/${item.id}`}>
                          {item.name}
                          <img
                            height="400vh"
                            width="400vh"
                            src={item.imageUrl}
                          />
                        </Link>
                        <div>
                          <h3>Price: ${item.price / 100}</h3>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
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
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    items: state.items,
    user: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getItems: () => dispatch(fetchAllItems()),
  };
};

export default connect(mapState, mapDispatch)(AllItems);
