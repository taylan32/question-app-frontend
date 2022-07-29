import React, { useState } from "react";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";
import { auth } from "../../requests/auth";
import { useHistory } from "react-router-dom";


export default function Auth() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();
  const handleUserName = (value) => {
    setUserName(value);
  };
  const handlePassword = (value) => {
    setPassword(value);
  };

  const sendRequest = (path) => {
    auth(
      {
        userName: userName,
        password: password,
      },
      path
    ).then((result) => {
      console.log(result);
      localStorage.setItem("tokenKey", result.data.accessToken);
      localStorage.setItem("currentUser", result.data.userId);
      localStorage.setItem("userName", userName);
      localStorage.setItem("refreshKey", result.data.refreshToken)
    });
  };

  const handleButton = (path) => {
    sendRequest(path);
    setUserName("");
    setPassword("");
    history.push("/")
    window.location.reload()
  };

  return (
    <div style={{ margin: "20%" }}>
      <FormControl>
        <InputLabel>Username</InputLabel>
        <Input onChange={(input) => handleUserName(input.target.value)} />
        <InputLabel style={{ top: 80 }}>Password</InputLabel>
        <Input
          style={{ top: 40 }}
          onChange={(input) => handlePassword(input.target.value)}
          type="password"
        />
        <Button
          variant="contained"
          style={{
            marginTop: "25%",
            background: "linear-gradient(45deg, #2190FA 30%, #21CBFF 70%)",
            color: "white",
          }}
          onClick={() => handleButton("register")}
        >
          Register
        </Button>
        <FormHelperText style={{ margin: 20 }}>
          Are you already registered?
        </FormHelperText>
        <Button
          variant="contained"
          style={{
            background: "linear-gradient(45deg, #2FBADD 20%, #21FFCA 80%)",
            color: "white",
          }}
          onClick={() => handleButton("login")}
        >
          Login
        </Button>
      </FormControl>
    </div>
  );
}
