import React from "react";
import { withTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import { withStyles } from "@material-ui/core/styles";
import Order from "./orders";
import { Redirect } from "react-router-dom";
import {Signout} from "../auth/authhelpers/index"


const drawerWidth = 240;
const useStyles = (theme) => {
  return {
    root: {
      display: "flex",
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    header: {
      backgroundColor: "red",
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    }
  };
};

class UserDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      redirect:false
    };
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.loadBody = this.loadBody.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.goToFrontend = this.goToFrontend.bind(this);
    this.signOut=this.signOut.bind(this)
  }
  handleToggle() {
    this.setState({
      open: !this.state.open,
    });
  }
  drawer() {
    const { classes } = this.props;
    return (
      <div>
        <div
          className={classes.toolbar}
          style={{
            backgroundColor: "#218F76",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "20px",
            letterSpacing: "2px",
          }}
        >
          Control panel
        </div>
        <Divider />
        <List>
          <ListItem button key="My orders">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="My orders" />
          </ListItem>
          <ListItem button key="Go to frontend">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Go to frontend" onClick={this.goToFrontend}/>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem
            button
            key="Logout"
            onClick={() => {
              Signout(()=>{
                this.signOut()
              });
            }}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </div>
    );
  }
  handleDrawerOpen() {
    this.setState({
      open: true,
    });
  }
  handleDrawerClose() {
    this.setState({
      open: false,
    });
  }
  goToFrontend(event) {
    event.preventDefault();
    this.setState({
      redirect:true
    })
  }
  signOut()
  {
    this.setState({
      redirect:true
    })
  }
  loadScript(){
    const script = document.createElement("script");
    script.src = "../script.js";
    
    document.body.appendChild(script);
  }
  componentDidMount () {
    // const script = document.createElement("script");
    // script.src = "../script.js";
    // script.async = true;
    // document.body.appendChild(script);
}
  loadBody() {
    const { classes, theme } = this.props;
    const container =
      this.props.window !== undefined
        ? () => this.props.window().document.body
        : undefined;
    return (
      <div className={classes.root}>
        {this.state.redirect && (<Redirect to="/" />)}
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classes.appBar}
          style={{ backgroundColor: "#218F76", color: "white" }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={this.handleToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Welcome to User dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={this.state.open}
              onClose={this.handleToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {this.drawer()}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {this.drawer()}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Order />
        </main>
      </div>
    );
  }
  render() {
    return <div>{this.loadBody()}</div>;
    
  
  }
}

export default withStyles(useStyles)(withTheme(UserDashboard));
