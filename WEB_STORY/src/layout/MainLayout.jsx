import React, { Fragment, useEffect } from "react";
import { Navbar } from "../Components";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCategory } from "../feature/categorySlice";
import axios from "axios";
import setToken from "../utils/setToken";

function MainLayout() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategory());
  }, []);

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

  return (
    <Fragment>
      <Navbar />
      <Outlet />
    </Fragment>
  );
}

export default MainLayout;
