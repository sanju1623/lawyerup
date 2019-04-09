var express = require('express');
var router = express.Router();
var mongo = require("./mongo");
var mongoURL = "mongodb://lawyerup:lawyerup295@ds135456.mlab.com:35456/lawyerup";


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  try {
    mongo.connect(mongoURL, function () {
        console.log("sanjay");
      var coll = mongo.collection('lawyers');
      coll.findOne({firstname:'Aaron'}, function (err, user) {
          console.log(user.firstname);
        }
        );
    });
  }
  catch (e) {
    console.log(e);
  }
});

router.post('/webhook', function (req, res) {
  var data = req.body;
  const city=req.body.geo-city;
  console.log(data.object);
  console.log(city);
  return res.json({displayText:"Sanjay"});
});

module.exports = router;

