
var express = require('express'); // app server
var bodyParser = require('body-parser');

app = express();

app.use(express.static('./public')); // load UI from public folder
app.use(bodyParser.json());

var request = require('request');
var watson = require('watson-developer-cloud');
var contexid = "";


// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

var conversation_id = "";
var w_conversation = watson.conversation({
    url: 'https://gateway.watsonplatform.net/conversation/api',
    username: process.env.CONVERSATION_USERNAME || '3cdf0aee-2e6b-4854-956b-a996a910eb36',
    password: process.env.CONVERSATION_PASSWORD || 'WktXDbf4WxOp',
    version: 'v1',
    version_date: '2016-07-11'
});
var workspace = process.env.WORKSPACE_ID || 'workspaceId';

app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'EAAXsiSStO0gBAPAZA7qPMHZCxybr2uwa8kjgOLZB8pUYUnZBMsB9lcwyRur0oQQdcCeT3LDA3jyydxD1iSXYPFnCZC5GuKSb4FOSmifvIl4ygplKV85pnvIMJftRTlh7GY5NNUlS8L4CdEZAKl6PqwlV9o4RCu82esSbq8cGsoatZCOjFK2KSZAZA') {
        res.send(req.query['hub.challenge']);
    }
    res.send('Erro de validação no token.');
});

app.post('/webhook/', function (req, res) {
	var text = null;

    messaging_events = req.body.entry[0].messaging;
	for (i = 0; i < messaging_events.length; i++) {
        event = req.body.entry[0].messaging[i];
        sender = event.sender.id;

        if (event.message && event.message.text) {
			text = event.message.text;
		}else if (event.postback && !text) {
			text = event.postback.payload;
		}else{
			break;
		}

		var params = {
			input: text,
			// context: {"conversation_id": conversation_id}
			context:contexid
		}

		var payload = {
			workspace_id: "b2d503fb-9b60-45fd-81f1-ace535cdc482"
		};

		if (params) {
			if (params.input) {
				params.input = params.input.replace("\n","");
				payload.input = { "text": params.input };
			}
			if (params.context) {
				payload.context = params.context;
			}
		}
		callWatson(payload, sender);
    }
    res.sendStatus(200);
});

function callWatson(payload, sender) {
	w_conversation.message(payload, function (err, convResults) {
		 console.log(convResults);
		contexid = convResults.context;

        if (err) {
            return responseToRequest.send("Erro.");
        }

		if(convResults.context != null)
    	   conversation_id = convResults.context.conversation_id;
        if(convResults != null && convResults.output != null){
			var i = 0;
			while(i < convResults.output.text.length){


        if(typeof convResults.output.button !== 'undefined'){
          sendButtonMessage(sender, convResults.output.text[i++], JSON.stringify(convResults.output.button));
        } else {
          sendMessage(sender, convResults.output.text[i++]);
          //sendToppicsMessage(sender);
          //i++;
        }


			}
		}

    });
}

function sendMessage(sender, text_) {
	text_ = text_.substring(0, 319);
	messageData = {	text: text_ };

    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: token },
        method: 'POST',
        json: {
            recipient: { id: sender },
            message: messageData,
        }
    }, function (error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
};

function sendButtonMessage(recipient, text ,button) {

  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:recipient},
      message: {
        "attachment":{
          "type":"template",
          "payload":{
            "template_type":"button",
            "text":text,
            "buttons":button
          }
        }
      }
    }
  },

  function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
};

function sendToppicsMessage(recipient) {

console.log(recipient)
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:recipient},
     "message": {
	"text": "Pick a color:",
	"quick_replies": [{
			"content_type": "text",
			"title": "Red",
			"payload": "DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_RED"
		},
		{
			"content_type": "text",
			"title": "Green",
			"payload": "DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_GREEN"
		}
	]
}
    }
  },

  function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
};

var token = "EAAXsiSStO0gBAPAZA7qPMHZCxybr2uwa8kjgOLZB8pUYUnZBMsB9lcwyRur0oQQdcCeT3LDA3jyydxD1iSXYPFnCZC5GuKSb4FOSmifvIl4ygplKV85pnvIMJftRTlh7GY5NNUlS8L4CdEZAKl6PqwlV9o4RCu82esSbq8cGsoatZCOjFK2KSZAZA";

require('./rotas/conversation')(app);
require('./rotas/speech-to-text')(app);
require('./rotas/text-to-speech')(app);

module.exports = app;
