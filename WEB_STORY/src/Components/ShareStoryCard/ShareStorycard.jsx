import React, { useEffect, useState } from "react";
import "./ShareStoryCard.css";
import { Button } from "../../Components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faGreaterThan,
  faHeart,
  faLessThan,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { axiosGet } from "../../services/axios.config";
import { apiRoutes } from "../../services/apiRoutes";
import { useNavigate, useParams } from "react-router-dom";

function ShareStoryCard() {
  const navigate = useNavigate();
  const { storyId, slideIndex } = useParams();

  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(parseInt(slideIndex));
  const [currentSlideLoader, setCurrentSlideLoader] = useState(
    parseInt(slideIndex)
  );

  const [isShareClick, setIsShareClick] = useState(false);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    (async () =>
      await axiosGet(
        `${import.meta.env.VITE_HOST_API_URL}${apiRoutes.STORY}`.replace(
          ":storyId",
          storyId
        )
      ).then((response) => {
        setSlides(response.data.slides);
      }))();
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
    if (currentSlideLoader !== slides.length) {
      setCurrentSlideLoader(currentSlideLoader + 1);
    }
  }, 15000);

  return (
    slides.length && (
      <div className="portal-div">
        <div key={slides[currentSlide]._id} className="sharestorycard-main-div">
          <div>
            <Button
              className="sharestorycard-arraow-btns"
              onClick={() => {
                if (currentSlide) {
                  setCurrentSlide(currentSlide - 1);
                  setCurrentSlideLoader(currentSlide - 1);
                }
              }}
            >
              <img src="/src/assets/leftArrow.svg" />
            </Button>
          </div>

          <div className="sharestorycard-story-div">
            {
              <img
                src={slides[currentSlide].url}
                className="sharestorycard-image"
              />
            }
            {/*isVideo*/}

            <div className="sharestorycard-header">
              <div className="sharestorycard-loader-div">
                {slides.map((slide, index) => {
                  return (
                    <div
                      key={slide._id}
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

              <div className="sharestorycard-header-btns">
                <Button
                  className="sharestorycard-header-btn"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faXmark}
                    size="2xl"
                    style={{ color: "#fff" }}
                  />
                </Button>
                <Button
                  className="sharestorycard-header-btn"
                  onClick={() => handleShare(1)}
                >
                  <img src="/src/assets/send.svg" alt="share" />
                </Button>
              </div>
            </div>

            <div className="sharestorycard-bottom">
              {isShareClick && (
                <div className="sharestorycard-bottom-copy-link">
                  Link copied to clipboard
                </div>
              )}
              <div style={{ gridRow: "2" }}>
                <div className="sharestorycard-detail-heading">
                  {slides[currentSlide].heading}
                </div>
                <div className="sharestorycard-detail-description">
                  {slides[currentSlide].description}
                </div>
              </div>

              <div
                className="sharestorycard-lower-btn-div"
                style={{ gridRow: "3" }}
              >
                <div>
                  <Button
                    className={`sharestorycard-lower-btns `}
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
                    className={`sharestorycard-lower-btns sharestorycard-like-btn  `}
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
              className="sharestorycard-arraow-btns"
              onClick={() => {
                if (currentSlide < slides.length - 1) {
                  setCurrentSlide(currentSlide + 1);
                  setCurrentSlideLoader(currentSlideLoader + 1);
                }
              }}
            >
              <img src="/src/assets/rightArrow.svg" />
            </Button>
          </div>
        </div>
      </div>
    )
  );
}

export default ShareStoryCard;
