/* eslint-disable no-mixed-operators */
import React from "react";
import Base from "../core/Base";
import AdminInfo from "./admininfo";
import AddCategory from "./addcategory";
import ManageCategory from "./managecategory";
import AddProduct from "./addproduct";
import ManageProduct from "./manageproduct";
import ManageOrder from "./manageorders";
import UpdateCategory from "./updateCategory";
import UpdateProduct from "./updateProduct";

class AdminDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Info: true,
            CreateCategory: false,
            ManageCategory: false,
            CreateProduct: false,
            ManageProduct: false,
            ManageOrder: false,
            UpdateCategory: false,
            UpdateProduct: false,
            categoryId: "",
            productId: ""
        };
        this.handleControlPanelRendering = this.handleControlPanelRendering.bind(this);
        this.RightAdminDashboard = this.RightAdminDashboard.bind(this);
        this.handleAddCategoryRendering = this.handleAddCategoryRendering.bind(this);
        this.handleManageCategoryRendering = this.handleManageCategoryRendering.bind(this);
        this.handleAddProductRendering = this.handleAddProductRendering.bind(this);
        this.handleManageProductRendering = this.handleManageProductRendering.bind(this);
        this.handleManageOrderRendering = this.handleManageOrderRendering.bind(this);
        this.showUpdateCategoryUi = this.showUpdateCategoryUi.bind(this);
        this.setCategoryId = this.setCategoryId.bind(this);
        this.setProductId = this.setProductId.bind(this)
        this.showUpdateProductUi = this.showUpdateProductUi.bind(this)
    }
    LeftAdminDashboard() {
        return (
            <div className="card m-0 text-center">
                <ul className="list-group">
                    <li className="list-group-item"
                        onClick={
                            this.handleControlPanelRendering
                        }
                        style={
                            {
                                backgroundColor: "#2C3335",
                                color: "white",
                                fontWeight: "bolder",
                                minWidth: "26px",
                                cursor: "pointer"
                            }
                    }>
                        Control panel
                    </li>
                    <li className="list-group-item text-info"
                        onClick={
                            this.handleAddCategoryRendering
                        }
                        style={
                            {cursor: "pointer"}
                    }>
                        Create category
                    </li>
                    <li className="list-group-item text-info"
                        onClick={
                            this.handleManageCategoryRendering
                        }
                        style={
                            {cursor: "pointer"}
                    }>
                        Manage categories
                    </li>
                    <li className="list-group-item text-info"
                        onClick={
                            this.handleAddProductRendering
                        }
                        style={
                            {cursor: "pointer"}
                    }>
                        Create product
                    </li>
                    <li className="list-group-item text-info"
                        onClick={
                            this.handleManageProductRendering
                        }
                        style={
                            {cursor: "pointer"}
                    }>
                        Manage products
                    </li>
                    <li className="list-group-item text-info"
                        onClick={
                            this.handleManageOrderRendering
                        }
                        style={
                            {cursor: "pointer"}
                    }>
                        Manage orders
                    </li>
                </ul>
            </div>
        );
    }

    handleAddCategoryRendering(event) {
        event.preventDefault();
        this.setState({
            Info: false,
            CreateCategory: true,
            ManageCategory: false,
            CreateProduct: false,
            ManageProduct: false,
            ManageOrder: false,
            UpdateCategory: false,
            UpdateProduct: false
        });
    }
    handleControlPanelRendering(event) {
        event.preventDefault();
        this.setState({
            Info: true,
            CreateCategory: false,
            ManageCategory: false,
            CreateProduct: false,
            ManageProduct: false,
            ManageOrder: false,
            UpdateCategory: false,
            UpdateProduct: false
        });
    }
    handleManageCategoryRendering(event) {
        event.preventDefault();
        this.setState({
            Info: false,
            CreateCategory: false,
            ManageCategory: true,
            CreateProduct: false,
            ManageProduct: false,
            ManageOrder: false,
            UpdateCategory: false,
            UpdateProduct: false
        });
    }
    handleAddProductRendering(event) {
        event.preventDefault();
        this.setState({
            Info: false,
            CreateCategory: false,
            ManageCategory: false,
            CreateProduct: true,
            ManageProduct: false,
            ManageOrder: false,
            UpdateCategory: false,
            UpdateProduct: false
        });
    }
    handleManageProductRendering(event) {
        event.preventDefault();
        this.setState({
            Info: false,
            CreateCategory: false,
            ManageCategory: false,
            CreateProduct: false,
            ManageProduct: true,
            ManageOrder: false,
            UpdateCategory: false,
            UpdateProduct: false
        });
    }
    // setter
    setProductId(proId) {
        this.setState({productId: proId});
    }
    // setter
    setCategoryId(catId) {
        this.setState({categoryId: catId});
    }

    handleManageOrderRendering(event) {
        event.preventDefault();
        this.setState({
            Info: false,
            CreateCategory: false,
            ManageCategory: false,
            CreateProduct: false,
            ManageProduct: false,
            ManageOrder: true,
            UpdateCategory: false,
            UpdateProduct: false
        });
    }
    showUpdateCategoryUi() {
        this.setState({
            Info: false,
            CreateCategory: false,
            ManageCategory: false,
            CreateProduct: false,
            ManageProduct: false,
            ManageOrder: false,
            UpdateCategory: true,
            UpdateProduct: false
        });
    }

    showUpdateProductUi() {
        this.setState({
            Info: false,
            CreateCategory: false,
            ManageCategory: false,
            CreateProduct: false,
            ManageProduct: false,
            ManageOrder: false,
            UpdateCategory: false,
            UpdateProduct: true
        });
    }

    RightAdminDashboard() {
        return (
            <div className="card m-0 ">
                <ul className="list-group">
                    <li className="list-group-item"
                        style={
                            {
                                backgroundColor: "#2C3335",
                                color: "white",
                                fontWeight: "bolder"
                            }
                    }>
                        {
                        (this.state.Info && <span>Admin Information</span>) || (this.state.CreateCategory && <span>Create category</span>) || (this.state.ManageCategory && <span>Manage category</span>) || (this.state.CreateProduct && <span>Create product</span>) || (this.state.ManageProduct && <span>Manage product</span>) || (this.state.ManageOrder && <span>Manage order</span>) || (this.state.UpdateCategory && <span>Update category</span>)
                    }
                        {" "} </li>
                    <li className="list-group-item">
                        <div className="overflow-auto">
                            {
                            (this.state.Info && <AdminInfo/>) || (this.state.CreateCategory && <AddCategory/>) || (this.state.ManageCategory && (
                                <ManageCategory setCatId={
                                        this.setCategoryId
                                    }
                                    showUpdateUi={
                                        this.showUpdateCategoryUi
                                    }/>
                            )) || (this.state.CreateProduct && <AddProduct/>) || (this.state.ManageProduct && <ManageProduct setProId={
                                        this.setProductId
                                    }
                                    showUpdateProUi={
                                        this.showUpdateProductUi
                                    }/>) || (this.state.ManageOrder && <ManageOrder/>) || (this.state.UpdateCategory && <UpdateCategory catId={
                                    this.state.categoryId
                                }/> || (this.state.UpdateProduct && <UpdateProduct proId={
                                    this.state.productId
                                }/>))
                        }
                            {" "} </div>
                    </li>
                </ul>
            </div>
        );
    }

    render() {
        return (
            <div style={
                {marginTop: "200px"}
            }>
                <Base title="User dashboard" description="Users manages their account here"/>
                <div className="container-fluid"
                    style={
                        {
                            backgroundColor: "#75DA8B",
                            width: "80%",
                            padding: "12px",
                            borderRadius: "5px"
                        }
                }>
                    <div className="row p-0">
                        <div className="col-3">
                            {
                            this.LeftAdminDashboard()
                        } </div>
                        <div className="col-9">
                            {
                            this.RightAdminDashboard()
                        } </div>
                    </div>
                </div>
                {/* <p>{
                    JSON.stringify(this.state)
                }</p> */}
            </div>
        );
    }
}

export default AdminDashboard;
