import React from "react";
import { Link, Redirect } from "react-router-dom";
import Popup from "reactjs-popup";
import { isAuthenticated, Signout } from "../auth/authhelpers";
import SignupForm from "../users/signup";
import SigninForm from "../users/signin";

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openSignin: false,
      openSignup: false,
      signout: false,
      isUser: false,
      isAdmin: false,
    };
    this.openSigninModel = this.openSigninModel.bind(this);
    this.openSignupModel = this.openSignupModel.bind(this);
    this.SignupModel = this.SignupModel.bind(this);
    this.Menu = this.Menu.bind(this);
    this.closeSignupModel = this.closeSignupModel.bind(this);
    this.closeSigninModel = this.closeSigninModel.bind(this);
    this.autoCloseSignup = this.autoCloseSignup.bind(this);
    this.onDashboardClick = this.onDashboardClick.bind(this);
  }
  autoCloseSignup() {
    this.setState({
      openSignup: false,
      openSignin: false,
    });
  }
  openSigninModel() {
    this.setState({
      openSignin: true,
    });
  }

  closeSigninModel() {
    this.setState({
      openSignin: false,
    });
  }

  openSignupModel() {
    this.setState({
      openSignup: true,
    });
  }
  closeSignupModel() {
    this.setState({
      openSignup: false,
    });
  }

  SigninModel() {
    return (
      <Popup
        open={this.state.openSignin}
        closeOnDocumentClick
        model
        onClose={this.closeSigninModel}
        contentStyle={{
          width: "400px",
          padding: "20px",
          paddingTop: "40px",
          borderRadius: "10px",
        }}
      >
        <SigninForm autoClose={this.autoCloseSignup} />
      </Popup>
    );
  }

  onDashboardClick(event) {
    event.preventDefault();
    const { user } = isAuthenticated();
    if (user.role === 1) {
      this.setState({
        isAdmin: true,
        isUser: false,
      });
    } else {
      this.setState({
        isAdmin: false,
        isUser: true,
      });
    }
  }

  SignupModel() {
    return (
      <Popup
        open={this.state.openSignup}
        closeOnDocumentClick
        model
        onClose={this.closeSignupModel}
        contentStyle={{
          width: "400px",
          padding: "20px",
          paddingTop: "40px",
          borderRadius: "10px",
        }}
      >
        <SignupForm autoClose={this.autoCloseSignup} />
      </Popup>
    );
  }
  Menu() {
    return (
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-success">
        <div className="container">
          <Link to="/" className="navbar-brand">My Wardrobe</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
                {/* <a className="nav-link" href="#">Home<span className="sr-only">(current)</span></a> */}
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  Cart
                </Link>
                {/* <a className="nav-link" href="#">Cart</a> */}
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              {isAuthenticated() ? (
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/user"
                    onClick={this.onDashboardClick}
                  >
                    Dashboard
                  </Link>
                  {/* <a className="nav-link" href="#">Signin</a> */}
                </li>
              ) : (
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    onClick={this.openSigninModel}
                    to="/"
                  >
                    Signin
                  </Link>
                  {/* <a className="nav-link" href="#">Signin</a> */}
                </li>
              )}
              {isAuthenticated() ? (
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/"
                    onClick={() => {
                      Signout(() => {
                        this.props.toggler();
                      });
                    }}
                  >
                    Signout
                  </Link>
                  {/* <a className="nav-link" href="#">Signup<span className="sr-only">(current)</span></a> */}
                </li>
              ) : (
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    onClick={this.openSignupModel}
                    to="/"
                  >
                    Signup
                  </Link>
                  {/* <a className="nav-link" href="#">Signup<span className="sr-only">(current)</span></a> */}
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
  render() {
    return (
      <div>
        {this.state.isAdmin && <Redirect to="/admin/dashboard" />}

        {this.state.isUser && <Redirect to="/user/dashboard" />}

        {this.Menu()}
        {this.SignupModel()}
        {this.SigninModel()}
      </div>
    );
  }
}

export default Navigation;
