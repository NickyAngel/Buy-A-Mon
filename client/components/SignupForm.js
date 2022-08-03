import React from "react";
import { connect } from "react-redux";
// import { fetch } from "../redux/";

class SignupForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      address: "",
      email: "",
      password: "",
      error: "validation error",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }
  async handleSubmit(evt) {
    // evt.preventDefault();
    // await this.props.fetchAddUser(this.state);
    this.props.history.push("/pokemon");
  }

  render() {
    return (
      <div>
        <form id="submit" onSubmit={this.handleSubmit}>
          <label for="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="form__input"
            placeholder="FirstName"
            value={this.state.name}
            onChange={this.handleChange}
          />

          <label for="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            className="form__input"
            placeholder="LastName"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            className="form__input"
            placeholder="Email"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <label for="password">Password</label>
          <input
            className="form__input"
            type="password"
            id="password"
            placeholder="Password"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <label for="confirmPassword">Confirm Password</label>
          <input
            className="form__input"
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <button type="submit" class="btn">
            Register
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => ({
  //   fetchAddUser: (users) => dispatch(fetchAddUser(users)),
});

export default connect(null, mapDispatch)(SignupForm);
