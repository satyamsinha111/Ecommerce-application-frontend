import React from "react";
import { API } from "../backend";
import {
  addProductToCart,
  removeProduct,
} from "../admin/adminhelper/carthelper";
import { Redirect, Link } from "react-router-dom";
import { isAuthenticated } from "../auth/authhelpers/index";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
    this.AddToCart = this.AddToCart.bind(this);
  }

  AddToCart(item) {
    if (isAuthenticated()) {
      addProductToCart(item, () => {
        this.setState({
          redirect: true,
        });
      });
    } else {
      this.props.notify()
    }
  }

  render() {
    return (
      <div className="card bg-transparent border border-danger mt-2">
        {this.state.redirect && <Redirect to="/cart" />}
        <img
          src={`${API}/product/photo/${this.props.productId}`}
          className="card-img-top"
          style={{ width: "100%", height: "300px" }}
          alt="Shirt"
        />
        <div className="card-body">
          <h5 className="card-title text-center">{this.props.title}</h5>
          <p className="card-text text-center">{this.props.description}</p>
          <p className="card-text text-center bolder">
            {this.props.item.price}$
          </p>
          {this.props.addToCart ? (
            <Link
              className="btn btn-outline-danger d-block"
              onClick={() => {
                this.AddToCart(this.props.item);
              }}
            >
              Add to cart
            </Link>
          ) : (
            <Link
              className="btn btn-outline-dark d-block mt-2"
              onClick={() => {
                removeProduct(this.props.item._id);
                this.props.reload();
              }}
            >
              Remove from cart
            </Link>
          )}
        </div>
      </div>
    );
  }
}

export default Card;
