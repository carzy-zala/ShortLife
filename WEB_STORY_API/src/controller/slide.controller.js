import Slide from "../model/slide.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const likeCount = asyncHandler(async (req, res) => {
  const { slideId } = req.params;

  const likeCount = await Slide.findById(slideId).select("likes -_id");

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { likes: likeCount.likes },
        "Total like of slide is fetched succesfully"
      )
    );
});

const addLike = asyncHandler(async (req, res) => {
  const { slideId } = req.params;

  await Slide.findByIdAndUpdate(
    slideId,
    { $inc: { likes: 1 } },
    { new: true, useFindAndModify: false }
  );

  res.status(200).json(new ApiResponse(200, {}, "Like added succesfully ."));
});

export { likeCount, addLike };
