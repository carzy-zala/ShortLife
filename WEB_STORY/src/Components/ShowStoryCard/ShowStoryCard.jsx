import React, { useEffect, useState } from "react";
import "./ShowStoryCard.css";
import { Button } from "../../Components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faHeart } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { axiosGet } from "../../services/axios.config";
import { apiRoutes } from "../../services/apiRoutes";

function ShowStoryCard({
  storyId,

  cancelHandle,
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentSlideLoader, setCurrentSlideLoader] = useState(0);

  const [isShareClick, setIsShareClick] = useState(false);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    (async () =>
      await axiosGet(
        `${import.meta.env.VITE_HOST_API_URL}${apiRoutes.STORY}`.replace(
          ":storyId",
          storyId
        )
      ).then((response) => setSlides(response.data.slides)))();
  }, []);

  const handleShare = (slideIndex) => {
    setIsShareClick(true);

    setTimeout(() => {
      setIsShareClick(false);
    }, 3000);

    const storyUrl = `${window.location.origin}/${storyId}/${slideIndex}`;

    window.navigator.clipboard.writeText(storyUrl);
  };

  setTimeout(() => {
    if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1);
    if (currentSlideLoader !== slides.length)
      setCurrentSlideLoader(currentSlideLoader + 1);
  }, 15000);

  return (
    slides.length && (
      <div key={slides[currentSlide]._id} className="showstorycard-main-div">
        <div>
          <Button
            className="showstorycard-arraow-btns"
            onClick={() => {
              if (currentSlide) {
                setCurrentSlide(currentSlide - 1);
                setCurrentSlideLoader(currentSlide - 1);
              }
            }}
          >
            <img src="src/assets/leftArrow.svg" />
          </Button>
        </div>

        <div className="showstorycard-story-div">
          {
            <img
              src={slides[currentSlide].url}
              className="showstorycard-image"
            />
          }
          {/*isVideo*/}

          <div className="showstorycard-header">
            <div className="showstorycard-loader-div">
              {slides.map((slide, index) => {
                return (
                  <div
                    className={`loader-line ${
                      index < currentSlideLoader && "loader-line-completed"
                    }
                     ${
                       currentSlideLoader === index && "loader-line-transition"
                     }`}
                  ></div>
                );
              })}
            </div>

            <div className="showstorycard-header-btns">
              <Button
                className="showstorycard-header-btn"
                onClick={() => {
                  cancelHandle(false);
                }}
              >
                <img src="src/assets/cancel.svg" />
              </Button>
              <Button
                className="showstorycard-header-btn"
                onClick={() => handleShare(currentSlide)}
              >
                <img src="src/assets/send.svg" />
              </Button>
            </div>
          </div>

          <div className="showstorycard-bottom">
            {isShareClick && (
              <div
                className="showstorycard-bottom-copy-link"
                style={{ gridRow: "1" }}
              >
                Link copied to clipboard
              </div>
            )}
            <div style={{ gridRow: "2" }}>
              <div className="showstorycard-detail-heading">
                {slides[currentSlide].heading}
              </div>
              <div className="showstorycard-detail-description">
                {slides[currentSlide].description}
              </div>
            </div>

            <div
              className="showstorycard-lower-btn-div"
              style={{ gridRow: "3" }}
            >
              <div>
                <Button
                  className={`showstorycard-lower-btns `}
                  style={{ paddingLeft: "2rem" }}
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  <FontAwesomeIcon
                    icon={faBookmark}
                    size="2xl"
                    style={{ color: `${isBookmarked ? "#085cff" : "#fff"}` }}
                  />
                </Button>
              </div>
              <div>
                <Button
                  className={`showstorycard-lower-btns showstorycard-like-btn  `}
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <FontAwesomeIcon
                    icon={faHeart}
                    size="2xl"
                    style={{ color: `${isLiked ? "#ff0000" : "#fff"}` }}
                  />
                  <div>{`${slides[currentSlide].likes}`}</div>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Button
            className="showstorycard-arraow-btns"
            onClick={() => {
              if (currentSlide !== slides.length) {
                setCurrentSlide(currentSlide + 1);
                setCurrentSlideLoader(currentSlide + 1);
              }
            }}
          >
            <img src="src/assets/rightArrow.svg" />
          </Button>
        </div>
      </div>
    )
  );
}

export default ShowStoryCard;
