import React, { useEffect, useState } from "react";
import "./ShowStoryCard.css";
import { Button } from "../../Components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faHeart } from "@fortawesome/free-solid-svg-icons";
import { axiosGet, axiosPatch } from "../../services/axios.config";
import { apiRoutes } from "../../services/apiRoutes";
import Auth from "../../pages/auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { likes } from "../../feature/useSlice";

function ShowStoryCard({ storyId, cancelHandle }) {
  const isAuthenticated = useSelector((store) => store.user.isAuthenticated);

  const like = useSelector((store) => store.user.like);
  const dispatch = useDispatch();

  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [isLiked, setIsLiked] = useState(
    !!slides.length &&
      !!like.length &&
      !!like.includes(slides[currentSlide]._id)
  );
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [currentSlideLoader, setCurrentSlideLoader] = useState(0);
  const [isLoginShow, setIsLoginShow] = useState(false);

  const [isShareClick, setIsShareClick] = useState(false);

  const handleLike = (slideId) => {
    if (!isLiked) {
      (async () =>
        await axiosPatch(
          `${import.meta.env.VITE_HOST_API_URL}${apiRoutes.ADD_LIKE}`.replace(
            ":slideId",
            slideId
          )
        ).then((response) => {
          setIsLiked(true);
        }))();
    } else {
      (async () =>
        await axiosPatch(
          `${import.meta.env.VITE_HOST_API_URL}${
            apiRoutes.REMOVE_LIKE
          }`.replace(":slideId", slideId)
        ).then((response) => {
          setIsLiked(false);
        }))();
    }
  };

  useEffect(() => {
    (async () =>
      await axiosGet(
        `${import.meta.env.VITE_HOST_API_URL}${apiRoutes.STORY}`.replace(
          ":storyId",
          storyId
        )
      ).then((response) => {
        setSlides(response.data.slides);
        dispatch(likes());
      }))();
  }, [setIsLiked, isLiked]);

  const handleShare = (slideIndex) => {
    setIsShareClick(true);

    setTimeout(() => {
      setIsShareClick(false);
    }, 3000);

    const storyUrl = `${window.location.origin}/${storyId}/${slideIndex}`;

    window.navigator.clipboard.writeText(storyUrl);
  };

  setTimeout(() => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
      setIsLiked(!!like.includes(slides[currentSlide+1]._id));
    }
    if (currentSlideLoader < slides.length)
      setCurrentSlideLoader(currentSlideLoader + 1);
  }, 15000);

  return (
    <div>
      {slides.length && !isLoginShow && (
        <div key={slides[currentSlide]._id} className="showstorycard-main-div">
          <div>
            <Button
              className="showstorycard-arraow-btns"
              onClick={() => {
                if (currentSlide) {
                  setCurrentSlide(currentSlide - 1);
                  setCurrentSlideLoader(currentSlide - 1);
                  setIsLiked(!!like.includes(slides[currentSlide-1]._id))
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
                    onClick={() => {
                      if (isAuthenticated) {
                        handleLike(slides[currentSlide]._id);
                      } else setIsLoginShow(true);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faHeart}
                      size="2xl"
                      style={{ color: `${isLiked ? "#ff0000" : "#fff"}` }}
                    />
                    <div>{`${slides[currentSlide].likes}`} </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Button
              className="showstorycard-arraow-btns"
              onClick={() => {
                if (currentSlide < slides.length - 1) {
                  setCurrentSlide(currentSlide + 1);
                  setCurrentSlideLoader(currentSlide + 1);
                  setIsLiked(!!like.includes(slides[currentSlide+1]._id))
                }
              }}
            >
              <img src="src/assets/rightArrow.svg" />
            </Button>
          </div>
        </div>
      )}

      {isLoginShow && <Auth title="Login" cancelHandel={setIsLoginShow} />}
    </div>
  );
}

export default ShowStoryCard;
