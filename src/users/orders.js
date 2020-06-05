import React from "react";
import "../style.css";
import {
  getAllOrder,
  getOrderByUserId,
} from "../admin/adminhelper/dashboardmodules";
import { isAuthenticated } from "../auth/authhelpers/index";
import Select from "@material-ui/core/Select";

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      error: "",
    };
  }
  componentDidMount() {
    const { user, token } = isAuthenticated();
    getOrderByUserId(user._id, token).then((data) => {
      if (data.error) {
        this.setState({
          error: data.error,
        });
      } else {
        this.setState({
          orders: data,
        });
      }
    });

    
  }
  render() {
   
    return (
      <div
        style={{
          backgroundColor: "#DAE0E2",
          padding: "20px",
          borderRadius: "5px",
        }}
      >
        <div
          className="container-fluid overflow-auto"
          style={{ height: "100vh" }}
        >
          <ul class="list-group">
            <li
              class="list-group-item"
              style={{
                backgroundColor: "#4C4B4B",
                color: "#DAE0E2",
              }}
            >
              <div className="row">
                <div
                  className="col-6  text-center  border-right font"
                  style={{
                    fontSize: "13px",
                    letterSpacing: "1px",
                    color: "#DAE0E2",
                  }}
                >
                  Product name
                </div>
                <div
                  className="col-3 border-right text-center font"
                  style={{
                    fontSize: "13px",
                    letterSpacing: "1px",
                    color: "#DAE0E2",
                  }}
                >
                  Amount
                </div>
                <div
                  className="col-3 border-right text-center font"
                  style={{
                    fontSize: "13px",
                    letterSpacing: "1px",
                    color: "#DAE0E2",
                  }}
                >
                  Date
                </div>
              </div>
            </li>
            {this.state.orders &&
              this.state.orders.map((order, index) => {
                return (
                  <li
                    class="list-group-item"
                    style={{
                      backgroundColor: "#F3CC79",
                      color: "#2F363F",
                    }}
                  >
                    <div className="row">
                      <div
                        className="col-6  text-center  border-right font"
                        style={{
                          fontSize: "8px",
                          letterSpacing: "1px",
                          color: "#2F363F",
                        }}
                      >
                        <Select
                          native
                          defaultValue=""
                          id="grouped-native-select"
                          className="p0 width"
                          style={{ width: "100%" }}
                        >
                          <option value={1}>View all products</option>
                      
                          {order.products &&
                            order.products.map((p, i) => {
                              return <option value={i}>{p.name}</option>;
                            })}
                        </Select>
                      </div>
                      <div
                        className="col-3 border-right text-center font center handleOverflow"
                        style={{
                          fontSize: "13px",
                          letterSpacing: "1px",
                          color: "#2F363F",
                        }}
                      >
                        {order.amount} $
                      </div>
                      <div
                        className="col-3 border-right text-center font center handleOverflow"
                        style={{
                          fontSize: "13px",
                          letterSpacing: "1px",
                          color: "#2F363F",
                        }}
                      >
                        {order.updated.split("T")[0]}
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
            {/* <p>{JSON.stringify(this.state.orders[7])}</p> */}
      </div>
    );
  }
}

export default Order;
