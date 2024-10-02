const apiRoutes = {
  // auth
  VERIFY_USERNAME: "/user/usernameVerification/:username",
  REGISTER_USER: "/user/register",
  LOGIN_USER: "/user/login",
  LOGOUT_USER: "/user/logout",
  BOOKMARK: "/user/bookmark",
  BOOKMARK_ARRAY: "/user/bookmarkArray",
  ADD_BOOKMARK : "/user/addBookmark/:slideId",
  REMOVE_BOOKMARK : "/user/removeBookmark/:slideId",
  REMOVE_BOOKMARK : "/user/removeBookmark/:slideId",
  OWN_STORIES : "/user/stories",
  LIKES : "/user/likes",

  // categories

  GET_CATEGORIES: "/category/categories",

  // story

  ADD_STORY: "/story/addStory",
  EDIT_STORY: "/story/updateStory",
  CATEGORY_STORIES : "/story/category/:category",
  ALL_STORY : "/story/stories",
  STORY : "/story/:storyId",

  // slide

  ADD_LIKE : "/slide/addLike/:slideId",
  REMOVE_LIKE : "/slide/removeLike/:slideId",
  DELETE_SLIDE : "/slide/delete/:slideId",

};

export { apiRoutes };
