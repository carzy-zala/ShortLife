import { asyncHandler } from "../utils/asyncHandler.js";
import Story from "../model/story.model.js";
import Category from "../model/category.model.js";
import Slide from "../model/slide.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const addStory = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const { category, slides } = req.body;

  const categoryId = await Category.findOne({ text: category }).select("_id");

  if (!categoryId) {
    throw new ApiError(400, "ERROR :: There is no such category exist ..!");
  }

  const createStory = await Story.create({
    category: categoryId,
    createdBy: _id,
  });

  if (!createStory) {
    throw new ApiError(
      500,
      "ERROR :: Something went wrong ehile creating story"
    );
  }

  slides.map(async (slide) => {
    const { heading, description, url } = slide;
    const slideCreate = await Slide.create({
      storyId: createStory._id,
      heading,
      description,
      url,
    });

    if (!slideCreate) {
      throw new ApiError(
        500,
        "ERROR :: Internal error while creating your slide !"
      );
    }
  });

  return res
    .status(200)
    .json(new ApiResponse(201, {}, "Story created succesfully ."));
});


export { addStory};
