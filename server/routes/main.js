const express = require("express")
const router = express.Router()

// function isActiveRoute(currentPath, expectedPath) {
//     return currentPath === expectedPath ? 'active' : '';
// }


//route
// router.get('/example', (req, res) => {
//     res.render('example', { currentRoute: '/example' });
// });
router.get("/",(req, res)=>{
    res.render("index")
})
router.get("/about",(req, res)=>{
    res.render("about")
})

module.exports = router;