require("dotenv").config();

const path = require("path");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const { ESRCH } = require("constants");

// express app
const app = express();
// app.use(cors());
// middleware
app.use(express.json());

//attaches all routes to app
// app.get("/", (req, res) => res.json({ status: "OK" }));
app.use(userRoutes);
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // enable set cookie with CORS
};

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:4000");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.setHeader("Access-Control-Allow-Credentials", "true");

//   next();
// });

app.use(cors(corsOptions));
//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .catch((error) => {
    console.log(error);
  }
);

// app.use(cors(corsOptions));
// //connect to db
// mongoose
//   .connect(
//     "mongodb+srv://Maoxi:Mao1234@cluster0.2srvy3l.mongodb.net/?retryWrites=true&w=majority"
//   )
//   .then(() => {
//     app.listen(4000, () => {
//       console.log("connected to db & Listening on port");
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });

if (process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../frontend", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname,"../frontend", "build", "index.html"));
  })
}

app.listen(process.env.PORT || 4000, () => {
  console.log("connected to db & Listening on port", process.env.PORT);
});
