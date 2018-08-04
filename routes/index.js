var express = require('express');
var router = express.Router();
var request = require('request');

//can import code directly from db.json file
var Posts =require('../db.json');

/* GET home page. */
router.get('/', function(req, res, next) {
res.render('index', { title: 'Home',posts:Posts.posts });
});

/* this gets a new blog page. */
router.get('/new', function(req, res, next) {
res.render('new');
});

// this post a new blog page
router.post('/new', function(req, res, next) {
// res.(req.body);
let obj = {
"title" : req.body.title,
"author" : req.body.author,
"date" : req.body.date,
"image":req.body.image,
"content" : req.body.content,
"story" : req.body.story
}

//writes logic that saves this data
request.post({
url:"http://localhost:8000/posts",
body:obj,
json:true
// if page not found error will be processed
},function (error,responsive,body) {
//what to send when function has finished
res.redirect('/new');
});
});

router.get('/post/:id', function(req,res,next){
let urlPath = req.path;
let postId = urlPath.slice(-1);
res.render('blog', {
posts: posts.post[postId -1]
})
});

router.get('/delete/:id', function(req,res,next){
request ({
url: "http://localhost:8000/posts/" + req.params.id,
method: "Delete",
}, function(error, response, body){

res.redirect('/');
});
});


/* this gets archive. */
router.get('/archive', function(req, res, next) {
res.render('archive', { posts: Posts.post });
});

/* this gets the contact page. */
router.get('/contact', function(req, res, next) {
res.render('contact');
});



/* this gets archive. */
router.get('/sign-in', function(req, res, next) {
  res.render('sign-in', { posts: Posts.post });
});

/* this is when you click on read more. */
router.get('/views/:id', function(req, res, next) {

  var id = req.params.id;
  var data = Posts.posts[id-1];

  res.render('views', { posts:data });

});

/* GET EDIT post. */
router.get('/edit/:id', function(req, res, next){
  request({
    url: "http://localhost:8000/posts/"+req.params.id,
    method: "GET",
  }, function(error, response, body){
    res.render("edit", {message: false, posts: JSON.parse(body), title: body.title})
  });
});

router.post("/edit/:id", function(req, res, next){
  console.log(req.params.id);
  request({
    url: "http://localhost:8000/posts/"+req.params.id,
    method: "PATCH",
    form: {
      title: req.body.title,
      author: req.body.author,
      content: req.body.content,
      image: req.body.image
    },
    function(error,response,body){
      res.render("index",{message:"successfully added"});
    }

    })
    res.redirect("/");
})

/* GET archive us */
router.get('/archive', function(req, res, next) {
res.render('archive', { posts: Posts.post });
});



module.exports = router;
