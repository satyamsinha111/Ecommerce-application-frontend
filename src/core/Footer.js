import React from "react";

class Footer extends React.Component {
  FooterComponent() {
    return (
      <nav className="navbar fixed-bottom navbar-muted bg-danger d-flex justify-content-center">
        <h6 className=" text-white">Designed by Satyam sinha</h6>
      </nav>
    );
  }

  render() {
    return <div>{this.FooterComponent()}</div>;
  }
}

export default Footer;
