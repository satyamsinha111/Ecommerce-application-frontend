import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./core/Home";
import AdminRoute from "./auth/authhelpers/adminroute";
import PrivateRoute from "./auth/authhelpers/privateroute";
import UserDashboard from "./users/userdashboard";
// import AdminDashboard from "./admin/admindashboard";
import AdminDashboardUI from "./adminMaterialUi/admindashboard"
import Cart from "./admin/Cart";
class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <PrivateRoute path="/cart" component={Cart} />
          <AdminRoute path="/admin/dashboard" component={AdminDashboardUI} />
          <PrivateRoute path="/user/dashboard" component={UserDashboard} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
