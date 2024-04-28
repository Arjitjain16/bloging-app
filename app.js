const env = require('dotenv').config();

const path = require("path")
const express = require("express")
const expressLayout = require("express-ejs-layouts")

const connectDB = require('./server/config/db')

const app = express()
const PORT = 8001 || process.env.PORT

//mongo db 
connectDB()


app.use(express.urlencoded({extended : true}))
app.use(express.json())
 
app.use(express.static("public"))

app.use(expressLayout)
app.set("layout",'./layouts/main')
app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))


// app.get("/", require("./server/routes/main"))

app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));

app.listen(PORT,()=>console.log(`sever started..${PORT}`))
