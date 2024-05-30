import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
// bcrypt is used for encription and de-encryption on password
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      index: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, // cloudinary url
      required: true,
    },
    coverImage: {
      type: String, // cloudinary url
    },
    watchHistory: [
      {
        type: Schema.types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// .pre means "save" hone ke just phle password ko hash kardo
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = bcrypt.hash(this.password, 10);
  next();
});

// ".methods " se ham khud ke method bana sakte hai
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
  // this will return true or false
};

userSchema.methods.genrateAccessToken = function () {
  // encryption algorithm mein time nahi lagta hai isliye "await" use nahi kiye hai
  return jwt.sign(
    {
      // is object mein batana hota hai ke token ke nadar kiya information store karna hai from database
      _id: this._id,
      username: this.username,
      email: this.email,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

// dekho refresh token baar baar refresh hota retha hai isliye isme information kam rahti hai
userSchema.methods.genrateRefreshToken = function () {
  return jwt.sign(
    {
      // is object mein batana hota hai ke token ke nadar kiya information store karna hai from database
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
