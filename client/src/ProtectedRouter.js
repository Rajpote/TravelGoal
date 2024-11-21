import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

// public protection
function ProtectedRouter() {
   const { userInfo } = useSelector((state) => state.userLogin);
   return userInfo?.token ? <Outlet /> : <Navigate to="/login" />;
}

// admin router protection
function AdminProtectedRouter() {
   const { userInfo } = useSelector((state) => state.userLogin);

   return userInfo?.token ? (
      userInfo?.isAdmin ? (
         <Outlet />
      ) : (
         <Navigate to="/*" /> // Fixed the closing quote here
      )
   ) : (
      <Navigate to="/login" />
   );
}

export { ProtectedRouter, AdminProtectedRouter };
