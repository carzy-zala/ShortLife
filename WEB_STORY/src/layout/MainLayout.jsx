import React, { Fragment, useEffect } from "react";
import { Navbar } from "../Components";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../feature/categorySlice";
import axios from "axios";
import setToken from "../utils/setToken";
import { fetchStories } from "../feature/storySlice";
import { fetchOwnStories } from "../feature/useSlice";

function MainLayout() {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((store) => store.user.isAuthenticated);

  useEffect(() => {
    const accesstoken = localStorage.getItem("accessToken");
    const refreshtoken = localStorage.getItem("refreshToken");

    if (accesstoken) {
      axios.defaults.headers.common.Authorization = `Bearer ${accesstoken}`;

      refreshtoken
        ? setToken(accesstoken, refreshtoken)
        : setToken(accesstoken);
    }
  }, []);

  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchStories());
    if (isAuthenticated) dispatch(fetchOwnStories());
  }, []);

  

  return (
    <Fragment>
      <Navbar />
      <Outlet />
    </Fragment>
  );
}

export default MainLayout;
