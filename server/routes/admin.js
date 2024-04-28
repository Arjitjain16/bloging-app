const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/user');
// const layouts = require('layouts');

const adminLayout = "../views/layouts/admin"

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

router.post("/admin", function(req, res){
    try {
        const {username, password} = req.body
        if (req.body.username === "admin" && req.body.password === "password"){
            res.send("you are logges in")
        }
        else {
            res.send("wrong username or password")
        }

    } catch (error) {
        console.log(error)
    }
})

module.exports = router