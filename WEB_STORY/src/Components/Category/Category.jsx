import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FilterCard from "../FilterCard/FilterCard";
import "./Category.css";
import { useParams } from "react-router-dom";
import StoryCard from "../StoryCard/StoryCard";
import { axiosGet } from "../../services/axios.config";
import { apiRoutes } from "../../services/apiRoutes";
import Loader from "../Loader/Loader";

function Category({}) {
  const categories = useSelector((store) => store.categories.categories) || [];

  const [stories, setStories] = useState([]);
  const { category, index } = useParams();

  useEffect(() => {
    (async () => {
      const response = await axiosGet(
        `${import.meta.env.VITE_HOST_API_URL}${
          apiRoutes.CATEGORY_STORIES
        }`.replace(":category", category)
      ).then((response) => response.data.stories);

      setStories(response);
    })();
  }, [category]);

  return (
    stories.length && (
      <div className="category-webstory-main-div">
        <div className="category-webstory-category">
          <FilterCard currentFilterIndex={index} categoryText={category} />
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
                    isImage={true}
                    isVideo={story.isVideo}
                    storyId={story.storyId}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Category;
