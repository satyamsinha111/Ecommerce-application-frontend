import React from "react";
import { Signup } from "../auth/authhelpers";
import { Redirect } from "react-router-dom";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      Email: "",
      Password: "",
      Error: "",
      Success: false,
      Redirect: false,
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  handleEmailChange(event) {
    this.setState({
      Email: event.target.value,
    });
  }

  handleNameChange(event) {
    this.setState({
      Name: event.target.value,
    });
  }
  handlePasswordChange(event) {
    this.setState({
      Password: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({
      Success: false,
    });
    let name = this.state.Name;
    let email = this.state.Email;
    let password = this.state.Password;
    Signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          console.log("ERROR", data.error);
          this.setState({
            Success: false,
            Error: data.error,
          });
        } else {
          console.log("signup success");
          this.setState({
            Name: "",
            Email: "",
            Password: "",
            Error: "",
            Success: true,
          });
          setTimeout(() => {
            this.setState({
              Success: false,
              Redirect: true,
            });
          }, 3000);
          setTimeout(() => {
            this.props.autoClose();
          }, 5000);
        }
      })
      .catch(console.log("ERROR SIGNUP!!!!!!"));
  }

  Form() {
    return (
      <div className="container rounded">
        {this.state.Success ? (
          <div className="alert alert-success" role="alert">
            Signup successfully
          </div>
        ) : (
          ""
        )}
        {this.state.Error ? (
          <div className="alert alert-success" role="alert">
            {this.state.Error}
          </div>
        ) : (
          ""
        )}
        {this.state.Redirect && <Redirect to="/" />}
        <h1 className="display-4 text-success">Sign up</h1>
        <hr className="bg-danger" />
        <form>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              id="Name"
              value={this.state.Name}
              onChange={this.handleNameChange}
            />
          </div>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={this.state.Email}
              onChange={this.handleEmailChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              id="passsword"
              value={this.state.Password}
              onChange={this.handlePasswordChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-outline-danger btn-block"
            onClick={this.onSubmit}
          >
            Free signup
          </button>
          {/* <p>{JSON.stringify(this.state)}</p> */}
        </form>
      </div>
    );
  }

  render() {
    return <div>{this.Form()}</div>;
  }
}

export default SignupForm;
