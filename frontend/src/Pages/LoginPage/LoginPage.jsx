import React from "react";
import "./style.css";

export const LoginPage = () => {
  return (
    <div className="login-page">
      <div className="background-image">
            <div className="login-box">
              <div className="background">
                <div className="div">
                  <div className="loginbox-shadow" />
                  <div className="loginbox-color"></div>

                </div>
              </div>

              <div className="title-text-container">
                <div className="loginbox-subtitle-wrapper">Sign into your account</div>

                <div className="loginbox-title-wrapper">Welcome Back!</div>
              </div>

              <button className="login-button">
                <div className="login-button-wrapper">
                  <div className="login-button-text-wrapper">Login</div>
                </div>
              </button>

              <div className="register-button">
                <div className="register-button-color">
                  <div className="register-account-text-wrapper">Register New Account</div>
                </div>
              </div>

              <div className="loginbox-forgot-password-wrapper">Forgot username or password?</div>

              <div className="username-box">
                <div className="input-box-color">
                  <div className="line" />

                  <div className="usernamebox-text-wrapper">Username</div>

                  <img
                    className="user-icon"
                    alt="User Icon"
                    src="public/assets/user.png"
                  />
                </div>
              </div>

              <div className="password-box">
                <div className="input-box-color">
                  <div className="line" />

                  <div className="password-text-wrapper">Password</div>

                  <img
                    className="password-icon"
                    alt="Password icon"
                    src="public/assets/keyicon.png"
                  />
                </div>
              </div>
            </div>
      </div>
    </div>
  );
};
