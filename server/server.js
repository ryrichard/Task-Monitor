const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://Maoxi:Mao1234@cluster0.2srvy3l.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(3000, () => {
      console.log("Task Monitor is running at port 3000");
    });
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });
