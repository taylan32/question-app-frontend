import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  CardContent,
  InputAdornment,
  OutlinedInput,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { createComment } from "../../requests/commentRequest";
import { refreshToken } from "../../requests/auth";

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

export default function CommentForm(props) {
  const { userId, userName, postId } = props;
  const classes = useStyles();

  const [text, setText] = useState("");

  const saveComment = () => {
    createComment({
      userId: userId,
      postId: postId,
      text: text,
    }).catch((error) => {
      if(error == "Unauthorized") {
        refreshToken(userId, localStorage.getItem("refreshKey"))
      }
    })
  };
  const handleText = (value) => {
    setText(value);
  };
  const handleSubmit = () => {
    saveComment()
    setText("");
  };

  return (
    <CardContent className={classes.comment}>
      <OutlinedInput
        id="outlined-adornment-amount"
        multiline
        fullWidth
        value= {text}
        inputProps={{ maxLength: 250 }}
        onChange={(input) => handleText(input.target.value)}
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
        endAdornment={
          <InputAdornment position="end">
            <Button
              variant="contained"
              style={{
                background: "linear-gradient(45deg, #2196F3 20%, #21CBF3 80%)",
                color: "white",
              }}
              onClick={handleSubmit}
            >
              Comment
            </Button>
          </InputAdornment>
        }
      />
    </CardContent>
  );
}
