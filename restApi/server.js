const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// const multer = require("multer");
// const path = require("path");

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(
  MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

// app.use("/img", express.static(path.join(__dirname, "public/img")));
// console.log(path.join(__dirname, "public/img"));

//middleware
app.use(express.json());

app.use(cors());

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/img");
//   },
//   filename: (req, file, cb) => {
//     // cb(null, file.originalname);
//     cb(null, req.body.name);
//   },
// });

// //upload new post image
// const upload = multer({ storage: storage });
// app.post("/api/upload", upload.single("file"), (req, res) => {
//   try {
//     return res.status(200).json("File uploded successfully");
//   } catch (error) {
//     console.error(error);
//   }
// });

// app.use("/api/user", userRoute);
// app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.use("/user", userRoute);
app.use("/auth", authRoute);

app.listen(8800, () => {
  console.log("Server is running");
});
