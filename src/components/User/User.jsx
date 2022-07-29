import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { refreshToken } from "../../requests/auth";
import { getUserById } from "../../requests/userRequests";
import Avatar from "../Avatar/Avatar";
import UserActivity from "../UserActivity/UserActivity";

export default function User() {
  const { userId } = useParams();
  const [user, setUser] = useState(null)

  const getUser = () => {
    getUserById(userId).then((result) => {
      setUser(result.data.data)
    }).catch((error) => {
      if(error == "Unauthorized") {
        refreshToken(userId, localStorage.getItem("refreshKey"))
      }
    }).then((result) => {
      localStorage.setItem("tokenKey", result.data.accessToken)
    })
  }

  useEffect(() => {
    getUser()
  }, [user])

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        marginTop:"2rem"
      }}
    >
      <div style = {{marginInline:"2rem"}}>
        {user? <Avatar avatarId={user.avatar} userName ={user.userName} userId = {user.id} /> : ""}
      </div>
      <div style = {{marginInline:"2rem"}}>
        { localStorage.getItem("currentUser") === userId ? <UserActivity userId = {userId}/> : ""}
      </div>
    </div>
  );
}
