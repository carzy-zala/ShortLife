const apiRoutes = {
  // auth
  VERIFY_USERNAME: "/user/usernameVerification/:username",
  REGISTER_USER: "/user/register",
  LOGIN_USER: "/user/login",
  LOGOUT_USER: "/user/logout",
  BOOKMARK: "/user/bookmark",
  ADD_BOOKMARK : "/user/addBookmark",
  OWN_STORIES : "/user/stories",
  LIKES : "/user/likes",

  // categories

  GET_CATEGORIES: "/category/categories",

  // story

  ADD_STORY: "/story/addStory",
  CATEGORY_STORIES : "/story/category/:category",
  ALL_STORY : "/story/stories",
  STORY : "/story/:storyId",

  // slide

  ADD_LIKE : "/slide/addLike/:slideId",
  REMOVE_LIKE : "/slide/removeLike/:slideId",
};

export { apiRoutes };
