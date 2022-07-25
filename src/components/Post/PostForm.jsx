import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { Button, InputAdornment, OutlinedInput } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { createPost } from "../../requests/postRequest";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: 800,
    margin: 20,
    textAlign: "left",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    ransform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  avatar: {
    background: "linear-gradient(45deg, #2196F3 20%, #21CBF3 80%)",
    color: "white",
  },
  link: {
    textDecoration: "none",
    color: "white",
    boxShadow: "none",
  },
}));

export default function PostForm(props) {
  const { userName, userId, refreshPost } = props;
  const classes = useStyles();
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [createMessage, setCreateMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const handleTitle = (value) => {
    setTitle(value);
    setIsSent(false);
  };
  const handleText = (value) => {
    setText(value);
    setIsSent(false);
  };

  const savePost = () => {
    createPost({
      title: title,
      userId,
      text: text,
    }).then((result) => {
      setIsSuccess(result.data.isSuccess);
      setCreateMessage(result.data.message);
    });
  };
  const handleSubmit = () => {
    savePost();
    setIsSent(true);
    setTitle("");
    setText("");
    refreshPost();
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSent(false);
  };

  return (
    <div>
      <Snackbar open={isSent} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={isSuccess !== true ? "success" : "error"}
        >
          {createMessage}
        </Alert>
      </Snackbar>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              <Link
                to={{ pathname: "/users/" + userId }}
                className={classes.link}
              >
                {userName[0].toUpperCase()}
              </Link>
            </Avatar>
          }
          title={
            <OutlinedInput
              id="outlined-adornment-amount"
              multiline
              placeholder="Title"
              onChange={(input) => handleTitle(input.target.value)}
              value={title}
              inputProps={{ maxLength: 50 }}
              fullWidth
            />
          }
        />

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {
              <OutlinedInput
                id="outlined-adornment-amount"
                multiline
                placeholder="Text"
                inputProps={{ maxLength: 250 }}
                fullWidth
                onChange={(input) => handleText(input.target.value)}
                value={text}
                endAdornment={
                  <InputAdornment position="end">
                    <Button
                      variant="contained"
                      style={{
                        background:
                          "linear-gradient(45deg, #2196F3 20%, #21CBF3 80%)",
                        color: "white",
                      }}
                      onClick={handleSubmit}
                    >
                      Post
                    </Button>
                  </InputAdornment>
                }
              />
            }
          </Typography>
        </CardContent>
        <CardActions disableSpacing></CardActions>
        <Collapse>
          <CardContent></CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
