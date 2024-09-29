import React, { useEffect, useState } from "react";
import "./Navbar.css";
import "./NavbarLaptop.css";
import { Button } from "..";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBookmark } from "@fortawesome/free-solid-svg-icons";
import Auth from "../../pages/auth/Auth";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import Logout from "../../pages/Logout/Logout";
import { reset } from "../../feature/useSlice";
import setToken from "../../utils/setToken";
import { persistor } from "../../store/store.js";
import AddStory from "../../pages/Admin/AddStory/AddStory.jsx";
import {useNavigate} from "react-router-dom"

function Navbar() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const nevigate = useNavigate();

  const [isRegisterClick, setIsRegisterClick] = useState(false);
  const [isLoginClick, setIsLoginClick] = useState(false);
  const [isLogoutClick, setIsLogoutClick] = useState(false);
  const [isHamburgClick, setIsHamburgClick] = useState(false);
  const [isAddStoryClick, setIsAddStoryClick] = useState(false);

  const handleLogout = () => {
    setToken();
    persistor.purge();
    dispatch(reset());
  };

  return (
    <div className="navbar">
      {!user.isAuthenticated && (
        <div className="nav-div">
          <div>
            <Button
              className="nav-header-btn"
              style={{ backgroundColor: "#FF7373" }}
              children="Register Now"
              onClick={() => {
                if (!isLoginClick) setIsRegisterClick(true);
              }}
            />
          </div>
          <div>
            <Button
              className="nav-header-btn"
              style={{ backgroundColor: "#73ABFF" }}
              children="Login"
              onClick={() => {
                if (!isRegisterClick) setIsLoginClick(true);
              }}
            />
          </div>
        </div>
      )}
      {user.isAuthenticated && (
        <div className="nav-user-div">
          <div>
            <Button
              className="nav-header-btn nav-header-bookmark-btn"
              style={{ backgroundColor: "#FF7373" }}
              onClick={() => {nevigate("/bookmark")}}
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
              onClick={() => setIsAddStoryClick(true)}
            />
          </div>

          <div className="nav-header-profile">
            <img src={user.avatar} className="avatar" />
          </div>

          <div className="nav-header-hamburg-btn">
            <Button
              style={{
                border: "none",
                backgroundColor: "transparent",
                padding: "0.5rem",
              }}
              onClick={() => setIsHamburgClick(!isHamburgClick)}
            >
              <FontAwesomeIcon icon={faBars} size="2xl" />
            </Button>

            <div
              className={`nav-header-hamburg-btn-div ${
                isHamburgClick && "nav-header-hamburg-btn-div-show"
              }`}
            >
              <div className="nav-header-hamburg-username">{user.username}</div>
              <div>
                <Button
                  className="nav-header-hamburg-logout-btn"
                  children="Logout"
                  onClick={() => {
                    setIsHamburgClick(false);
                    setIsLogoutClick(true);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {isRegisterClick &&
        !isLoginClick &&
        createPortal(
          <div className="portal-div">
            <Auth title="Register" cancelHandel={setIsRegisterClick} />
          </div>,
          document.body
        )}

      {isLoginClick &&
        !isRegisterClick &&
        createPortal(
          <div className="portal-div">
            <Auth title="Login" cancelHandel={setIsLoginClick} />
          </div>,
          document.body
        )}

      {isLogoutClick &&
        createPortal(
          <Logout cancelHandle={setIsLogoutClick} logoutUser={handleLogout} />,
          document.body
        )}

      {isAddStoryClick &&
        createPortal(
          <div className="portal-div">
            <AddStory cancelHandle={setIsAddStoryClick} />
          </div>,
          document.body
        )}
    </div>
  );
}

export default Navbar;
