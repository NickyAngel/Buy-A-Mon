import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllItems, deleteItem, createItem  } from "../store";

export class AllItems extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: 1
    };
    this.addToCart = this.addToCart.bind(this);
  }
  componentDidMount() {
    this.props.getItems();
  }
  render() {
    return (
      <div>
      <h1>Pokemon Cards</h1>
      
{userLoggedIn.role === 'admin' ? (
         <div>
               <Button
                  className="create"
                  onClick={() => createItem (item.id)}
                >
                 Add Item
                </Button>

                  <Button
                  className="delete"
                  onClick={() => deleteItem(item.id)}
                >
                  Delete Product
                </Button>

                <Button
                  className="delete"
                  onClick={() => editItem(item.id)}
                >
                  Edit Item
                </Button>
       </div> ):
}
    
     <div id = 'allItems'>
        {this.props.items.map((items) => (
          <div className="allItems" key={items.id}>
            <Link to={`/items/${items.id}`}>
              {items.name}
              <img height="400vh" width="400vh" src={items.imageUrl} />
            </Link>
            {items.descriptions}
          </div>
        ))}

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
    deleteItem: (itemId) => dispatch(deleteItem(itemId)),
    addItem: (itemId) => dispatch (createItem (itemId))
  };
};

export default connect(mapState, mapDispatch)(AllItems);
