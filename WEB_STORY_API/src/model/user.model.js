import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  like: [
    {
      type: Schema.Types.ObjectId,
      ref: "Slide",
    },
  ],

  bookmark: [
    {
      type: Schema.Types.ObjectId,
      ref: "Slide",
    },
  ],

  avatar: {
    type: String,
    default: "",
  },
  refreshToken: {
    type: String,
  },
});

//#region password handling

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//#endregion

//#region generate token

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this.id,
      username: this.username,
      password: this.password,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_TIME,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      id: this.id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_TIME,
    }
  );
};

//#endregion

export const User = model("User", userSchema);
