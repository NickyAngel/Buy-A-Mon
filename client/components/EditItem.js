import React from "react";
import { connect } from "react-redux";
import { updateItem } from "../store/items";
// import { fetchSingleItem } from "../store/singleItem";

class EditItem extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      price: "",
      imageUrl: "",
      description: "",
      error: "validation error",
    };

    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  //   componentDidMount() {
  //     this.props.fetchSingleItem(this.props.match.params.id);
  //   }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  // handleSubmit(evt) {
  // evt.preventDefault();
  // console.log(this.props.item);
  /// this.props.updateItem(this.props.item);
  // this.props.updateItem({this.props.item, ...this.state}, this.props.history)
  // this.props.history.push("/allitems");
  // }

  render() {
    return (
      <div>
        {this.props.isLoggedIn && this.props.user.role === "admin" ? (
          <form id="edit-item" onSubmit={this.handleSubmit}>
            <label htmlFor="taskName">Name:</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            ></input>

            <label htmlFor="address">Price:</label>
            <input
              type="text"
              name="price"
              value={this.state.price}
              onChange={this.handleChange}
            ></input>

            <label htmlFor="address">imageUrl:</label>
            <input
              type="text"
              name="imageUrl"
              value={this.state.imageUrl}
              onChange={this.handleChange}
            ></input>

            <label htmlFor="address">Description:</label>
            <input
              type="text"
              name="price"
              value={this.state.description}
              onChange={this.handleChange}
            ></input>
            <button
              onClick={() => {
                console.log(this.state, this.props.item.id);
                this.props.updateItem(this.state, this.props.id);
              }}
            >
              Edit Item
            </button>
          </form>
        ) : (
          "Unauthorized access"
        )}
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    items: state.items,
    isLoggedIn: !!state.auth.id,
    user: state.auth,
  };
};
const mapDispatch = (dispatch) => ({
  updateItem: (item, id) => dispatch(updateItem(item, id)),
  //   singleItem: (id) => dispatch(fetchSingleItem(id)),
});

export default connect(mapState, mapDispatch)(EditItem);
