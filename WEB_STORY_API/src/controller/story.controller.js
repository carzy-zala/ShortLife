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

const updateStory = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const { category, slides, storyId } = req.body;

  // category update
  const categoryId = await Category.findOne({ text: category }).select("_id");

  await Story.findByIdAndUpdate(
    storyId,
    { category: categoryId },
    { new: true }
  );

  await Slide.deleteMany({ storyId: storyId });
  // slide update

  slides.map(async (slide) => {
    const { heading, description, url } = slide;
    const slideCreate = await Slide.create({
      storyId,
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
    .json(new ApiResponse(201, {}, "Story updated succesfully ."));
});

const categoryStories = asyncHandler(async (req, res) => {
  const { category } = req.params;

  const categoryId = await Category.findOne({ text: category }).select("_id");

  if (!categoryId) {
    throw new ApiError(400, "ERROR :: Can't get your category !");
  }

  const page = parseInt(req.query.page) || 1;

  

  const skip = (page - 1) * 12;

  

  const storiesId = await Story.find({ category: categoryId })
    .select("_id")
    .sort({ _id: 1 })
    .skip(skip)
    .limit(12);

  if (storiesId.length) {
    const storiesSlide = storiesId.map(async (storyId) => {
      return await Slide.findOne({ storyId: storyId._id }).select(
        "heading description url storyId"
      );
    });

    const stories = await Promise.all(storiesSlide);

    res
      .status(200)
      .json(
        new ApiResponse(200, { category, stories }, `Stories of ${category}`)
      );
  } else {
    throw new ApiError(500, "ERROR :: Interanal server error !");
  }
});

const allStories = asyncHandler(async (req, res) => {
  const categories = await Category.find();

  const categoryStories = categories.map(async (category) => {
    const categoryStories = await Story.find({ category: category._id })
      .limit(12)
      .select("_id");

    const storySlide = categoryStories.map(async (story) => {
      return await Slide.findOne({ storyId: story._id });
    });

    const storiesWithSlide = await Promise.all(storySlide);

    return {
      category: category.text,
      slides: storiesWithSlide,
    };
  });

  const stories = await Promise.all(categoryStories);

  res
    .status(200)
    .json(
      new ApiResponse(200, { stories }, "Your stories fetched succesfully !")
    );
});

const story = asyncHandler(async (req, res) => {
  const { storyId } = req.params;

  const slides = await Slide.find({ storyId: storyId }).sort({ _id: -1 });

  const story = await Story.findById(storyId);

  const category = await Category.findById(story.category);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { category: category.text, slides },
        "Story fetched succesfully !"
      )
    );
});

export { addStory, categoryStories, allStories, story, updateStory };
