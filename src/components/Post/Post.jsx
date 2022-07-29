import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CommentIcon from "@material-ui/icons/Comment";
import { Link } from "react-router-dom";
import { getCommentsByPostId } from "../../requests/commentRequest";
import {
  checkIfUserLikedPost,
  getLikeCount,
  likePost,
  removeLike,
} from "../../requests/likeRequest";
import { Container } from "@material-ui/core";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";

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

export default function Post(props) {
  const { title, text, createdAt, userName, userId, postId } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  // const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const isInitialMount = useRef(true);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  let disabled = localStorage.getItem("currentUser") == null ? true:false

  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComments();
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (isLiked) {
      deleteLike();
      setLikeCount(likeCount - 1);
    } else {
      saveLike();
      setLikeCount(likeCount + 1);
    }
  };
  const saveLike = () => {
    likePost({
      userId: userId,
      postId: postId,
    });
  };
  const deleteLike = () => {
    removeLike(userId, postId);
  };

  const refreshComments = () => {
    getCommentsByPostId(postId).then(
      (result) => {
        setComments(result.data.data);
        setIsLoaded(true);
      },
      (error) => {
        setError(error);
        setIsLoaded(true);
      }
    );
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      refreshComments();
    }
    getLikeCount(postId).then((result) => {
      setLikeCount(result.data);
    });
    if(localStorage.getItem("currentUser") != null) {
      checkIfUserLikedPost(userId, postId).then((result) => {
        setIsLiked(result.data);
      });
    }
  }, [comments]);

  return (
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
        title={title}
        subheader={createdAt}
      />

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleLike} disabled = {disabled}>
          <FavoriteIcon style={disabled ? null : isLiked ? { color: "red" } : null} />
        </IconButton>
        {likeCount}
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <CommentIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Container fixed className={classes.container}>
          {error
            ? "error"
            : isLoaded
            ? comments.map((comment) => (
                <Comment
                  userId={comment.userId}
                  userName={comment.userName}
                  text={comment.text}
                />
              ))
            : "Loading..."}
          {disabled ? null : (
            <CommentForm userName="Taylan" userId={userId} postId={postId} />
          )}
        </Container>
      </Collapse>
    </Card>
  );
}
