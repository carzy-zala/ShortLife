import React, { useEffect, useState } from "react";
import { apiRoutes } from "../../../services/apiRoutes";
import { axiosGet } from "../../../services/axios.config";
import axios from "axios";
import setToken from "../../../utils/setToken";
import { StoryCard } from "../../../Components";
import "./Bookmarks.css";

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);

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

  const fetchBookmark = async () => {
    const bookmarkUrl = `${import.meta.env.VITE_HOST_API_URL}${
      apiRoutes.BOOKMARK
    }`;

    const response = await axiosGet(bookmarkUrl).then((response) => response);

    if (response.success) {
      setBookmarks(response.data.bookmark);
    }
  };

  useEffect(() => {
    (async () => await fetchBookmark())();
  }, []);

  return (
    <div className="bookmark-webstory-main-div">
      <div className="bookmark-heading">Your Bookmarks</div>

      <div className="bookmark-webstory-stories">
        {bookmarks.length > 0 &&
          bookmarks.map((bookmark) => {
            return (
              <StoryCard
                url={bookmark.url}
                heading={bookmark.heading}
                description={bookmark.description}
                key={bookmark._id}
                isImage={true}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Bookmarks;
