import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
   // algorithm to register a user//
   /* 1) get user detail from frontend 
      2) validation - details (not empty)
      3)check if user alredy exist: usrename or email
      4)check for coverImage and Avatar
      5) upload them to cloudinary , check - avatar
      6) create a userobject - create a entry in DB
      7)remove password and refreshToken file token from response
      8)check weather user is created or not 
      9)return response(res)
    */

   //req.body() jab use hota hai jab data url se na aa rahaho
   // iss liye hamne phlehe destructure kar liye ke aap mujhe kiya kiya bhjh ne wale ho

   const { fullName, email, username, password } = req.body;
   console.log("email:", email);

   //1)
   if (
      [fullName, email, username, password].some((field) => field?.trim() == "")
   ) {
      throw apiError(400, "All Fields are required");
   }

   //2) and 3)
   const existedUser = User.findOne({
      // $or: [iske andar object mein parametre pass kardo toh $or: dhundega username and email dono mein se kuch phle se exit karta hai ]
      $or: [{ username }, { email }],
   });

   if (existedUser) {
      throw new apiError(409, "User with email or username already exist");
   }

   //4)hamne user.routes mein ek middelware insert kiye teh multer wala. wo middelware req mein or property add kardeta hai like .files
   const avatarLocalpath = req.files?.avatar[0]?.path; //multer save file ke first property se path nikal ke dedo

   const coverImageLocalpath = req.files?.coverImage[0]?.path;

   if (!avatarLocalpath) {
      throw new apiError(400, "Avatar file is required");
   }

   const avatar = await uploadOnCloudinary(avatarLocalpath);
   const coverImage = await uploadOnCloudinary(coverImageLocalpath);

   if (!avatar) {
      throw new apiError(400, "Avatar file is required");
   }

   //6)
   const user = await User.create({
      fullName,
      avatar: avatar.url,
      coverImage: coverImage?.url || "",
      email,
      password,
      username: username.toLowerCase(),
   });

   //7)
   const createdUser = await User.findById(user._id).select(
      "-refreshToken -password"
      //.select ke andar - laga wo likho jo nahi chiyea
   );

   if (!createdUser) {
      throw new apiError(
         500,
         "Something went wrong while registering the user"
      );
   }

   return res
      .status(201)
      .json(new apiResponse(200, createdUser, "User Registered sucessfully"));
});

//accha ye method toh bana diye hamne but ye run kab hoga. ye run jabhi karna hai jab koi url hit ho. uske liye routes folder mein routers likhe hue hai

export { registerUser };
