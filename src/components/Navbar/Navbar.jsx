import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign:"left"
  },
  link: {
    textDecoration: "none",
    color: "white",
    boxShadow: "noen",
  },
}));

export default function Navbar() {
  let userId = 5;
  const classes = useStyles();
  return (
    <nav className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.link}>
              Home
            </Link>
          </Typography>
          <Typography variant="h6">
            <Link
              to={{ pathname: "/users/" + userId }}
              className={classes.link}
            >
              User
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </nav>
  );
}
