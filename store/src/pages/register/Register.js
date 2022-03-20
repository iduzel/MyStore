import React, { useState } from "react";
import "./Register.scss";
import { useNavigate } from "react-router";

export default function Register() {
  const [userPH, setUserPH] = useState(`  Username`);
  const [emailPH, setEmailPH] = useState(`  Email`);
  const [passwordPH, setPaswrdPH] = useState("  Password");

  const navigate = useNavigate();

  const handleNaviSignIn = () => {
    navigate("/login");
  };

  return (
    <div className="register">
      <div className="bg-img"></div>

      <div className="register-main">
        <div className="side"></div>
        <form className="form">
          <div className="logo">
            <img
              className="logo-image"
              src="https://media.istockphoto.com/photos/leaf-symbol-green-black-picture-id693694672?b=1&k=20&m=693694672&s=170667a&w=0&h=_B5pyXi5TjexGcH6FbN2IiJy2Qa6fKqs-2KG0gb5Zy8="
              alt="logo"
            />
          </div>
          <h3 className="title">SIGN UP</h3>
          <input
            className="input input-user"
            type="text"
            placeholder={userPH}
            onFocus={() => setUserPH("")}
            onBlur={() => setUserPH("  Username")}
          />
          <input
            className="input input-email"
            type="text"
            placeholder={emailPH}
            onFocus={() => setEmailPH("")}
            onBlur={() => setEmailPH("  Email")}
          />
          <input
            className="input input-pass"
            type="text"
            placeholder={passwordPH}
            onFocus={() => setPaswrdPH("")}
            onBlur={() => setPaswrdPH("  Password")}
          />
          <input
            className="input input-pass"
            type="text"
            placeholder="  Confirm Password"
            /* onFocus={() => setPaswrdPH("")}
            onBlur={() => setPaswrdPH("  Password")} */
          />
          <div className="checkbox-div">
            <input
              className=" input-checkbox"
              for="check-remember"
              type="checkbox"
            />
            <label className="checkbox-label" id="check-remember">
              Remember me
            </label>
          </div>

          <button className="login-button" type="submit">
            Sign Up
          </button>
          <div className="forgot">
            <small>Forgot Password</small>
          </div>
          <div className="no-account">
            <small>
              Already have an account !{" "}
              <span onClick={handleNaviSignIn}>Sign In</span>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
}
