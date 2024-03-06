const env = require('dotenv').config();

const path = require("path")
const express = require("express")
const expressLayout = require("express-ejs-layouts")

const app = express()
const PORT = 8001 || process.env.PORT
 
app.use(express.static("public"))

app.use(expressLayout)
app.set("layout",'./layouts/main')
app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))


// app.get("/", require("./server/routes/main"))
const mainRoutes = require('./server/routes/main');
app.use('/', mainRoutes);

app.listen(PORT,()=>console.log(`sever started..${PORT}`))
