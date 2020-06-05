import React from "react"


class AdminInfo extends React.Component {
    // constructor(props) {
    //     super(props)
    // }

    render() {
        return (
            <div className="container-fluid overflow-auto"
                style={
                    {height: "auto"}
            }>
                <ul className="list-group">
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col-2 pt-1 pr-4 border-right font"
                                style={
                                    {
                                        fontWeight: "bold",
                                        fontSize: "20px",
                                        letterSpacing: "1px",
                                        color: "#4C4B4B"
                                    }
                            }>
                                Name
                            </div>
                            <div className="col-7 pt-1 pr-4 border-right text-center font"
                                style={
                                    {
                                        fontWeight: "bold",
                                        fontSize: "20px",
                                        letterSpacing: "1px",
                                        color: "#4C4B4B"
                                    }
                            }>
                                Satyam sinha
                            </div>
                            <div className="col-3">
                                <button type="button" className="btn btn-outline-danger btn-block font">Edit name</button>
                            </div>
                        </div>

                    </li>
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col-2 pt-1 pr-4 border-right font"
                                style={
                                    {
                                        fontWeight: "bold",
                                        fontSize: "20px",
                                        letterSpacing: "1px",
                                        color: "#4C4B4B"
                                    }
                            }>
                                Email
                            </div>
                            <div className="col-7 pt-1 pr-4 border-right text-center font"
                                style={
                                    {
                                        fontWeight: "bold",
                                        fontSize: "20px",
                                        letterSpacing: "1px",
                                        color: "#4C4B4B",
                                        textOverflow: "ellipsis",
                                        overflow: "hidden",
                                        nowrap: "hidden"
                                    }
                            }>
                                <span>satyamsinha8158@gmail.com</span>
                            </div>
                            <div className="col-3">
                                <button type="button" className="btn btn-outline-danger btn-block font">Edit mail</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }


}

export default AdminInfo
