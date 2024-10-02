import React, { useEffect, useState } from "react";
import { apiRoutes } from "../../../services/apiRoutes";
import { axiosGet } from "../../../services/axios.config";
import axios from "axios";
import setToken from "../../../utils/setToken";
import { StoryCard } from "../../../Components";
import "./Ownstory.css";
import { useSelector } from "react-redux";

function Ownstory() {

  const [ownstories, setownstories] = useState(
    useSelector((store) => store.user.ownstories)
  );

  return (
    <div className="ownstory-webstory-main-div">
      <div className="ownstory-heading">Your Stories</div>

      <div className="ownstory-webstory-stories">
        {ownstories.length > 0 ? (
          ownstories.map((ownstory) => {
            return (
              <StoryCard
                url={ownstory.url}
                heading={ownstory.heading}
                description={ownstory.description}
                key={ownstory._id}
                isImage={true}
                storyId={ownstory.storyId}
                slide_id={ownstory._id}
                isLogin={true}
              />
            );
          })
        ) : (
          <div className="webstory-no-content-error">
            No story created by you
          </div>
        )}
      </div>
    </div>
  );
}

export default Ownstory;
