import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button, Input } from "../../../Components";
import "./AddStory.css";
import { toast } from "react-toastify";
import {
  axiosDelete,
  axiosGet,
  axiosPatch,
  axiosPost,
} from "../../../services/axios.config";
import { apiRoutes } from "../../../services/apiRoutes";
import { useSelector } from "react-redux";
import MediaQuery from "react-responsive";

function AddStory({ cancelHandle, isEdit = false, storyId = "" }) {

  const [deleteArray, setDeleteArray] = useState([]);


  const [intialState, setIntialState] = useState({
    category: "",
    slides: [
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
  });

  const { register, handleSubmit, control, reset, watch } = useForm({
    defaultValues: intialState,
  });

  useEffect(() => {
    if (isEdit) {
      (async () =>
        await axiosGet(
          `${import.meta.env.VITE_HOST_API_URL}${apiRoutes.STORY}`.replace(
            ":storyId",
            storyId
          )
        ).then((response) => {
          const { category, slides } = response.data;

          setIntialState({ category, slides });
          reset({ category, slides });
        }))();
    }
  }, [setIntialState, setDeleteArray]);

  const [_, ...allOptions] = useSelector(
    (store) => store.categories.categories
  );

  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions([{ text: "Select Category" }, ...allOptions]);
  }, [setOptions]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "slides",
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);


  const handleDeleteSlide = (index) => {
    if (isEdit) {
      setDeleteArray((prev) => [...prev, fields[index]._id]);
      remove(index);
    } else {
      remove(index);
    }
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

  const isSlideDataValid = (data) => {
    const { category, slides } = data;

    if (!category || category === "Select Category") {
      toast.error(`Please elect one category among the provided category !`);
      setIsLoading(false);
      return false;
    }

    for (let i = 0; i < slides.length; i++) {
      if (!slides[i].heading || slides[i].heading.trim() === "") {
        toast.error(`Please enter heading of slide in ${i + 1} slide`);
        setIsLoading(false);
        return false;
      }

      if (!slides[i].description || slides[i].description.trim() === "") {
        toast.error(`Please enter description of slide in ${i + 1} slide`);
        setIsLoading(false);
        return false;
      }

      if (!slides[i].url || slides[i].url.trim() === "") {
        toast.error(`Please enter url of slide in ${i + 1} slide`);
        setIsLoading(false);
        return false;
      } else {
        if (!handleURLValidation(slides[i].url, i)) {
          return false;
        }
      }
    }

    return true;
  };

  const handleURLValidation = (url, i) => {
    let flag = true;
    fetch(url, { method: "HEAD" })
      .then((response) => {
        const contentType = response.headers.get("Content-Type");

        if (
          contentType.startsWith("image/") ||
          contentType.startsWith("video/")
        ) {
          if (contentType.startsWith("video/")) {
            const videoElement = document.createElement("video");
            videoElement.src = url;

            videoElement.onloadedmetadata = () => {
              const duration = Math.floor(videoElement.duration);

              if (duration > 16) {
                flag = false;
                toast.error(
                  `Please make sure video is less than 15 sec in ${
                    i + 1
                  } slide !`
                );
              }
            };
          }
        } else {
          flag = false;
          toast.error(
            `Please enter either image link or video link in ${i + 1} slide !`
          );
        }
      })
      .catch((error) => {
        toast.error("Please enter public link");
        flag = false;
      });

    return flag;
  };

  const handleEditStory = (data) => {
    if (deleteArray.length) {
      (async () => {
        const deleteArrayAll = deleteArray.map(async (id) => {
          await axiosDelete(
            `${import.meta.env.VITE_HOST_API_URL}${
              apiRoutes.DELETE_SLIDE
            }`.replace(":slideId", id)
          ).then((response) => response);
        });

        const all = await Promise.all(deleteArrayAll);
      })();
    }

    (async () => {
      const storyURL = `${import.meta.env.VITE_HOST_API_URL}${
        apiRoutes.EDIT_STORY
      }`;

      await axiosPatch(storyURL, {
        category: data.category,
        slides: data.slides,
        storyId,
      }).then((response) => {
        if (response.success) {
          toast.success(response.message);
          cancelHandle(false);
        }
      });
    })();
  };

  const handlePostStory = (data) => {
    // handling error

    if (!isLoading) {
      setIsLoading(true);

      if (isSlideDataValid(data)) {
        if (isEdit) {
          handleEditStory(data);
        } else {
          (async () => {
            const storyURL = `${import.meta.env.VITE_HOST_API_URL}${
              apiRoutes.ADD_STORY
            }`;
            await axiosPost(storyURL, {
              category: data.category,
              slides: data.slides,
            }).then((response) => {
              if (response.success) {
                toast.success(response.message);
                cancelHandle(false);
              }
            });
          })();
        }
      }
      setIsLoading(false);
      // cancelHandle(false);
    }
  };

  return (
    <div>
      <MediaQuery minWidth="769px">
        <div className="addstory-story-main-div">
          <div className="addstory-story-div-cancel">
            <Button
              className="addstory-story-div-cancel-btn"
              onClick={() => cancelHandle(false)}
            >
              <img src="/assets/slideCancel.svg" height="25px" width="25px" />
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
                        src="/assets/slideCancel.svg"
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
                  key={`slides.${currentSlide}.heading`}
                  className="addstory-story-form-input"
                  placeholder="Your Heading"
                  {...register(`slides.${currentSlide}.heading`)}
                />
                <label className="addstory-story-form-label">
                  Description :
                </label>

                <textarea
                  key={`slides.${currentSlide}.description`}
                  name="postContent"
                  rows={4}
                  cols={40}
                  className="addstory-story-form-input addstory-story-form-input-description"
                  placeholder="Story Description"
                  {...register(`slides.${currentSlide}.description`)}
                />
                <label className="addstory-story-form-label">
                  Image/Video Link :
                </label>
                <Input
                  key={`slides.${currentSlide}.url`}
                  className="addstory-story-form-input"
                  placeholder="Add Image or Video Link"
                  {...register(`slides.${currentSlide}.url`)}
                />
                <label className="addstory-story-form-label">Category :</label>
                <select
                  {...register("category")}
                  className="select-drop-down-box"
                  defaultValue="Food"
                >
                  {options.map((option) => (
                    <option
                      key={option.text}
                      value={option.text}
                      className="option"
                    >
                      {option.text}
                    </option>
                  ))}
                </select>
              </div>

              <div className="addstory-story-btns">
                <div className="addstory-story-navigation-btns">
                  <div>
                    <Button
                      children="Previous"
                      className="addstory-story-navigation-btn addstory-story-navigation-prev-btn"
                      onClick={() =>
                        setCurrentSlide((prev) => (prev > 0 ? prev - 1 : 0))
                      }
                    />
                  </div>
                  <div>
                    <Button
                      children="Next"
                      className="addstory-story-navigation-btn addstory-story-navigation-next-btn"
                      onClick={() =>
                        setCurrentSlide((prev) =>
                          prev < fields.length - 1 ? prev + 1 : prev
                        )
                      }
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
      </MediaQuery>
      <MediaQuery maxWidth="768px">
        <div className="addstory-story-main-mobile-div">
          <div className="addstory-story-div-cancel">
            <Button
              className="addstory-story-div-cancel-btn"
              onClick={() => cancelHandle(false)}
            >
              <img src="/assets/slideCancel.svg" height="25px" width="25px" />
            </Button>
          </div>

          <div className="addstory-story-inner-mobile-div-grid">
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
                          src="/assets/slideCancel.svg"
                          className="addstory-story-slid-cancel-img"
                        />
                      </Button>
                    )}
                  </div>
                );
              })}

              {fields.length < 6 && (
                <div className={`addstory-story-card`} onClick={handleAddSlide}>
                  <Button
                    children="Add +"
                    className="addstory-story-slide-btn"
                  />
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit(handlePostStory)}>
              <div className="addstory-story-mobile-form-div">
                <div className="addstory-story-form">
                  <div className="addstory-form-inner-fields-grid">
                    <label className="addstory-story-form-label">
                      Heading :
                    </label>
                    <Input
                      key={`slides.${currentSlide}.heading`}
                      className="addstory-story-form-input"
                      placeholder="Your Heading"
                      {...register(`slides.${currentSlide}.heading`)}
                    />
                  </div>
                  <div className="addstory-form-inner-fields-grid">
                    <label className="addstory-story-form-label">
                      Description :
                    </label>

                    <textarea
                      key={`slides.${currentSlide}.description`}
                      name="postContent"
                      rows={4}
                      cols={40}
                      className="addstory-story-form-input addstory-story-form-input-description"
                      placeholder="Story Description"
                      {...register(`slides.${currentSlide}.description`)}
                    />
                  </div>
                  <div className="addstory-form-inner-fields-grid">
                    <label className="addstory-story-form-label">
                      Image & Video :
                    </label>
                    <Input
                      key={`slides.${currentSlide}.url`}
                      className="addstory-story-form-input"
                      placeholder="Add Image or Video Link"
                      {...register(`slides.${currentSlide}.url`)}
                    />
                  </div>
                  <div className="addstory-form-inner-fields-grid">
                    <label className="addstory-story-form-label">
                      Category :
                    </label>
                    <select
                      {...register("category")}
                      className="select-drop-down-box"
                      defaultValue="Food"
                    >
                      {options.map((option) => (
                        <option
                          key={option.text}
                          value={option.text}
                          className="option"
                        >
                          {option.text}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="addstory-story-btns">
                  <div className="addstory-story-navigation-btns">
                    <div>
                      <Button
                        children="Previous"
                        className="addstory-story-navigation-btn addstory-story-navigation-prev-btn"
                        onClick={() =>
                          setCurrentSlide((prev) => (prev > 0 ? prev - 1 : 0))
                        }
                      />
                    </div>
                    <div>
                      <Button
                        children="Next"
                        className="addstory-story-navigation-btn addstory-story-navigation-next-btn"
                        onClick={() =>
                          setCurrentSlide((prev) =>
                            prev < fields.length - 1 ? prev + 1 : prev
                          )
                        }
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
        </div>
      </MediaQuery>
    </div>
  );
}

export default AddStory;
