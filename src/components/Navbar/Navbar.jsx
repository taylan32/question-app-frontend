import React from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { LockOpen } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "left",
  },
  link: {
    textDecoration: "none",
    color: "white",
    boxShadow: "noen",
  },
}));

export default function Navbar() {
  const classes = useStyles();
  let history = useHistory()
  const handleLogout = () => {
    localStorage.removeItem("tokenKey")
    localStorage.removeItem("currentUser")
    localStorage.removeItem("userName")
    history.push("/")
    window.location.reload()
  }

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
            {localStorage.getItem("currentUser") == null ? (
              <Link to="/auth" className={classes.link}>
                Login / Register
              </Link>
            ) : (
              <div>
                <IconButton onClick={ handleLogout}>
                  <LockOpen></LockOpen>
                </IconButton>
                <Link
                  to={{
                    pathname: "/users/" + localStorage.getItem("currentUser"),
                  }}
                  className={classes.link}
                >
                  Profile
                </Link>
              </div>
            )}
          </Typography>
        </Toolbar>
      </AppBar>
    </nav>
  );
}
