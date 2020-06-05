import React from "react";
import Base from "../core/Base";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import { loadCart } from "../admin/adminhelper/carthelper";
import Card from "../admin/card";
import Payment from "../admin/payment";
import { Redirect } from "react-router-dom";

const useStyles = (theme) => {
  return {
    root: {
      backgroundColor: "#F0DF87",
      marginTop: "75px",
      margin: "3px",
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  };
};
class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
    this.preloader = this.preloader.bind(this);
    this.redirector=this.redirector.bind(this);
    this.emptyCart=this.emptyCart.bind(this)
  }
  preloader() {
    if(loadCart()!==undefined)
    {
      
      this.setState({
        items: loadCart()
      });
    }
    
  }
  emptyCart()
  {
    this.setState({
      items: []
    });
  }
  redirector()
  {
    return <Redirect to="/" />
  }
  componentDidMount() {
    this.preloader();
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Base />
        {/* {
          
          (this.state.items.length==0)? <Redirect to="/" /> :<Redirect to="/cart" />
        } */}
        <div className={classes.root}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <div
                className="container"
                style={{ border: "2px solid #218F76", paddingBottom: "6px" }}
              >
                <div className="row">
                  {
                    this.state.items.map((item, index) => {
                      console.log("helloproduct")
                      return (
                        <div key={index} className="col-md-6 col-sm-12">
                          <Card
                            item={item}
                            productId={item._id}
                            title={item.name}
                            description={item.description}
                            addToCart={false}
                            reload={this.preloader}
                            
                          />
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* <Paper className={classes.paper}>Products section</Paper> */}
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper className={classes.paper}>
                <Payment product={this.state.items} redirect={this.redirector} reload={this.emptyCart}/>
              </Paper>
            </Grid>
          </Grid>
        </div>
        {/* <p>{JSON.stringify(loadCart())}</p> */}
      </div>
    );
  }
}

export default withStyles(useStyles)(Cart);
