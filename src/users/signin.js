import React from "react";
import { Signin, Authenticate } from "../auth/authhelpers";
import { Redirect } from "react-router-dom";

class SigninForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: "",
      Password: "",
      Success: false,
      Error: "",
      Redirect: false,
      Loading: false,
    };
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleEmail(event) {
    this.setState({
      Email: event.target.value,
    });
  }

  handlePassword(event) {
    this.setState({
      Password: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({
      Success: false,
      Error: "",
      Loading: true,
      Redirect: false,
    });
    let email = this.state.Email;
    let password = this.state.Password;
    Signin({ email, password })
      .then((data) => {
        if (data.error) {
          this.setState({
            Error: data.error,
            Success: false,
            Loading: false,
            Redirect: false,
          });
        } else {
          Authenticate(data, () => {
            this.setState({
              Error: "",
              Success: true,
              Loading: false,
              Redirect: true,
            });
          });
          setTimeout(() => {
            this.setState({
              Redirect: true,
              Success: false,
            });
          }, 2000);
          setTimeout(() => {
            this.props.autoClose();
          }, 4000);
        }
      })
      .catch();
  }

  Form() {
    return (
      <div className="container rounded">
        {this.state.Loading && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        {this.state.Success && (
          <div className="alert alert-success" role="alert">
            Logged in successfully
          </div>
        )}
        {this.state.Error && (
          <div className="alert alert-danger" role="alert">
            {this.state.Error}
          </div>
        )}
        {this.state.Redirect && <Redirect to={"/"} />}
        <h1 className="display-4 text-success">Sign in</h1>
        <hr className="bg-danger" />
        <form>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              onChange={this.handleEmail}
              value={this.state.Email}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              id="passsword"
              onChange={this.handlePassword}
              value={this.state.Password}
            />
          </div>
          <button
            type="submit"
            className="btn btn-outline-danger btn-block"
            onClick={this.onSubmit}
          >
            Signin
          </button>
        </form>
        {/* <p>{JSON.stringify(this.state)}</p> */}
      </div>
    );
  }

  render() {
    return <div>{this.Form()}</div>;
  }
}

export default SigninForm;
