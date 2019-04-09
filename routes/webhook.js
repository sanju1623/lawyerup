var express = require('express');
var router = express.Router();
var mongo = require("./mongo");
var mongoURL = "mongodb://lawyerup:lawyerup295@ds135456.mlab.com:35456/lawyerup";


router.post('/webhook', function (req, res) {
    var data = req.body;
    console.log(data.queryResult.parameters['geo-city']);
    try {
        mongo.connect(mongoURL, function () {
            var coll = mongo.collection('lawyers');
            coll.findOne({firstname:'Aaron'}, function (err, user) {
                return res.json({fulfillmentText:user.firstname});
                }
            );
        });
    }
    catch (e) {
        console.log(e);
    }
});

module.exports = router;

