const env = require('dotenv').config();
const path = require("path")
const express = require("express")
const expressLayout = require("express-ejs-layouts")
const cookieParser = require("cookie-parser")
const session = require('express-session')
const MongoStore = require('connect-mongo')


const connectDB = require('./server/config/db');
// const { mongo } = require('mongoose');


const app = express()
const PORT =  5000 || process.env.PORT


//mongo db 
connectDB()



app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(cookieParser());


app.use(session({
    secret: 'Blogify',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl : process.env.MONGODB_URL })
}));
 
app.use(express.static("public"))

app.use(expressLayout)
app.set("layout",'./layouts/main')
app.set("view engine", "ejs")

app.set("views", path.resolve("./views"))


// app.locals.isActiveRoute = isActiveRoute; 

// app.get("/", require("./server/routes/main"))

app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));
app.listen(PORT,()=>console.log(`sever started..${PORT}`))
