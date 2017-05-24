var watson = require('watson-developer-cloud');
var vcapServices = require('vcap_services');

var credentials = Object.assign({
    username: '3334ae36-e021-48d4-b155-d920be19baee',
    password: 't8ZG11MDZiRm',
    url: 'https://stream.watsonplatform.net/speech-to-text/api',
    version: 'v1',
}, vcapServices.getCredentials('speech_to_text'));

var authorizationService = watson.authorization(credentials);

module.exports = function(app) {

    app.get('/api/speech-to-text/token', (req, res, next) =>
        authorizationService.getToken({
            url: credentials.url
        }, (error, token) => {
            if (error) {
                if (error.code !== 401)
                    return next(error);
            } else {
                res.send(token);
            }
        })
    );

}
