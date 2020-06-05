import React from "react";
import { isAuthenticated } from "../auth/authhelpers";
import { getCategoryId, updateCategory } from "./adminhelper/dashboardmodules";

class UpdateCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      Error: "",
      Success: false,
      Loading: false,
    };
    this.handleCategoryName = this.handleCategoryName.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  handleCategoryName(event) {
    event.preventDefault();
    this.setState({ Name: event.target.value });
  }

  onUpdate(event) {
    event.preventDefault();
    this.setState({ Success: false, Loading: true });
    let category = this.state.Name;
    let categoryId = this.props.catId;
    let { user, token } = isAuthenticated();
    updateCategory(user._id, categoryId, token, { name: category }).then(
      (data) => {
        if (data.error) {
          this.setState({
            Loading: false,
            Error: data.error,
            Success: false,
            Name: "",
          });
        } else {
          this.setState({ Loading: false, Error: "", Success: true, Name: "" });
        }
        setTimeout(() => {
          this.setState({
            Name: "",
            Error: "",
            Success: false,
            Loading: false,
          });
        }, 3000);
      }
    );
  }

  preload(categoryId) {
    getCategoryId(categoryId).then((data) => {
      if (data.error) {
        this.setState({ Error: data.error });
      } else {
        this.setState({ Name: data.name });
      }
    });
  }
  componentDidMount() {
    this.preload(this.props.catId);
  }
  render() {
    return (
      <div className="container">
        <form
          style={{
            margin: "auto",
            width: "70%",
          }}
        >
          {(this.state.Success && (
            <div className="alert alert-success" role="alert">
              Category added successfully
            </div>
          )) ||
            (this.state.Error && (
              <div class="alert alert-danger" role="alert">
                Failed to update category
              </div>
            )) ||
            (this.state.Loading && (
              <div className="d-flex justify-content-center">
                <div class="spinner-grow text-danger" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            ))}
          <div className="form-group ">
            <label
              className="text-left"
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                letterSpacing: "1px",
                color: "#4C4B4B",
              }}
            >
              Enter the category
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="eg. Summer"
              onChange={this.handleCategoryName}
              value={this.state.Name}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-outline-success btn-block"
            onClick={this.onUpdate}
          >
            Update
          </button>
        </form>
        <p>{JSON.stringify(this.state)}</p>
      </div>
    );
  }
}

export default UpdateCategory;
