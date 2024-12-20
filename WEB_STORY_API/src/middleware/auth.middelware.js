import {User} from "../model/user.model.js";
import  ApiError  from "../utils/ApiError.js";
import  {asyncHandler}  from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");    
          

      

    if (!token) {
      throw new ApiError(401, "ERROR :: Unauthorized request !!");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?.id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "ERROR :: Invalid access token !!");
    }
    
    req.user = user;
    next();    
    
  } catch (error) {
    throw new ApiError(
      401,
      error?.message || "ERROR :: Invalid access token !!"
    );
  }
});
