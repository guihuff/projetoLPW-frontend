import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { isAuthenticated } from "./Services/auth";
import Home from "./Pages/Home";
import Login from "./Pages/Login";

const PrivateRoute = ({ children, redirectTo }) => {
  return isAuthenticated() ? children : <Navigate to={redirectTo}/>
};

const RouterApp = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/app" element={<PrivateRoute redirectTo={"/login"}><h1>Está logado</h1></PrivateRoute>} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes> 
    </BrowserRouter>
  )
}

export default RouterApp;