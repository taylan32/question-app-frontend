import React, { useEffect, useState } from "react";
import { getAllPosts } from "../../requests/postRequest";
import Post from "../Post/Post";
import { makeStyles } from "@material-ui/core/styles";
import PostForm from "../Post/PostForm";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f5ff",
  },
}));

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const classes = useStyles();

  const refreshPost = () => {
    getAllPosts().then(
      (result) => {
        setPosts(result.data.data);
        setIsLoaded(true);
      },
      (error) => {
        setError(error);
        setIsLoaded(true);
      }
    );
  };

  useEffect(() => {
    refreshPost();
  }, [posts]);

  if (error) {
    return (
      <div>
        <ul style={{ listStyle: "none" }}>
          <li>{error.response?.data.message}</li>
          <li>{error.response?.data.error}</li>
          <li>{error.response?.data.status}</li>
        </ul>
      </div>
    );
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className={classes.container}>
        { localStorage.getItem("currentUser") == null ? null:<PostForm
          userName={localStorage.getItem("userName")}
          userId={localStorage.getItem("currentUser")}
          refreshPost={refreshPost}
        />}
        {posts.map((post) => (
          <Post
            title={post.title}
            createdAt={post.createdAt}
            text={post.text}
            userName={post.userName}
            userId={localStorage.getItem("currentUser")}
            postId={post.id}
            key={post.id}
          />
        ))}
      </div>
    );
  }
}
