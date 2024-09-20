import React from "react";
import "./StoryCard.css";
import { Button } from "../../Components";

function StoryCard({
  url,
  heading,
  description,
  isVideo = false,
  isImage = false,
}) {

  return (
    <div className="storycard-main-div">
      <Button
        className="storycard-main-btn"
        onClick={() => {
          console.log("click story");
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
              console.log("click edit");
            }}
          />
        </div>
      )}
    </div>
  );
}

export default StoryCard;
