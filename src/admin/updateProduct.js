import React from "react";
import {
  getAllCategories,
  getProductById,
  updateProduct,
} from "./adminhelper/dashboardmodules";
import { isAuthenticated } from "../auth/authhelpers";

class UpdateProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      category: "",
      formData: new FormData(),
      photo: File,
      name: "",
      description: "",
      stock: "",
      price: "",
      Success: false,
      Error: "",
      Loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    let name = event.target.name;
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    this.state.formData.set(name, value);
    this.setState({ [name]: value });
  }

  onUpdate(event) {
    event.preventDefault();
    const { user, token } = isAuthenticated();
    this.setState({ Success: false, Loading: true });
    updateProduct(this.props.proId, user._id, token, this.state.formData).then(
      (data) => {
        if (data.error) {
          this.setState({ Error: data.error, Success: false, Loading: false });
        } else {
          this.setState({ Error: "", Success: true, Loading: false });
        }
        setTimeout(() => {
          this.setState({
            category: "",
            photo: File,
            name: "",
            description: "",
            stock: "",
            price: "",
            Success: false,
            Error: "",
            Loading: false,
            formData: new FormData(),
          });
        }, 3000);
      }
    );
  }
  productPreload() {
    getProductById(this.props.proId)
      .then((data) => {
        if (data.error) {
          this.setState({
            Error: data.error,
          });
        } else {
          this.setState({
            name: data.name,
            description: data.description,
            stock: data.stock,
            price: data.price,
            category: data.category,
          });
        }
      })
      .catch();
  }
  preload() {
    getAllCategories().then((data) => {
      if (data.error) {
        this.setState({ Error: data.Error });
      } else {
        this.setState({ categories: data, formData: new FormData() });
      }
    });
  }

  componentDidMount() {
    this.preload();
    this.productPreload();
  }

  render() {
    return (
      <div className="container" style={{ height: "auto" }}>
        <form className="container">
          {(this.state.Success && (
            <div className="alert alert-success" role="alert">
              Product added successfully
            </div>
          )) ||
            (this.state.Error && (
              <div class="alert alert-danger" role="alert">
                {this.state.Error}{" "}
              </div>
            )) ||
            (this.state.Loading && (
              <div class="spinner-grow" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            ))}
          <div className="row">
            <div className="col-6">
              <div className="form-group mb-0">
                <label style={{ fontWeight: "bold" }}>
                  Select product photo
                </label>
                <label
                  className="btn  btn-success btn-block btn-sm"
                  style={{ color: "white" }}
                >
                  <input
                    type="file"
                    name="photo"
                    accept="image"
                    placeholder="choose a file"
                    required
                    onChange={this.handleChange}
                  />
                </label>
              </div>
            </div>
            <div className="col-6">
              <div class="form-group">
                <label style={{ fontWeight: "bold" }}>Product name</label>
                <input
                  type="text"
                  class="form-control"
                  name="name"
                  onChange={this.handleChange}
                  value={this.state.name}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div class="form-group">
                <label style={{ fontWeight: "bold" }}>Product price</label>
                <input
                  type="number"
                  class="form-control"
                  name="price"
                  onChange={this.handleChange}
                  value={this.state.price}
                />
              </div>
            </div>
            <div className="col-6">
              <div class="form-group">
                <label style={{ fontWeight: "bold" }}>Stock</label>
                <input
                  type="number"
                  class="form-control"
                  name="stock"
                  onChange={this.handleChange}
                  value={this.state.stock}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div class="form-group">
                <label style={{ fontWeight: "bold" }}>Select category</label>
                <select
                  class="form-control"
                  name="category"
                  onChange={this.handleChange}
                >
                  <option>Select a category</option>
                  {this.state.categories.map((category, index) => {
                    return (
                      <option key={index} value={category._id}>
                        {category.name}{" "}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div class="form-group">
                <label style={{ fontWeight: "bold" }}>
                  Product description
                </label>
                <textarea
                  class="form-control"
                  rows="3"
                  name="description"
                  onChange={this.handleChange}
                  value={this.state.description}
                ></textarea>
              </div>
            </div>
          </div>
          <button
            type="submit"
            class="btn btn-outline-success btn-block"
            onClick={this.onUpdate}
          >
            Update
          </button>
        </form>
        <p>{this.props.proId}</p>
        {/* <p>{JSON.stringify(this.state)}</p> */}{" "}
      </div>
    );
  }
}

export default UpdateProduct;
