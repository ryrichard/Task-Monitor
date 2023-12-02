require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");

// express app
const app = express();

// middleware
app.use(express.json());
// app.use((req, res, next) => {
//     console.log(req.path, req.method)
//     next()
// })

//attaches all routes to app
app.get("/", (req, res) => res.json({ status: "OK" }));
app.use(userRoutes);

//connect to db
mongoose
  .connect(
    "mongodb+srv://Maoxi:Mao1234@cluster0.2srvy3l.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(3000, () => {
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
