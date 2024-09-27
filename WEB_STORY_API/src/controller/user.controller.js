import { User } from "../model/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Story from "../model/story.model.js"

//#region Token generation

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "ERROR :: Something went wrong while generating access and refresh tokens !!"
    );
  }
};

//#endregion

//#region username existance

const isUsernameExist = asyncHandler(async (req, res) => {
  const { username } = req.params;

  const isUserExist = await User.findOne({ username });

  if (isUserExist) {
    throw new ApiError(
      400,
      "ERROR :: Your desired username is already taken !!"
    );
  }

  return res
    .status(201)
    .json(new ApiResponse(201, "", "This username is availabel."));
});

//#endregion

//#region register user

const register = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!password || password.trim() === "") {
    throw new ApiError(400, "ERROR :: Password can't be empty !!");
  }

  const user = await User.create({
    username,
    password,
  });

  const createdUser = await User.findById(user._id);

  if (!createdUser) {
    throw new ApiError(
      500,
      "ERROR :: Something went wrong while registering the user"
    );
  }

  return res
    .status(201)
    .json(new ApiResponse(200, username, "User registered succesfully"));
});

//#endregion

//#region Login user

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (
    !username ||
    !password ||
    username.trim() === 0 ||
    password.trim() === 0
  ) {
    throw new ApiError(
      400,
      "ERROR :: Please enter your username and password !!"
    );
  }

  const user = await User.findOne({ username });

  if (!user) {
    throw new ApiError(400, "ERROR :: This username is doesn't exist !!");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "ERROR :: Invalid user credentials !");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken -bookmark"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          accessToken,
          refreshToken,
          user: loggedInUser,
        },
        "User logged in successfully"
      )
    );
});

//#endregion

const bookmark = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const bookmark = await User.findById(_id).select("bookmark");

  if (!bookmark) {
    throw new ApiError(400, "ERROR :: Error during fetching bookmark !");
  }

  res.status(200).json(new ApiResponse(200, { bookmark }, "Your bookmarks !"));
});

const addBookmark = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { slideId } = req.body;

  await User.findByIdAndUpdate(
    _id,
    {
      $push: { bookmark: slideId },
    },
    { new: true, useFindAndModify: false }
  );

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Added to bookmark succesfully !"));
});

const ownStories = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const stories = await Story.find({ createdBy: _id });

  res
    .status(200)
    .json(new ApiResponse(200, { stories }, "You created this much stories ."));
});

export { isUsernameExist, register, login, bookmark, addBookmark, ownStories };
