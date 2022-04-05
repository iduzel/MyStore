import React from "react";
import { Routes, Route } from "react-router-dom";
import Demo from "./pages/demo/Demo";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import EmailConfirm from "./components/email/EmailConfirm";
import ForgotPass from "./pages/forgotPass/ForgotPass";
import ChangePass from "./pages/changePass/ChangePass";
import EmployeeList from "./components/employee/EmployeeList";
import Employee from "./components/employee/Employee";
import GLogin from "./components/GLogin";

const Paths = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/employee" element={<Employee />} />
      <Route path="/employeeList" element={<EmployeeList />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path='/glogin/:id' exact element={<GLogin />}/>
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/emailconfirm/:token" element={<EmailConfirm />} />
      <Route path="/forgotpassword" element={<ForgotPass />} />
      <Route path="/changepassword/:token" element={<ChangePass />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/*" element={<Unknown />} />
    </Routes>
  );
};

function Unknown() {
  return <div>Error 404 | Page not found!</div>;
}

export default Paths;
