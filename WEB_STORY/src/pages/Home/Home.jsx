import React, { useEffect, useState } from "react";
import "./Home.css";
import { Button, FilterCard, Loader, StoryCard } from "../../Components";
import { useDispatch, useSelector } from "react-redux";
import setToken from "../../utils/setToken";
import { addStoriesToCategory } from "../../feature/storySlice";

function Home() {
  const isAuthenticated = useSelector((store) => store.user.isAuthenticated);

  const stories = useSelector((store) => store.story.stories) || [];

  const ownstories = useSelector((store) => store.user.ownstories) || [];

  const [visibleReel, setVisibleReel] = useState({});

  const dispatch = useDispatch();

  const handleShowMore = (category) => {
    if (
      category &&
      setVisibleReel[category] &&
      setVisibleReel[category] % 12 === 0
    ) {
      const page = setVisibleReel[category] / 12;
      dispatch(addStoriesToCategory(category, page));
    }

    if (!category) {
      const tempCategory = "ownstories";
      setVisibleReel((prev) => ({
        ...prev,
        [tempCategory]: (prev[tempCategory] || 4) + 4,
      }));
    } else {
      setVisibleReel((prev) => ({
        ...prev,
        [category]: (prev[category] || 4) + 4,
      }));
    }
  };

  return (
    <div className="home-main-div">
      <div className="home-webstory-category">
        <FilterCard />
      </div>

      {isAuthenticated && (
        <div className="home-webstory-stories-detail home-webstory-stories-owntories">
          <div className="home-webstory-stories-title">Your stories</div>

          <div className="home-webstory-stories">
            {ownstories
              .slice(0, visibleReel["ownstories"] || 4)
              .map((story, index) => {
                return (
                  <StoryCard
                    storyId={story.storyId}
                    key={story._id}
                    url={story.url}
                    heading={story.heading}
                    description={story.description}
                    isImage={true}
                    isVideo={story.isVideo}
                    isLogin={true}
                  />
                );
              })}
          </div>

          <div className="home-webstory-stories-more-div">
            {ownstories.length > 4 &&
              ownstories.length > (visibleReel["ownstories"] || 4) && (
                <Button
                  key="ownstories"
                  className="home-webstory-stories-more"
                  children="See more"
                  onClick={() => handleShowMore(0)}
                />
              )}
          </div>
        </div>
      )}

      {stories.length ? (
        stories.map((story, index) => {
          const visible = visibleReel[story.category] || 4;
          return (
            <div
              className="home-webstory-stories-detail  "
              key={`${story._id}.${story.category}`}
            >
              {story.category && (
                <div className="home-webstory-stories-title">
                  Top Stories About {`${story.category}`}
                </div>
              )}
              
              <div className="home-webstory-stories">
                {!story.slides.length ? (
                  <div className="no-story">
                    <span>No stories available</span>
                  </div>
                ) : (
                  story.slides.slice(0, visible).map((slide, index) => {
                    return (
                      <StoryCard
                        storyId={slide.storyId}
                        key={`${slide._id}.${index}`}
                        url={slide.url}
                        heading={slide.heading}
                        description={slide.description}
                        isImage={true}
                        isVideo={slide.isVideo}
                      />
                    );
                  })
                )}
              </div>
              <div
                className="home-webstory-stories-more-div"
                key={story.category}
              >
                {story.slides.length > 4 && story.slides.length > visible && (
                  <Button
                    className="home-webstory-stories-more"
                    children="See more"
                    onClick={() => handleShowMore(story.category)}
                  />
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div className="portal-div">
          <div
            style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "1rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Loader backgroundColor="blue" />
            <div>Please wait ! </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
