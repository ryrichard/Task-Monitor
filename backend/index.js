require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

// express app
const app = express()

// middleware
// app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.get('/', (req, res) => {
    res.json({message: "Welcome to the app"})
})


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

app.listen(process.env.PORT, () => {
    console.log("listening to port 4000")
})
