import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Bookmarks from "../pages/Admin/bookmark/Bookmarks";
import { Category } from "../Components";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "bookmark",
        element: <Bookmarks />,
      },
      {
        path: "/:category",
        element: <Category />,
      },
    ],
  },

  ,
]);
