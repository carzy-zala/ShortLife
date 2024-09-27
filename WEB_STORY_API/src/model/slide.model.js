import { Schema, model } from "mongoose";

const slideSchema = new Schema({
  heading: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  storyId: {
    type: Schema.Types.ObjectId,
    ref: "Story",
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

export const Slide = model("Slide", slideSchema);

export default Slide