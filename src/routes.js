import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { isAuthenticated } from "./Services/auth";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Orders from "./Pages/Orders";
import OneOrder from "./Pages/OneOrder";

const PrivateRoute = ({ children, redirectTo }) => {
  return isAuthenticated() ? children : <Navigate to={redirectTo}/>
};

const RouterApp = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/orders" element={<PrivateRoute redirectTo={"/login"}><Orders /></PrivateRoute>} />
          <Route path="/order/:id" element={<PrivateRoute redirectTo={"/login"}><OneOrder /></PrivateRoute>} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes> 
    </BrowserRouter>
  )
}

export default RouterApp;