import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Bookmarks from "../pages/Admin/bookmark/Bookmarks";
import { Category, ShowStoryCard } from "../Components";
import ShareStoryCard from "../Components/ShareStoryCard/ShareStorycard";
import Ownstory from "../pages/Admin/Ownstories/Ownstory";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/All",
        element: <Home />,
      },
      {
        path: "/bookmark",
        element: <Bookmarks />,
      },
      {
        path: "/ownstories",
        element: <Ownstory />,
      },

      {
        path: "/:category",
        element: <Category />,
      },
    ],
  },

  {
    path: "/:storyId/:slideIndex",
    element: <ShareStoryCard />,
  },

  ,
]);
