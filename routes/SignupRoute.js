var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

var signupSchema = mongoose.Schema({
  username:String,
  password:String
  //useremail:String,
//  userpassword:String,
  //usercity:String
 });


var Post = mongoose.model('signup', signupSchema);

router.post('/register', function (req, res) {
    var post = new Post({
      username: req.body.username,
      password:req.body.userpassword

    });
    post.save(function(err,docs){
        console.log('register Successfully'+post);
      });
  });

/*router.post('/signupinsert', function (req, res) {
    var post = new Post({
      username: req.body.username,
      password:req.body.userpassword
    //  useremail:req.body.useremail,
    //  userpassword:req.body.userpassword,
      //usercity:req.body.usercity
    });
    post.save(function(err,docs){
        console.log('Post Saved Successfully'+post);
      });
  });*/



/*code for star rating data save into database table rating*/

/*var ratingSchema = mongoose.Schema({
  moviename:String,
  ratingvalue:String
  //noofuser:Number
 });


var ratingModel = mongoose.model('rating', ratingSchema);



router.post('/ratinginsert/:m/:r', function (req, res) {

    var ratingMod = new ratingModel({

      moviename:req.params.m,
      ratingvalue:req.params.r


    });

    ratingMod.save(function(err,docs){

        console.log('Post Saved Successfully'+docs);

      });
  });

  router.get('/ratingDisplay/:t', function (req, res) {
         ratingModel.find({moviename: req.params.t}, function (err, docs) {
         res.json(docs);
         });

   });*/


module.exports = router;
