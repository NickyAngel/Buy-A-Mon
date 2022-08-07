import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllUsers } from "../store/users";

export class AllUsers extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }
  render() {
    let { users } = this.props;
    return (
      <div>
        <h1>Buy-A-Mon Users</h1>

        <div id="allUsers">
          {users.map((user) => {
            return (
              <div className="allUsers" key={user.id}>
                <p> {user.firstName}</p>
                <p> {user.lastName}</p>
                <p>{user.email}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    users: state.users,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getUsers: () => dispatch(fetchAllUsers()),
  };
};

export default connect(mapState, mapDispatch)(AllUsers);
