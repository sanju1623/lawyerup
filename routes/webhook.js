var express = require('express');
var router = express.Router();
var mongo = require("./mongo");
var mongoURL = "mongodb://lawyerup:lawyerup295@ds135456.mlab.com:35456/lawyerup";
router.post('/webhook', function (req, res) {
    if (req.query["hub.verify_token"] === "this_is_my_token") {
        console.log("Verified webhook");
        res.status(200).send(req.query["hub.challenge"]);
    } else {
        console.error("Verification failed. The tokens do not match.");
        res.sendStatus(403);
    }
    var data = req.body;
    var fulfillmentMessages= [
    {
        "platform": "ACTIONS_ON_GOOGLE",
        "simpleResponses": {
        "simpleResponses": [
            {
                "textToSpeech": "Thsi is the Image"
            }
        ]
    }
    },
    {
        "platform": "ACTIONS_ON_GOOGLE",
        "basicCard": {
        "title": "Test",
            "subtitle": "Test",
            "formattedText": "Test",
            "image": {
            "imageUri": "https://www.sample-videos.com/img/Sample-jpg-image-500kb.jpg",
                "accessibilityText": "Test"
        },
        "buttons": [
            {
                "title": "Test",
                "openUriAction": {
                    "uri": "https://www.google.com"
                }
            }
        ]
    }
    },
    {
        "text": {
        "text": [
            ""
        ]
    }
    }
];

    try {
        mongo.connect(mongoURL, function () {
            var coll = mongo.collection('lawyers');
            coll.findOne({firstname:'Aaron'}, function (err, user) {
                return res.json({fulfillmentMessages:fulfillmentMessages});
                }
            );
        });
    }
    catch (e) {
        console.log(e);
    }
});
module.exports = router;