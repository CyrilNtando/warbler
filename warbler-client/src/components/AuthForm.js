import React, { Component } from "react";
class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      profileImageUrl: ""
    };
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleOnSubmit(e) {
    e.preventDefault();
    const authType = this.props.signUp ? "signup" : "signin";
    this.props
      .onAuth(authType, this.state)
      .then(() => {
        this.props.history.push("/");
      })
      .catch(err => {
        return;
      });
  }
  render() {
    const { email, username, password, profileImageUrl } = this.state;
    const {
      heading,
      buttonText,
      signUp,
      errors,
      history,
      removeError
    } = this.props;

    history.listen(() => {
      if (errors.message) removeError();
    });
    return (
      <div>
        <div className="row justify-content-md-center text-center">
          <div className="col-md-6">
            <form onSubmit={this.handleOnSubmit.bind(this)}>
              <h2>{heading}</h2>
              {errors.message && (
                <div className="alert alert-danger">{errors.message}</div>
              )}
              <label htmlFor="email">Email:</label>
              <input
                placeholder="Enter your Email"
                className="form-control"
                id="email"
                name="email"
                type="text"
                onChange={this.handleChange.bind(this)}
                value={email}
              />
              <label htmlFor="password">Password:</label>
              <input
                placeholder="Enter your Password"
                className="form-control"
                id="password"
                name="password"
                type="password"
                onChange={this.handleChange.bind(this)}
                value={password}
              />
              {/**if the is sign up prop */}
              {signUp && (
                <div>
                  <label htmlFor="username">Username:</label>
                  <input
                    placeholder="Enter your Username"
                    className="form-control"
                    id="username"
                    name="username"
                    type="text"
                    onChange={this.handleChange.bind(this)}
                    value={username}
                  />

                  <label htmlFor="image-url">Image URL:</label>
                  <input
                    placeholder=" upload image"
                    className="form-control"
                    id="image-url"
                    name="profileImageUrl"
                    type="text"
                    onChange={this.handleChange.bind(this)}
                    value={profileImageUrl}
                  />
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary btn-block btn-lg"
              >
                {buttonText}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AuthForm;
