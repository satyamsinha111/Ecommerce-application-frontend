/* eslint-disable no-mixed-operators */
import React from "react"
import {isAuthenticated} from "../auth/authhelpers"
import {createCategory} from "./adminhelper/dashboardmodules"


class AddCategory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Name: "",
            Error: "",
            Success: false,
            Loading: false
        }
        this.handleCategoryName = this.handleCategoryName.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
    }

    handleCategoryName(event) {
        event.preventDefault();
        this.setState({Name: event.target.value})
    }

    onSubmit(event) {
        event.preventDefault();
        const {user, token} = isAuthenticated();
        this.setState({Loading: true, Success: false, Error: ""})
        let category = this.state.Name;
        createCategory(user._id, token, {name: category}).then(data => {
            if (data.error) {
                this.setState({Loading: false, Success: false, Error: data.error, Name: ""})


            } else {
                this.setState({Loading: false, Success: true, Error: "", Name: ""})

            }
        }).catch(err => console.log("FRONTEND ERROR", err))
        setTimeout(() => {
            this.setState({Loading: false, Success: false, Error: "", Name: ""})
        }, 3000)

    }

    render() {
        return (
            <div className="container-fluid">

                <form style={
                    {
                        margin: "auto",
                        width: "70%"
                    }
                }>
                    {
                    this.state.Success && (
                        <div className="alert alert-success font" role="alert">
                            Category added successfully
                        </div>
                    // eslint-disable-next-line no-mixed-operators
                    ) || this.state.Error && (
                        <div class="alert alert-danger font" role="alert">
                            {
                            this.state.Error
                        } </div>
                    ) || this.state.Loading && (
                        <div class="spinner-grow font" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    )
                }
                    <div className="form-group ">
                        <label className="text-left font"
                            style={
                                {
                                    fontWeight: "bold",
                                    fontSize: "20px",
                                    letterSpacing: "1px",
                                    color: "#4C4B4B"
                                }
                        }>Enter the category</label>
                        <input type="text" className="form-control" placeholder="eg. Summer"
                            onChange={
                                this.handleCategoryName
                            }
                            value={
                                this.state.Name
                            }
                            required/>
                    </div>
                    <button type="submit" className="btn btn-outline-success btn-block"
                        onClick={
                            this.onSubmit
                    }>Submit</button>
                </form>
                {/* <p>{JSON.stringify(this.state)}</p> */} </div>
        )
    }


}

export default AddCategory
