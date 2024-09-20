import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button, Input, Select } from "../../../Components";
import "./AddStory.css";

function AddStory() {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      stories: [
        {
          heading: "",
          description: "",
          url: "",
        },
        {
          heading: "",
          description: "",
          url: "",
        },
        {
          heading: "",
          description: "",
          url: "",
        },
        {
          heading: "",
          description: "",
          url: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "stories",
  });

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleDeleteSlide = (index) => {
    remove(index);
  };

  const handleChangeSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleAddSlide = () => {
    append({
      heading: "",
      description: "",
      url: "",
    });
  };

  const handlePostStory = (data) => {
    console.log(data);
  };

  return (
    <div className="addstory-story-main-div">
      <div className="addstory-story-div-cancel">
        <Button className="addstory-story-div-cancel-btn">
          <img src="src/assets/slideCancel.svg" height="25px" width="25px" />
        </Button>
      </div>
      <div className="addstory-story-no-information">Add upto 6 slides</div>

      <div className="addstory-story-cards">
        {fields.map((_, index) => {
          return (
            <div
              key={index}
              className={`addstory-story-card ${
                currentSlide === index && "addstory-story-card-selected"
              }`}
            >
              <Button
                children={`Slide ${index + 1}`}
                className="addstory-story-slide-btn"
                onClick={() => handleChangeSlide(index)}
              />
              {index > 2 && (
                <Button
                  className="addstory-story-slide-cancel-btn"
                  onClick={() => handleDeleteSlide(index)}
                >
                  <img
                    src="src/assets/slideCancel.svg"
                    className="addstory-story-slid-cancel-img"
                  />
                </Button>
              )}
            </div>
          );
        })}

        {fields.length < 6 && (
          <div className={`addstory-story-card`} onClick={handleAddSlide}>
            <Button children="Add +" className="addstory-story-slide-btn" />
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit(handlePostStory)}>
        <div className="addstory-story-form-div">
          <div className="addstory-story-form">
            <label className="addstory-story-form-label">Heading :</label>
            <Input
              key={`fields.${currentSlide}.heading`}
              className="addstory-story-form-input"
              placeholder="Your Heading"
              {...register(`fields.${currentSlide}.heading`, {
                required: `Please enter heading in ${currentSlide + 1} slide`,
              })}
            />
            <label className="addstory-story-form-label">Description :</label>

            <textarea
              key={`fields.${currentSlide}.description`}
              name="postContent"
              rows={4}
              cols={40}
              className="addstory-story-form-input addstory-story-form-input-description"
              placeholder="Story Description"
              {...register(`fields.${currentSlide}.description`)}
            />
            <label className="addstory-story-form-label">
              Image/Video Link :
            </label>
            <Input
              key={`fields.${currentSlide}.url`}
              className="addstory-story-form-input"
              placeholder="Add Image or Video Link"
              {...register(`fields.${currentSlide}.url`, {
                required: `Please enter heading in ${currentSlide + 1} slide`,
              })}
            />
            <label className="addstory-story-form-label">Category :</label>
            <Select />
          </div>

          <div className="addstory-story-btns">
            <div className="addstory-story-navigation-btns">
              <div>
                <Button
                  children="Previous"
                  className="addstory-story-navigation-btn addstory-story-navigation-prev-btn"
                />
              </div>
              <div>
                <Button
                  children="Next"
                  className="addstory-story-navigation-btn addstory-story-navigation-next-btn"
                />
              </div>
            </div>
            <div className="addstory-story-create-btn">
              <Button
                children="Post"
                className="addstory-story-navigation-btn addstory-story-navigation-post-btn"
                type="submit"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddStory;
