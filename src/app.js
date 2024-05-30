import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

//jab tak express se app nahi banega tab tak CORS and cookie parser setup nahi ho te hai
// app.use() setup and middelware mein use hota hai

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
// express.static() ka use file ko mere server mein store karne liye use hota hai

export default app;
