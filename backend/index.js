require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require("./routes/userRoutes");
const path = require('path')
// express app
const app = express()

// middleware
app.use(express.json())
// app.use((req, res, next) => {
//     console.log(req.path, req.method)
//     next()
// })

//attaches all routes to app
// app.get("/", (req, res) => res.json({status : "OK"}));
app.get("/", function(req, res){

	res.sendFile(
		path.join(_dirname, "../frontend/build/index.html"),
		function(err){
			if(err){
				res.status(500).send(err);
				}
			}
		);
})

app.use(userRoutes)
//connect to db
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("connected to db & Listening on port", process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

const _dirname = path.dirname("")
const buildPath = path.join(_dirname, "../frontend/build");



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
