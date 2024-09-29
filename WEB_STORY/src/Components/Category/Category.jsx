import React from "react";
import { useSelector } from "react-redux";
import FilterCard from "../FilterCard/FilterCard";
import "./Category.css";
import { useParams } from "react-router-dom";
import StoryCard from "../StoryCard/StoryCard";

function Category({}) {
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
  
  const { category } = useParams();

  return (
    <div className="category-webstory-main-div">
      <div className="category-webstory-category">
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

      <div>
        <div className="category-webstory-stories-detail">
          <div className="category-webstory-stories-title">
            Top Stories About {`${category}`}
          </div>

          <div className="category-webstory-stories">
            {stories.map((story, index) => {
              return (
                <StoryCard
                  key={index}
                  url={story.url}
                  heading={story.heading}
                  description={story.description}
                  isImage={story.isImage}
                  isVideo={story.isVideo}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
