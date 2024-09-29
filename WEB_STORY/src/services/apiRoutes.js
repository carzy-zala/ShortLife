const apiRoutes = {
  // auth
  VERIFY_USERNAME: "/user/usernameVerification/:username",
  REGISTER_USER: "/user/register",
  LOGIN_USER: "/user/login",
  LOGOUT_USER: "/user/logout",
  BOOKMARK: "/user/bookmark",

  // categories

  GET_CATEGORIES: "/category/categories",
};

export { apiRoutes };
