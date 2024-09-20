import React, { Children, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button } from "../../Components";
import "./Auth.css";

function Auth({ children }) {
  const { register, handleSubmit } = useForm();

  const [isShow, setIsShow] = useState(false);

  const handleShowPassword = () => {
    setIsShow(!isShow);
  };

  return (
    <div className="auth-card">
      <div className="auth-form-cancel-div">
        <Button className="auth-form-cancel">
          <img src="src/assets/authCancel.svg" />
        </Button>
      </div>
      
      <div className="auth-form-heading">{children}</div>
      
      <div>
        <form onSubmit={handleSubmit}>
          <div className="auth-form-grid">
            <label className="auth-label">Username</label>
            <Input className="auth-input-field" placeholder="Enter username" />
            <label className="auth-label">Password</label>
            <div className="auth-input-field-div">
              <Input
                className="auth-input-field-password"
                placeholder="Enter password"
                type={`${isShow ? "text" : "password"}`}
              />
              <Button className="auth-eye-btn" onClick={handleShowPassword}>
                <img src="src/assets/showpass.svg" />
              </Button>
            </div>

            <div className="auth-form-submit-btn-div">
              <Button
                type="submit"
                className="auth-form-submit-btn"
                children={children}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Auth;
