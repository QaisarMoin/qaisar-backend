import multer from "multer";
// multer user se file(image) lene ke liye hota hai or usko leke apne storage disk mein save kar leta hai

const storage = multer.diskStorage({
   // cb means call back
   destination: function (req, file, cb) {
      cb(null, "./public/temp");
   },
   filename: function (req, file, cb) {
      cb(null, file.originalname);
   },
});

export const upload = multer({ storage });
