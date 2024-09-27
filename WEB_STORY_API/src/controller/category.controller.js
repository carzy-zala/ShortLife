import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Category from "../model/category.model.js";

const allCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();

  if (categories.length === 0) {
    throw new ApiError(
      501,
      "ERROR :: There is no categories are available as of now !!"
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { categories }, "Category fetched succesfully !")
    );
});

export { allCategories };
