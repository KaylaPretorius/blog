var express = require('express');
var router = express.Router();
var request = require('request');

//can import code directly from finalmaybecompressed
var Posts =require('../db.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home',posts:Posts.posts });
});

/* get new page. */
router.get('/new', function(req, res, next) {
  res.render('new');
});

router.get('/delete/:id', function(req, res, next) {
request({
url:"http://localhost:8000/posts" +req.params.id,
method:"DELETE",
}, function(error, response, body) {
res.redirect('/');
});
});


// let data = {
// message: "Post successfully deleted"

//post new Page
router.post('/new', function(req, res, next) {
//res.send(req.body)
//create variable to posts

let obj ={
"title":req.body.title,
"Author":req.body.Author,
"image":req.body.image,
"date":req.body.date,
"time":req.body.time,
"content":req.body.content,
}
//write logic that saves this data
request.post({
  url:"http://localhost:8000/posts",
  body:obj,
  json:true
},function (error,responsive,body) {
  //what to send when function has finished
  res.redirect('/new');
});
});

//get archive page
router.get('/archive', function(req, res, next) {
  res.render('archive');
});

//get article page
router.get('/article', function(req, res, next) {
  res.render('article');
});

//get delete post via article page
router.get('/delete/:id',function(req, res, next){
  // console.log(req.params.id)
  // make a post request to our database
request.delete({
  url:"http://localhost:8000/posts/" +req.params.id,
  method: "DELETE",
}, function(error, response, body){
  let data ={
    message: "Your post has been removed successfully"
  }
  res.redirect('/');
});
});





module.exports = router;
