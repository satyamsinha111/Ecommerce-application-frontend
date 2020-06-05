/* eslint-disable no-mixed-operators */
import React from "react";
import Dropin from "braintree-web-drop-in-react";
import { getToken, processPayment } from "./adminhelper/braintree";
import { isAuthenticated } from "../auth/authhelpers/index";
import Button from "@material-ui/core/Button";
import { createOrder } from "../admin/adminhelper/dashboardmodules";
import { emptyCart, loadCart } from "../admin/adminhelper/carthelper";
import { Redirect } from "react-router-dom";

class Payment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: undefined,
      error: "",
      success: false,
      instance: {},
    };
    this.getAmount = this.getAmount.bind(this);
    this.onPurchase = this.onPurchase.bind(this);
    this.getTodayDate = this.getTodayDate.bind(this);
  }
  instance;
  loadToken() {
    const { user, token } = isAuthenticated();
    getToken(user._id, token).then((info) => {
      if (info.error) {
        this.setState({
          error: info.error,
        });
      } else {
        this.setState({
          token: info.clientToken,
        });
      }
    });
  }
  getAmount() {
    let amount = 0;
    // eslint-disable-next-line array-callback-return
    this.props.product.map((p, i) => {
      amount = amount + p.price;
    });
    return amount;
  }
  componentDidMount() {
    this.loadToken();
  }
  getTodayDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    return today;
  }
  onPurchase(event) {
    event.preventDefault();
    let { user, token } = isAuthenticated();
    this.instance.requestPaymentMethod().then((data) => {
      let nonce = data.nonce;
      let paymentInfo = {
        nonceFromTheClient: nonce,
        amount: this.getAmount(),
      };
      processPayment(user._id, token, paymentInfo).then((data) => {
        if (data.error) {
          this.setState({
            error: data.error,
          });
        } else {
          this.setState({
            success: true,
          });
          let order = {
            products: this.props.product,
            transaction_id: data.transaction.id,
            amount: this.getAmount(),
            updated: this.getTodayDate(),
          };
          createOrder(user._id, token, order).then((data) => {
            if (data.error) {
              this.setState({
                error: data.error,
              });
            } else {
              emptyCart(() => {
                loadCart();
                this.props.reload();
              });
            }
          });
        }
      });
    });
  }

  render() {
    return (
      <div>
        {(this.state.success && (
          <div class="alert alert-success" role="alert">
            Order placed successfully
          </div>
        )) ||
          (this.state.redirect && <Redirect to="/" />)}
        <p className="lead">Total amount {this.getAmount()}</p>
        {this.state.token && (
          <Dropin
            options={{ authorization: this.state.token }}
            onInstance={(instance) => (this.instance = instance)}
          />
        )}
        <Button
          className="btn-block"
          variant="outlined"
          color="primary"
          onClick={this.onPurchase}
        >
          Buy
        </Button>
        {/* <p>{JSON.stringify(loadCart())}</p> */}
      </div>
    );
  }
}

export default Payment;
