var TextToSpeech = require('watson-developer-cloud/text-to-speech/v1');
var fs = require('fs');

var text_to_speech = new TextToSpeech({
    username: 'ca1d2911-60bc-42ed-8004-18712a915030',
    password: 'M25JvcClhpjE'
});


module.exports = function(app) {

    app.get('/api/synthesize', function(req, res, next) {
        var transcript = text_to_speech.synthesize(req.query);
        transcript.on('error', next);
        transcript.pipe(res);
    });
};
