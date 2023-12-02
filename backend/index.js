require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");

// express app
const app = express();
app.use(cors());
// middleware
app.use(express.json());
// app.use((req, res, next) => {
//     console.log(req.path, req.method)
//     next()
// })

//attaches all routes to app
app.get("/", (req, res) => res.json({ status: "OK" }));
app.use(userRoutes);
const corsOptions = {
  origin: "http://localhost:4000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // enable set cookie with CORS
};
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  next();
});
app.use(cors(corsOptions));
//connect to db
mongoose
  .connect(
    "mongodb+srv://Maoxi:Mao1234@cluster0.2srvy3l.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(4000, () => {
      console.log("connected to db & Listening on port");
    });
  })
  .catch((error) => {
    console.log(error);
  });

// attach all routes to app
// app.use('/api/', )

// listen for request
// mongoose.connect(process.env.MONG_URI)
//     .then(() => {
//         app.listen(process.env.PORT, () => {
//             console.log("connected to db & listening on port", process.env.PORT)
//         })
//     })
//     .catch((error) => {
//         console.log(error)
//     })
