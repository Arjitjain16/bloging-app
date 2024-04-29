const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/user');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
// const layouts = require('layouts');

const adminLayout = "../views/layouts/admin"

jwtSecret = process.env.JWT_SECRET


const authMiddleware = (req, res, next) => {
    const token = req.cookies.token; // Retrieve token from req.cookies

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};


/**
 * GET /
 * HOME
*/

router.get("/admin", function(req, res){
    try {
        const locals = {
            title: "Admin",
            description: "Simple Blog created with NodeJs, Express & MongoDb."
        }
        res.render("admin/index", {locals , layout : adminLayout})
    } catch (error) {
        console.log(error);
    }
})


//Post routes for admin and register

router.post("/admin", async function(req, res){
    try {
        const {username, password} = req.body
        const user = await User.findOne({username})

        if(!user){
            return res.status(401).json({message : "Invalid credential"})
        }

        const PasswordValid = await bcrypt.compare(password, user.password)

        if(!PasswordValid){
            return res.status(401).json({message : "Invalid credentials"})
        }

        const token = jwt.sign({userId : user._id}, jwtSecret)
        res.cookie('token', token , {httpOnly : true})
        res.redirect("/dashboard")

    } catch (error) {
        console.log(error)
    }
})

// dashboard

router.get('/dashboard', authMiddleware, async function(req, res){
    res.render('admin/dashboard')
})

// register 

router.post("/register", async function(req, res){
    try {
        const {username, password} = req.body
        const hashedPassword = await bcrypt.hash(password , 10)

        try {
            const user = await User.create({username, password:hashedPassword})
            res.status(201).json({message : "user create", user})
        } catch (error) {
            if(error.code === 11000){
                res.status(401).json({message : "user already exist"})
            }
            else{
                res.status(500).json({message : "Internal server errror"})
            }
        }
    } catch (error) {
        console.log(error)
    }
})


module.exports = router