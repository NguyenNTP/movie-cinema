// import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children, Role}) => {
  // console.log(typeof Role)
  // console.log("checkRole ",Role)
  let user = localStorage.getItem("user")
  // console.log(user)
  // let parseUser = JSON.parse(user)
  if (user === null) {
    return <Navigate to = "/login"  replace/>
  }  else {
    return children
  }
};

export default PrivateRoute;
