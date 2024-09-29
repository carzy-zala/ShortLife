import React, { useState } from "react";
import "./ShowStoryCard.css";
import { Button } from "../../Components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faHeart } from "@fortawesome/free-solid-svg-icons";

function ShowStoryCard({
  url,
  heading,
  description,
  isVideo = false,
  isImage = false,
}) {

  const isLiked = true;
  const isBookmarked = true;
  const current = 3;

  const [isShareClick, setIsShareClick] = useState(false);

  const handleShare = () => {
    setIsShareClick(true);

    setTimeout(() => {
      setIsShareClick(false);
    }, 3000);
  };

  return (
    <div className="showstorycard-main-div">
      <div>
        <Button
          className="showstorycard-arraow-btns"
          onClick={() => {
            console.log("arrow left click");
          }}
        >
          <img src="src/assets/leftArrow.svg" />
        </Button>
      </div>

      <div className="showstorycard-story-div">
        {isImage && <img src={url} className="showstorycard-image" />}
        {isVideo}

        <div className="showstorycard-header">
          <div className="showstorycard-loader-div">
            <div
              className={`loader-line ${1 < 3 && "loader-line-completed"}
                 ${current === 1 && "loader-line-transition"}`}
            ></div>
            <div
              className={`loader-line ${2 < 3 && "loader-line-completed"}
                 ${current === 2 && "loader-transition"}`}
            ></div>
            <div
              className={`loader-line ${3 < 3 && "loader-line-completed"}
                 ${current === 3 && "loader-transition"}`}
            ></div>
          </div>

          <div className="showstorycard-header-btns">
            <Button className="showstorycard-header-btn">
              <img src="src/assets/cancel.svg" />
            </Button>
            <Button className="showstorycard-header-btn" onClick={handleShare}>
              <img src="src/assets/send.svg" />
            </Button>
          </div>
        </div>

        <div className="showstorycard-bottom">
          {isShareClick && (
            <div className="showstorycard-bottom-copy-link">
              Link copied to clipboard
            </div>
          )}

          <div style={{ gridRow: "2" }}>
            <div className="showstorycard-detail-heading">{heading}</div>
            <div className="showstorycard-detail-description">
              {description}
            </div>
          </div>

          <div className="showstorycard-lower-btn-div" style={{ gridRow: "3" }}>
            <div>
              <Button
                className={`showstorycard-lower-btns `}
                style={{ paddingLeft: "2rem" }}
              >
                <FontAwesomeIcon
                  icon={faBookmark}
                  size="2xl"
                  style={{ color: `${isLiked && "#085cff"}` }}
                />
              </Button>
            </div>
            <div>
              <Button
                className={`showstorycard-lower-btns showstorycard-like-btn  `}
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  size="2xl"
                  style={{ color: `${isLiked && "#ff0000"}` }}
                />
                <div>1206</div>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Button
          className="showstorycard-arraow-btns"
          onClick={() => {
            console.log("arrow right click");
          }}
        >
          <img src="src/assets/rightArrow.svg" />
        </Button>
      </div>
    </div>
  );
}

export default ShowStoryCard;
