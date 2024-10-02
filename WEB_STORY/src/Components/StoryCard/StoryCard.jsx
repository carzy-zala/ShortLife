import React, { useEffect, useState } from "react";
import "./StoryCard.css";
import "./StoryMobileCard.css";
import { Button, ShowStoryCard } from "../../Components";
import { createPortal } from "react-dom";
import AddStory from "../../pages/Admin/AddStory/AddStory";
import { useDispatch } from "react-redux";
import { fetchOwnStories } from "../../feature/useSlice";
import axios from "axios";
import setToken from "../../utils/setToken";

function StoryCard({
  url,
  heading,
  description,
  storyId,
  isVideo = false,
  isImage = false,
  isLogin = false,
  slide_id = "",
}) {
  const [storyClick, setIsStoryClick] = useState(false);
  const [isEditClick, setIsEditClick] = useState(false);

  const dispatch = useDispatch();

  function fetchStories() {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setToken(accessToken);
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      dispatch(fetchOwnStories());
    }
  }

  useEffect(() => {
    fetchStories();
  }, [isEditClick]);

  return (
    <div className="storycard-margin">
      <div className="storycard-main-div">
        <Button
          className="storycard-main-btn"
          onClick={() => {
            setIsStoryClick(true);
          }}
        >
          {isImage && <img src={url} className="storycard-image" />}
          {isVideo}

          <div className="storycard-header"></div>

          <div
            className={`storycard-bottom ${isLogin && "storycard-edit-bottom"}`}
          >
            <div>
              <div className="heading">{heading}</div>
              <div className="description">{description}</div>
            </div>
          </div>
        </Button>

        {isLogin && (
          <div className="storycard-edit-btn-div">
            <Button
              children={
                <div className="storycard-edit-btn-inner-content">
                  <img src="src/assets/edit.svg" /> Edit
                </div>
              }
              className="storycard-edit-btn"
              onClick={() => {
                setIsEditClick(true);
              }}
            />
          </div>
        )}
      </div>
      {storyClick &&
        createPortal(
          <div className="portal-div">
            <ShowStoryCard
              storyId={storyId}
              cancelHandle={setIsStoryClick}
              slide_id={slide_id}
            />
          </div>,
          document.body
        )}

      {isEditClick &&
        createPortal(
          <div className="portal-div">
            <AddStory
              cancelHandle={setIsEditClick}
              isEdit={true}
              storyId={storyId}
            />
          </div>,
          document.body
        )}
    </div>
  );
}

export default StoryCard;
