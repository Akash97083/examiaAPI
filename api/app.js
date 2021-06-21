const express = require('express')
const mongoose = require('mongoose')
const app = express();

const studentAuth = require('./routes/student/auth')


const instructorAuth = require('./routes/instructor/auth')
const instructorQuestion = require('./routes/instructor/question')
const instructorGroup = require('./routes/instructor/group')

const dbURI = "mongodb://localhost/examia"
const dbPort = 3000
app.use((req,res,next)=> {
    res.setHeader("Access-Control-Allow-Origin","*")
    res.setHeader("Access-Control-Allow-Methods","*")
    res.setHeader("Access-Control-Allow-Headers","Authorization")
    next()
})
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(express.json())


app.use('/api/instructor/auth',instructorAuth)
app.use('/api/instructor/question',instructorQuestion)
app.use('/api/instructor/group',instructorGroup)

app.use('/api/student/auth',studentAuth)

mongoose.connect(dbURI , {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on("error", (err)=>{console.error(err)})
db.once("open", () => {console.log("DB started successfully")})
app.listen(dbPort, () => {console.log("Server started: "+ dbPort +"")})


