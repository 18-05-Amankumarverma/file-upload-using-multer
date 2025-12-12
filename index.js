const express = require("express")
const app = express()
require("dotenv").config()
const PORT = process.env.PORT || 4000
const connection = require("./app/config/db.config")
const studentRouter = require("./app/routes/student.route")
const cors = require("cors")
const path = require("path")

connection.connect((err)=>{
    if(err) return console.log("database connection failed : ",err) 
    return console.log("database is connected succcessfully")
})

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.use('/api/v1/student',studentRouter)
app.use("/uploads",express.static(path.join(__dirname,"../../uploads")))

app.get('/', (req, res) => {
    return res.status(200).json({
        "message": "backend is working !"
    })
})



app.listen(PORT, () => {
    console.log(`server is listening on PORT : ${PORT} http://localhost:${PORT}/`)
})