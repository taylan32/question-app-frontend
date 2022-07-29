import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Dialog from "@material-ui/core/Dialog";
import TableRow from "@material-ui/core/TableRow";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { getUserActivity } from "../../requests/userRequests";
import {
  AppBar,
  Button,
  IconButton,
  TableCell,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Post from "../Post/Post";
import { getPostById } from "../../requests/postRequest";
import { refreshToken } from "../../requests/auth";

const useStyles = makeStyles({
  root: {
    width: "100%",
    margin: "0 auto",
    padding: "1rem",
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
  },
  container: {
    maxHeight: 440,
  },
  tableRow: {
    display: "block",
    padding: "0.5rem",
    border: 0,
  },
  appBar: {
    position: "relative",
  },
  title: {
    flex: 1,
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function PopUp(props) {
  const { isOpen, postId, setIsOpen } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [post, setPost] = useState();

  const getPost = () => {
    getPostById(postId).then((result) => {
      setPost(result.data.data);
    })
  };

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    getPost();
  }, [postId]);

  const handleClose = () => {
    setOpen(false);
    setIsOpen(false);
  };

  return post != null ? (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Close
          </Typography>
        </Toolbar>
      </AppBar>
      <Post
        postId={post.id}
        userId={post.userId}
        userName={post.userName}
        title={post.title}
        text={post.text}
      />
    </Dialog>
  ) : (
    "Loding"
  );
}

export default function UserActivity(props) {
  const classes = useStyles();
  const { userId } = props;
  const [rows, setRows] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const getActivity = () => {
    getUserActivity(userId).then((result) => {
      setIsLoaded(true);
      setRows(result.data.data);
    }).catch((error) => {
      if(error == "Unauthorized") {
        refreshToken(userId, localStorage.getItem("refreshKey"))
      }
    }).then((result) => {
      localStorage.setItem("tokenKey", result.data.accessToken)
    })
  };

  const handleNotification = (id) => {
    setSelectedPost(id);
    setIsOpen(true);
  };

  useEffect(() => {
    getActivity();
  }, []);

  return (
    <div>
      {isOpen ? (
        <PopUp isOpen={isOpen} postId={selectedPost} setIsOpen={setIsOpen} />
      ) : (
        ""
      )}
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>User Activity</TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                return (
                  <Button
                    className={classes.tableRow}
                    onClick={() => handleNotification(row[1])}
                  >
                    <TableRow role="checkbox" tabIndex={-1} key={row.code}>
                      <TableCell>
                        {row[3] + " " + row[0] + " your post"}
                      </TableCell>
                    </TableRow>
                  </Button>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
