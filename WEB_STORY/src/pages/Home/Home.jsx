import React, { useEffect } from "react";
import "./Home.css";
import { Button, FilterCard, StoryCard } from "../../Components";
import { useSelector } from "react-redux";
import setToken from "../../utils/setToken";

function Home() {
  const isAuthenticated = useSelector((store) => store.user.isAuthenticated);

  const categories = useSelector((store) => store.categories.categories) || [];

  const stories = [
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_Fqa1zGrADMg4kKba6B2OdEZZ-ZgBYbTw3g&s",
      heading: "Story sample heading",
      description:
        "Story sample description Story sample description Story sample discription",
      isVideo: false,
      isImage: true,
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_Fqa1zGrADMg4kKba6B2OdEZZ-ZgBYbTw3g&s",
      heading: "Story sample heading",
      description:
        "Story sample description Story sample description Story sample discription",
      isVideo: false,
      isImage: true,
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_Fqa1zGrADMg4kKba6B2OdEZZ-ZgBYbTw3g&s",
      heading: "Story sample heading",
      description:
        "Story sample description Story sample description Story sample discription",
      isVideo: false,
      isImage: true,
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_Fqa1zGrADMg4kKba6B2OdEZZ-ZgBYbTw3g&s",
      heading: "Story sample heading",
      description:
        "Story sample description Story sample description Story sample discription",
      isVideo: false,
      isImage: true,
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_Fqa1zGrADMg4kKba6B2OdEZZ-ZgBYbTw3g&s",
      heading: "Story sample heading",
      description:
        "Story sample description Story sample description Story sample discription",
      isVideo: false,
      isImage: true,
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_Fqa1zGrADMg4kKba6B2OdEZZ-ZgBYbTw3g&s",
      heading: "Story sample heading",
      description:
        "Story sample description Story sample description Story sample discription",
      isVideo: false,
      isImage: true,
    },
  ];

  return (
    <div className="home-main-div">
      <div className="home-webstory-category">
        {categories.map((category) => {
          return (
            <div key={category.text}>
              <FilterCard
                childrenImage={category.imageUrl}
                childrenText={category.text}
              />
            </div>
          );
        })}
      </div>

      {isAuthenticated && (
        <div className="home-webstory-stories-detail">
          <div className="home-webstory-stories-title">Your stories</div>

          <div className="home-webstory-stories">
            {stories.map((story, index) => {
              return (
                index < 4 && (
                  <StoryCard
                    key={index}
                    url={story.url}
                    heading={story.heading}
                    description={story.description}
                    isImage={story.isImage}
                    isVideo={story.isVideo}
                    isLogin={true}
                  />
                )
              );
            })}
          </div>

          <div className="home-webstory-stories-more-div">
            {stories.length > 4 && (
              <Button
                className="home-webstory-stories-more"
                children="See more"
              />
            )}
          </div>
        </div>
      )}

      {categories.length &&
        categories.map((category, index) => {
          return (
            index && (
              <div className="home-webstory-stories-detail">
                <div className="home-webstory-stories-title">
                  Top Stories About {`${category.text}`}
                </div>

                <div className="home-webstory-stories">
                  {stories.map((story, index) => {
                    return (
                      index < 4 && (
                        <StoryCard
                          key={index}
                          url={story.url}
                          heading={story.heading}
                          description={story.description}
                          isImage={story.isImage}
                          isVideo={story.isVideo}
                        />
                      )
                    );
                  })}
                </div>

                <div className="home-webstory-stories-more-div">
                  {stories.length > 4 && (
                    <Button
                      className="home-webstory-stories-more"
                      children="See more"
                    />
                  )}
                </div>
              </div>
            )
          );
        })}
    </div>
  );
}

export default Home;
