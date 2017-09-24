var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

var omdbSchema = mongoose.Schema({
  Title:String,
  Year:String,
Runtime:String,
Genre:String,
  Director:String,
  Actors:String,
  Language:String,
  Poster:String,
  Status:String
   });


var omdbModel = mongoose.model('Movies', omdbSchema,'Movies');


router.post('/insertOMDBMovie', function (req, res) {
    var om = new omdbModel({

        Title: req.body.Title,
         Year: req.body.Year,
         Runtime: req.body.Runtime,
         Genre: req.body.Genre,
         Director: req.body.Director,
         Actors: req.body.Actors,
         Language: req.body.Language,
         Poster: req.body.Poster,
         Status:'false'

    });
    om.save(function(err,docs){
        console.log('Post Saved Successfully'+om);
      });
  });


  router.get('/showmovies', function (req, res) {
      omdbModel.find({}, function (err, docs) {
      res.json(docs);
      });
  });



  router.delete('/deletemovies/:id',function(req, res){
    omdbModel.remove({_id:req.params.id},function(err, docs){
      console.log('Movie Removed Successfully');
    });
  });

// it'll update the
  router.put('/updatemoviestatus/:Title/:val',function(req,res){
  omdbModel.findOneAndUpdate({ Title: req.params.Title },
    {$set:{Status: req.params.val }
  },function (err, data){
    res.json(data);
  });
  });

/*  rating   code           */

var ratingSchema = mongoose.Schema({
  moviename:String,
  ratingvalue:Number
 });


var ratingModel = mongoose.model('rating', ratingSchema);



router.post('/ratinginsert/:m/:r', function (req, res) {
var ratingMod = new ratingModel({
      moviename:req.params.m,
      ratingvalue:req.params.r
});ratingMod.save(function(err,docs){
  });
  });

  router.get('/ratingDisplay', function (req, res) {
    ratingModel.aggregate([{$group : {_id : '$moviename', AverageRating : {$avg : '$ratingvalue'}}}],function (err, docs) {
  res.json(docs);
           });
   });




module.exports = router;
