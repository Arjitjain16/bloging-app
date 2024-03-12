const express = require('express');
const router = express.Router();
const Post = require('../models/post');


/**
 * GET /
 * HOME
*/
router.get('/', async (req, res) => {
  try {
    const locals = {
      title: "NodeJs Blog",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }

    let perPage = 10;
    let page = req.query.page || 1;

    const data = await Post.aggregate([ { $sort: { createAt: -1 } } ])
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec();

    // Count is deprecated - please use countDocuments
    // const count = await Post.count();
    const count = await Post.countDocuments({});
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render('index', { 
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      currentRoute: '/'
    });

  } catch (error) {
    console.log(error);
  }

});


/**
 * GET /
 * Post
*/


router.get('/post/id', async(req, res)=>{
  try {
    const locals = {
      title: "NodeJs Blog",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }
    const slug = req.params.id
    const data = await Post.findById({_id : slug})

    res.render('post', {locals , data})
    
  } catch (error) {
    console.log(error)
  }
})




router.get("/about",(req, res)=>{
    res.render("about")
})

module.exports = router;



// try {
//   const locals = {
//     title: "NodeJs Blog",
//     description: "Simple Blog created with NodeJs, Express & MongoDb."
//   }
//   let slug = req.params.id
//   const data = await Post.findById({_id : slug})
// }catch(error){
// console.log()