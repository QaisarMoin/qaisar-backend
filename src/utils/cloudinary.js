import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
// "fs" means file system it is built in node js
// fs file handle ke use aata hai like link(save), unlink(delete) or many more

// Configuration
cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
   try {
      if (!localFilePath) return null;
      // upload the file on cloudinary
      const response = await cloudinary.uploader.upload(localFilePath, {
         resource_type: "auto",
      });
      // file uploaded sucessfully on cloudinary
      // console.log("File is Uploaded on cloudinary", response.url);
      fs.unlinkSync(localFilePath);
      return response;
   } catch (error) {
      fs.unlinkSync(localFilePath);
      //removed the temporary saved file as the upload operation got failed
      return null;
   }
};

export { uploadOnCloudinary };
