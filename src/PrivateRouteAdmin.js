// import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRouteAdmin = ({children, Role}) => {
  // console.log(typeof Role)
  // console.log("checkRole ",Role)
  let user = localStorage.getItem("user")
  // console.log(user)
  let parseUser = JSON.parse(user)

if(user && parseUser.Role === Role) {
    return children
} else {
      return <Navigate to = "/"  replace/>

  }
};

export default PrivateRouteAdmin;
