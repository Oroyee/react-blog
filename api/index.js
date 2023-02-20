const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { post } = require("./routes/users");

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

dotenv.config();
app.use(cors());
app.use(express.json({limit: '50mb'}));

// app.use(express.urlencoded({limit: '50mb'}));
// app.use("/images", express.static(path.join(__dirname, "/images")));


// app.get('/', (req, res) => { res.send('Hello from Express!')});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify:true
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

// app.post("api/upload", (req, res) => {
//   var base64 = req.body.photo
//   postRoute.insertMany({
//     photo: base64
//   },(err, data) =>{
//     if (err) {
//       console.log(err);
//     }
//     console.log("upload success!");
//   })
// })



app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen(process.env.PORT || 5000, () => {
  // console.log("Backend is running.");
});