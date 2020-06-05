import React from "react";
import {
  getAllCategories,
  deleteCategory,
} from "./adminhelper/dashboardmodules";
import { isAuthenticated } from "../auth/authhelpers";

class ManageCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      error: "",
      success: false,
      updateCategory: false,
    };
  }
  preload() {
    getAllCategories().then((data) => {
      if (data.error) {
        this.setState({ error: data.error, success: false });
      } else {
        this.setState({ error: "", success: true, categories: data });
      }
    });
  }
  componentDidMount() {
    this.preload();
  }

  render() {
    return (
      <div
        className="container-fluid overflow-auto"
        style={{ height: "100vh" }}
      >
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
                className="col-6  text-center  border-right font"
                style={{
                  fontSize: "20px",
                  letterSpacing: "1px",
                  color: "#DAE0E2",
                }}
              >
                Category name
              </div>
              <div
                className="col-3 border-right text-center font"
                style={{
                  fontSize: "20px",
                  letterSpacing: "1px",
                  color: "#DAE0E2",
                }}
              >
                Update
              </div>
              <div
                className="col-3 border-right text-center font"
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
          {this.state.categories.map((category, index) => {
            return (
              <li key={index} class="list-group-item text-center">
                <div className="row">
                  <div
                    className="col-6  text-center  border-right font"
                    style={{
                      fontSize: "20px",
                      letterSpacing: "1px",
                      color: "#535C68",
                    }}
                  >
                    {category.name}{" "}
                  </div>
                  <div
                    className="col-3 border-right text-center font"
                    style={{
                      fontSize: "10px",
                      letterSpacing: "1px",
                      color: "#DAE0E2",
                    }}
                  >
                    <button
                      type="button"
                      className="btn btn-outline-success btn-block btn-sm font"
                      onClick={() => {
                        this.props.showUpdateUi();
                        this.props.setCatId(category._id);
                      }}
                    >
                      Update
                    </button>
                  </div>
                  <div className="col-3">
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-block btn-sm font"
                      onClick={() => {
                        const { user, token } = isAuthenticated();

                        deleteCategory(category._id, user._id, token).then(
                          (data) => {
                            if (data.error) {
                              this.setState({
                                error: data.error,
                                success: false,
                              });
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

export default ManageCategory;
