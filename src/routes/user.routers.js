import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

//app.use("/api/v1/users", userRouter) ne is file ko control pass krdiya hai
//agar  /register hit toh registerUser ko run kardo. nahi toh kuch mat karo and regisrUser ke phle jo bhi hai wo image upload karne ke liye multer middelware use hua hai
router.route("/register").post(
   upload.fields([
      {
         name: "avatar",
         maxCount: 1,
      },
      {
         name: "coverImage",
         maxCount: 1,
      },
   ]),
   registerUser
);

export default router;
