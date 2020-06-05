import React from "react";
import { getProducts, DeleteProduct } from "./adminhelper/dashboardmodules";
import { isAuthenticated } from "../auth/authhelpers";

class ManageProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      Error: "",
    };
  }

  preload() {
    getProducts().then((data) => {
      if (data.error) {
        this.setState({ Error: data.error });
      } else {
        this.setState({ products: data });
      }
    });
  }
  componentDidMount() {
    this.preload();
  }
  render() {
    return (
      <div className="container overflow-auto" style={{ height: "100vh" }}>
        <ul class="list-group">
          <li
            class="list-group-item"
            style={{
              backgroundColor: "#EC4849",
              color: "#DAE0E2",
            }}
          >
            <div className="row">
              <div
                className="col-6  text-center  border-right"
                style={{
                  fontSize: "20px",
                  letterSpacing: "1px",
                  color: "#DAE0E2",
                }}
              >
                Product name
              </div>
              <div
                className="col-3 border-right text-center"
                style={{
                  fontSize: "20px",
                  letterSpacing: "1px",
                  color: "#DAE0E2",
                }}
              >
                Update
              </div>
              <div
                className="col-3 border-right text-center"
                style={{
                  fontSize: "20px",
                  letterSpacing: "1px",
                  color: "#DAE0E2",
                }}
              >
                Delete
              </div>
            </div>
          </li>
          {this.state.products.map((product, index) => {
            return (
              <li class="list-group-item text-center" key={index}>
                <div className="row">
                  <div
                    className="col-6  text-center  border-right"
                    style={{
                      fontSize: "20px",
                      letterSpacing: "1px",
                      color: "#535C68",
                    }}
                  >
                    {product.name}{" "}
                  </div>
                  <div
                    className="col-3 border-right text-center"
                    style={{
                      fontSize: "10px",
                      letterSpacing: "1px",
                      color: "#DAE0E2",
                    }}
                  >
                    <button
                      type="button"
                      className="btn btn-outline-success btn-block btn-sm"
                      onClick={() => {
                        this.props.setProId(product._id);
                        this.props.showUpdateProUi();
                      }}
                    >
                      Update
                    </button>
                  </div>
                  <div className="col-3">
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-block btn-sm"
                      onClick={() => {
                        const { user, token } = isAuthenticated();
                        DeleteProduct(product._id, user._id, token).then(
                          (data) => {
                            if (data.error) {
                              this.setState({ Error: data.Error });
                            } else {
                              this.preload();
                            }
                          }
                        );
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            );
          })}{" "}
        </ul>
      </div>
    );
  }
}

export default ManageProduct;
