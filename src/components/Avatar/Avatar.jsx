import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  Radio,
} from "@material-ui/core";
import { changeAvatar } from "../../requests/userRequests";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  modal: {
    display: "flex",
    maxWidth: "12rem",
  },
});

export default function Avatar(props) {
  const { avatarId, userName, userId } = props;
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(avatarId);

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    saveAvatar();
  };

  const saveAvatar = () => {
    changeAvatar(userId, selectedValue);
  };

  return (
    <div>
      <Card className={classes.root}>
        <CardMedia
          className=""
          component="img"
          alt="User avatar"
          image={`/avatars/avatar${selectedValue}.png`}
          title="User avatar"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {userName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            User info
          </Typography>
        </CardContent>

        {userId == localStorage.getItem("currentUser") ? (
          <CardActions>
            <Button size="small" color="primary" onClick={handleOpen}>
              Change avatar
            </Button>
          </CardActions>
        ) : (
          ""
        )}
      </Card>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <List dense>
          {[1, 2, 3, 4, 5, 6].map((key) => {
            const labelId = `checkbox-list-secondary-label-${key}`;
            return (
              <ListItem key={key} button>
                <CardMedia
                  style={{ maxWidth: 100 }}
                  component="img"
                  alt={`Avatar${key}`}
                  image={`/avatars/avatar${key}.png`}
                  title="User avatar"
                />
                <ListItemSecondaryAction>
                  <Radio
                    edge="end"
                    value={key}
                    onChange={(input) => handleChange(input.target.value)}
                    checked={"" + selectedValue === "" + key}
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </Modal>
    </div>
  );
}
