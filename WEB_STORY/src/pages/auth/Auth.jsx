import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button, Loader } from "../../Components";
import "./Auth.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye, faCheck } from "@fortawesome/free-solid-svg-icons";
import { apiRoutes } from "../../services/apiRoutes";
import { toast } from "react-toastify";
import { axiosGet, axiosPost } from "../../services/axios.config";
import { useDispatch } from "react-redux";
import { login } from "../../feature/useSlice";
import setToken from "../../utils/setToken";

function Auth({ title, cancelHandel }) {
  const dispatch = useDispatch();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isShow, setIsShow] = useState(false);
  const [isUsernameVerified, setIsUsernameVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleShowPassword = () => {
    setIsShow(!isShow);
  };

  const usernameVarificaion = async (username) => {
    const usernameVerificationUrl = `${
      import.meta.env.VITE_HOST_API_URL
    }${apiRoutes.VERIFY_USERNAME.replace(":username", username)}`;
    let response = "";
    setIsUsernameVerified(false);

    console.log("Auth", username);

    response = await axiosGet(usernameVerificationUrl, { username });

    if (response.success) {
      setIsUsernameVerified(true);
    } else {
      toast.error(response.message);
    }
  };

  const handleLogin = async (username, password) => {
    const loginUrl = `${import.meta.env.VITE_HOST_API_URL}${
      apiRoutes.LOGIN_USER
    }`;

    const response = await axiosPost(loginUrl, { username, password });

    if (response.success) {
      const { username, avatar } =
        response.data.user;

      const {accessToken,refreshToken} = response.data

      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      setToken(accessToken, refreshToken);

      dispatch(login({ user: { username, avatar } }));

      cancelHandel(false);
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  const handleRegister = async (username, password) => {
    const registerUrl = `${import.meta.env.VITE_HOST_API_URL}${
      apiRoutes.REGISTER_USER
    }`;

    const response = await axiosPost(registerUrl, { username, password });

    if (response.success) {
      cancelHandel(false);
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  const handleAuthFormSubmit = async (data) => {
    const { username, password } = data;

    if (
      !username ||
      !password ||
      username.trim() === "" ||
      password.trim() === ""
    ) {
      toast.error("Username or password can't be empty ! ");
    }

    if (!isLoading) {
      setIsLoading(true);
      if (title === "Login") {
        await handleLogin(username, password);
      } else {
        if (isUsernameVerified) {
          await handleRegister(username, password);
        }
      }
      setIsLoading(false);
    }
  };

  const handleAuthFormSubmitError = (error) => {
    console.log(error);

    if (title === "Register") {
      toast.error(
        (error.username && error.username.message) || error.password.message
      );
    } else {
      toast.error("Invalid credentials");
    }
  };
  useEffect(() => {
    if (
      title === "Register" &&
      watch("username") &&
      watch("username").length > 3
    ) {
      (async () => {
        const username = watch("username");
        console.log(username);
        await usernameVarificaion(username);
      })();
    }
  }, [watch("username")]);

  return (
      <div className="auth-card">
        <div className="auth-form-cancel-div">
          <Button
            className="auth-form-cancel"
            onClick={() => cancelHandel(false)}
          >
            <img src="src/assets/authCancel.svg" />
          </Button>
        </div>

        <div className="auth-form-heading">{title}</div>

        <div>
          <form
            onSubmit={handleSubmit(
              handleAuthFormSubmit,
              handleAuthFormSubmitError
            )}
          >
            <div className="auth-form-grid">
              <label className="auth-label">Username</label>
              <div>
                <div
                  className={`auth-input-field-div
                ${
                  errors.password &&
                  title === "Register" &&
                  "auth-input-field-div-error"
                }
                username-input-field`}
                >
                  <Input
                    id="username"
                    className="auth-input-field"
                    placeholder="Enter username"
                    {...register("username", {
                      required: "Username can't be empty !",
                      validate: (value) => {
                        const hasLowerCase = /[a-z]/.test(value);
                        const hasSpecialChar = /^[-_]*$/.test(
                          value.replace(/[a-z\d]/g, "")
                        );
                        const hasUpperCase = /[A-Z]/.test(value);
                        const hasSpace = /\s/.test(value);
                        const minLength = value.length >= 3;
                        if (!minLength) {
                          return "Username must have at least 3 characters.";
                        } else if (!hasLowerCase) {
                          return "Username must contain at least one lowercase letter.";
                        } else if (hasUpperCase) {
                          return "Username must not contain uppercase letters.";
                        } else if (hasSpace) {
                          return "Username must not contain spaces.";
                        } else if (!hasSpecialChar) {
                          return "Only '-' and '_' allowed.";
                        }
                      },
                    })}
                  />
                  {title !== "Login" &&
                    !errors.username &&
                    watch("username") &&
                    watch("username").length > 3 &&
                    (title === "Register" && isUsernameVerified ? (
                      <div className="check">
                        <FontAwesomeIcon
                          icon={faCheck}
                          size="xl"
                          style={{ color: "#069d06" }}
                        />
                      </div>
                    ) : (
                      <Loader />
                    ))}

                  {!errors.username && title === "Register" && (
                    <div className="username-tooltip">
                      <ul>
                        <li style={{ listStyle: "none" }}>
                          Username must have 3 charcters
                        </li>

                        <li style={{ listStyle: "none" }}>
                          Username must have at least one lowercase letter
                        </li>
                        <li style={{ listStyle: "none" }}>
                          Username only have "-" and "_"
                        </li>
                        <li style={{ listStyle: "none" }}>
                          Username can contain number
                        </li>
                        <li style={{ listStyle: "none", color: "#ee0000" }}>
                          Uppercase letter are not allowed
                        </li>
                      </ul>
                    </div>
                  )}

                  {errors.username && title === "Register" && (
                    <div className="error-tooltip">
                      <ul>
                        <li style={{ listStyle: "none" }}>
                          {errors.username.message}
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <label className="auth-label">Password</label>
              <div
                className={`auth-input-field-div
                  ${
                    errors.password &&
                    title === "Register" &&
                    "auth-input-field-div-error"
                  }
                  password-input-field`}
              >
                <Input
                  className="auth-input-field"
                  id="password"
                  placeholder="Enter password"
                  type={`${isShow ? "text" : "password"}`}
                  {...register("password", {
                    required: "Password can't be empty !",
                    validate: (value) => {
                      const hasUpperCase = /[A-Z]/.test(value);
                      const hasLowerCase = /[a-z]/.test(value);
                      const hasNumber = /\d/.test(value);
                      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(
                        value
                      );
                      const minLength = value.length >= 8;

                      if (!minLength) {
                        return "Password must be at least 8 characters long";
                      } else if (!hasUpperCase) {
                        return "Password must contain at least one uppercase letter";
                      } else if (!hasLowerCase) {
                        return "Password must contain at least one lowercase letter";
                      } else if (!hasNumber) {
                        return "Password must contain at least one number";
                      } else if (!hasSpecialChar) {
                        return "Password must contain at least one special character";
                      }

                      return true; // Valid password
                    },
                  })}
                />

                {!errors.password && title === "Register" && (
                  <div className="password-tooltip">
                    <ul>
                      <li style={{ listStyle: "none" }}>
                        Password should have 8 charcters
                      </li>
                      <li style={{ listStyle: "none" }}>
                        Password must have at least one uppercase letter
                      </li>
                      <li style={{ listStyle: "none" }}>
                        Password must have at least one lowercase letter{" "}
                      </li>
                      <li style={{ listStyle: "none" }}>
                        Password must have at least one special character
                      </li>
                      <li style={{ listStyle: "none" }}>
                        Password must have at least one number
                      </li>
                    </ul>
                  </div>
                )}

                {errors.password && title === "Register" && (
                  <div className="error-tooltip">
                    <ul>
                      <li style={{ listStyle: "none" }}>
                        {errors.password.message}
                      </li>
                    </ul>
                  </div>
                )}
                <Button className="auth-eye-btn" onClick={handleShowPassword}>
                  {!isShow ? (
                    <FontAwesomeIcon icon={faEye} size="xl" />
                  ) : (
                    <FontAwesomeIcon icon={faEyeSlash} size="xl" />
                  )}
                </Button>
              </div>

              <div className="auth-form-submit-btn-div">
                <Button
                  type="submit"
                  className="auth-form-submit-btn"
                  children={
                    !isLoading ? (
                      title
                    ) : (
                      <div
                        style={{ display: "grid", justifyContent: "center" }}
                      >
                        <Loader backgroundColor="white" />
                      </div>
                    )
                  }
                />
              </div>
            </div>
          </form>
        </div>
      </div>
  );
}

export default Auth;
