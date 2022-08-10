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
  async componentDidMount() {
    await this.props.getItems();
  }
  render() {
    console.log(this.props);
    let { items } = this.props || {};
    console.log(items);
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
                <div id="allItems">
                  {items.length > 0 ? (
                    items.map((item) => {
                      return (
                        <div className="allItems" key={item.id}>
                          <div id="item-name">{item.name}</div>
                          <Link to={`/items/${item.id}`}>
                            <img
                              class="card-image"
                              height="200vh"
                              width="200vh"
                              src={item.imageUrl}
                            />
                          </Link>
                          <div>
                            <h3>Price: ${item.price / 100}</h3>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <span />
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <div id="allItems">
                {items.map((item) => {
                  return (
                    <div className="allItems" key={item.id}>
                      <div id="item-name">{item.name} </div>
                      <Link to={`/items/${item.id}`}>
                        <img class="card-image" src={item.imageUrl} />
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
