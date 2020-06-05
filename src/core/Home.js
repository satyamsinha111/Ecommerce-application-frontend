import React from "react";
import Base from "./Base";
import { getProducts } from "../admin/adminhelper/dashboardmodules";
import Card from "../admin/card";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      notsignedin: false,
    };
    this.alert = this.alert.bind(this);
  }
  alert() {
    this.setState({
      notsignedin: true,
    });
    setTimeout(() => {
      this.setState({
        notsignedin: false,
      });
    }, 3000);
  }
  preloader() {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          products: data,
        });
      }
    });
  }

  componentDidMount() {
    this.preloader();
  }

  showProducts() {
    console.log("hello");
    return (
      <div className="container" style={{ marginTop: "75px" }}>
        {this.state.notsignedin && (
          <div
            class="alert alert-danger d-flex justify-content-center"
            role="alert"
          >
            You are not signed in please sign in first
          </div>
        )}
        <div className="row">
          {this.state.products &&
            this.state.products.map((product, index) => {
              return (
                <div key={index} className="col-md-4 col-sm-12">
                  <Card
                    item={product}
                    productId={product._id}
                    title={product.name}
                    description={product.description}
                    addToCart={true}
                    notify={this.alert}
                  />
                </div>
              );
            })}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Base
          title="Explore our items here"
          description="We provide varities of tshirts"
        />
        {this.showProducts()}
      </div>
    );
  }
}

export default Home;
