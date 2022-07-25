import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  CardContent,
  InputAdornment,
  OutlinedInput,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  comment: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  link: {
    textDecoration: "none",
    boxShadow: "none",
    color: "white",
  },
  avatar: {
    background: "linear-gradient(45deg, #2196F3 20%, #21CBF3 80%)",
    color: "white",
  },
}));

export default function Comment(props) {
  const { text, userId, userName } = props;
  const classes = useStyles();
  return (
    <CardContent className={classes.comment}>
      <OutlinedInput
        disabled
        id="outlined-adornment-amount"
        multiline
        value={text}
        fullWidth
        startAdornment={
          <InputAdornment position="start">
            <Avatar aria-label="recipe" className={classes.avatar}>
              <Link
                to={{ pathname: "/users/" + userId }}
                className={classes.link}
              >
                {userName[0].toUpperCase()}
              </Link>
            </Avatar>
          </InputAdornment>
        }
      />
    </CardContent>
  );
}
