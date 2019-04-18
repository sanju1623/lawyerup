var express = require('express');
var router = express.Router();
var mongo = require("./mongo");
var mongoURL = "mongodb://lawyerup:lawyerup295@ds135456.mlab.com:35456/lawyerup";
var nn = require('nearest-neighbor');
var query={
  city:'San Jose',category:"Criminal",fee:400
};
var items=[{
  "id": 1,
  "firstname": "Kane",
  "lastname": "Williamson",
  "email": "Kane.Willamson@gmail.com",
  "age": 23,
  "address": "1334 The Alameda",
  "city": "San Jose",
  "state": "California",
  "pincode": "95126",
  "phone number": "6692049507",
  "licensed_since": "1994",
  "Rating": 3,
  "Description": "San Jose based lawyer specialized in Divorce",
  "Imageurl": "www.google.com",
  "category":"Divorce",
  "fee":900
},
  {
    "id": 2,
    "firstname": "Billy",
    "lastname": "Batson",
    "email": "billy.batson@yahoo.com",
    "age": 33,
    "address":"1334 The Alameda",
    "city":"San Jose",
    "state":"California",
    "pincode":"95126",
    "phone number":"6692049507",
    "licensed_since":"1994",
    "Rating":3,
    "Description":"San Jose based lawyer specialized in Divorce",
    "Imageurl":"www.google.com",
    "category": "Divorce",
    "fee":700
  },
  {
    "id": 3,
    "firstname": "Bruce",
    "lastname": "Wayne",
    "email": "bruce.wayne@gmail.com",
    "age": 43,
    "address":"1334 The Alameda",
    "city":"San jose",
    "state":"New York",
    "pincode":"95126",
    "phone number":"6692049507",
    "licensed_since":"1984",
    "Rating":5,
    "Description":"Boston based lawyer specialized in Criminal",
    "Imageurl":"www.google.com",
    "category": "Criminal",
    "fee":300
  },
  {
    "id": 4,
    "firstname": "Robin",
    "lastname": "Wayne",
    "email": "robin.wayne@gmail.com",
    "age": 33,
    "address":"1334 The Alameda",
    "city":"Boston",
    "state":"New York",
    "pincode":"95126",
    "phone number":"6692049507",
    "licensed_since":"1999",
    "Rating":4,
    "Description":"Boston based lawyer specialized in Immigration",
    "Imageurl":"www.google.com",
    "category": "Criminal",
    "fee":800
  }];
var fields = [
  { name: "city", measure: nn.comparisonMethods.word },
  { name: "category", measure: nn.comparisonMethods.word},
  {name:"fee",measure:nn.comparisonMethods.number}
];
var output=[];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  for(var i=0;i<3;i++)
  {
    nn.findMostSimilar(query, items, fields, function(nearestNeighbor, probability) {
      output.push(nearestNeighbor.id);
      items=items.filter(temp=>(temp.id!=nearestNeighbor.id));
      //console.log(probability+'---'+nearestNeighbor.id);
    });
  }
  // try {
  //   mongo.connect(mongoURL, function () {
  //       console.log("sanjay");
  //     var coll = mongo.collection('lawyers');
  //     coll.findOne({firstname:'Aaron'}, function (err, user) {
  //         console.log(user.firstname);
  //       }
  //       );
  //   });
  // }
  // catch (e) {
  //   console.log(e);
  // }
});

module.exports = router;
