// require("dotenv").config({ path: "./env" });
import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./env",
});

connectDB();
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
