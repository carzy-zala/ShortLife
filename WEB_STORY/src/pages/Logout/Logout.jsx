import React, { useEffect } from "react";
import { Button } from "../../Components";
import "./Logout.css";
import { CanceledError } from "axios";

function Logout({ cancelHandle, logoutUser }) {
  const handleLogout = () => {    
    logoutUser();
    cancelHandle(false);
  };

  return (
    <div className="logout-main-div">
      <div className="logout-div">
        <div className="logout-text">Are you sure you want to logout ?</div>
        <div className="logout-below-btns">
          <div>
            <Button
              children="Cancel"
              className="logout-below-btn"
              onClick={() => cancelHandle(false)}
            />
          </div>
          <div>
            <Button
              children="Confirm"
              className="logout-below-btn"
              style={{
                backgroundColor: "#0c970c",
                color: "#fff",
                letterSpacing: "0.1rem",
              }}
              onClick={handleLogout}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logout;
