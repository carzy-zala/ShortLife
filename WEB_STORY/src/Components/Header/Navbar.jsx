import React from "react";
import "./Navbar.css";
import { Button } from "../../Components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBookmark } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const isLogin = true;
  return (
    <div className="navbar">
      {!isLogin && <div className="nav-div">
        <div>
          <Button
            className="nav-header-btn"
            style={{ backgroundColor: "#FF7373" }}
            children="Register Now"
          />
        </div>
        <div>
          <Button
            className="nav-header-btn"
            style={{ backgroundColor: "#73ABFF" }}
            children="Login"
          />
        </div>
      </div> }

      {isLogin &&   <div className="nav-user-div">
        <div>
          <Button
            className="nav-header-btn nav-header-bookmark-btn"
            style={{ backgroundColor: "#FF7373" }}
          >
            <FontAwesomeIcon icon={faBookmark} />
            Bookmarks
          </Button>
        </div>
        <div>
          <Button
            className="nav-header-btn"
            style={{ backgroundColor: "#FF7373" }}
            children="Add story"
          />
        </div>

        <div className="nav-header-profile"></div>

        <div>
          <FontAwesomeIcon icon={faBars} size="2xl"/>
        </div>
      </div> }
    </div>
  );
}

export default Navbar;
