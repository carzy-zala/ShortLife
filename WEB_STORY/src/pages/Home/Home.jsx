import React, { useEffect, useState } from "react";
import "./Home.css";
import { Button, FilterCard, StoryCard } from "../../Components";
import { useSelector } from "react-redux";
import setToken from "../../utils/setToken";

function Home() {
  const isAuthenticated = useSelector((store) => store.user.isAuthenticated);

  const categories = useSelector((store) => store.categories.categories) || [];

  const stories = useSelector((store) => store.story.stories) || [];

  const ownstories = useSelector((store) => store.user.ownstories) || [];

  const [currentFilter, setCurrentFilter] = useState(0);

  const [visibleReel, setVisibleReel] = useState(4);

  const handleShowMore = () => {
    setVisibleReel(visibleReel + 4);
  };

  return (
    <div className="home-main-div">
      <div className="home-webstory-category">
        <FilterCard />
      </div>

      {isAuthenticated && (
        <div className="home-webstory-stories-detail">
          <div className="home-webstory-stories-title">Your stories</div>

          <div className="home-webstory-stories">
            {ownstories.slice(0, visibleReel).map((story, index) => {
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
            {stories.length > 4 && (
              <Button
                className="home-webstory-stories-more"
                children="See more"
                onClick={handleShowMore}
              />
            )}
          </div>
        </div>
      )}

      {stories.length &&
        stories.map((story, index) => {
          return (
            <div
              className="home-webstory-stories-detail"
              key={`${story._id}.${story.category}`}
            >
              <div className="home-webstory-stories-title">
                Top Stories About {`${story.category}`}
              </div>

              <div className="home-webstory-stories">
                {story.slides.map((slide, index) => {
                  return (
                    index < 4 && (
                      <StoryCard
                        storyId={story.storyId}
                        key={`${slide._id}.${index}`}
                        url={slide.url}
                        heading={slide.heading}
                        description={slide.description}
                        isImage={true}
                        isVideo={slide.isVideo}
                      />
                    )
                  );
                })}
              </div>

              <div className="home-webstory-stories-more-div">
                {story.slides.length > 4 && (
                  <Button
                    className="home-webstory-stories-more"
                    children="See more"
                  />
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Home;
