import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  text: {
    type: String,
    requierd: true,
  },
  imageUrl: {
    type: String,
    requierd: true,
  },
});

const Category = model("Category", categorySchema);

export default Category;
