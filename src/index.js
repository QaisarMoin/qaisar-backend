// require("dotenv").config({ path: "./env" });
import connectDB from "./db/index.js";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config({
  path: "./env",
});

//database connect hone ke baad ek promise return karta hai
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Server is running on PORT  
      ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection FAILED !!!", err);
  });
//_______________________________________________>
//niche wale code ko hamne ek seprate file db folder ke andar index.js mein likhe hai take yay ka ro database connection ka code mix na ho
//_______________________________________________>

// const app = express()(async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/
//             ${DB_NAME}`);

//     app.on("error", (error) => {
//       console.error("ERROR : ", error);
//       throw error;
//     });

//     app.listen(process.env.PORT, () => {
//       console.log(`App is listening on ${process.env.PORT}`);
//     });
//   } catch (error) {
//     console.error("ERROR : ", error);
//     throw error;
//   }
// })();
