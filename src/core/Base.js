import React from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import "../style.css";
// import slide1 from "../Photos/slide1.jpg"

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signout: false,
    };
    this.toggleSignout = this.toggleSignout.bind(this);
  }

  toggleSignout() {
    this.setState = {
      signout: true,
    };
  }

  render() {
    return (
      <div>
        <Navigation toggler={this.toggleSignout} />

        {this.state.signout && (
          <div className="alert alert-success" role="alert">
            Signed out successfully
          </div>
        )}
        {/* <div className="container">
                 <div className="jumbotron jumbotron-fluid rounded border border-danger " style={{margin:"75px"}}>
                        <div className="container">
                            <h1 className="display-5 text-center">{this.props.title}</h1>
        <p className="lead text-center">{this.props.description}</p>
                        </div>
                </div>
                 </div> */}
        <Footer />
      </div>
    );
  }
}

export default Base;
