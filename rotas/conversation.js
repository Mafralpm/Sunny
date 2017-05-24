var Conversation = require('watson-developer-cloud/conversation/v1');
var context_value = {};
// Set up Conversation service.
var conversation = new Conversation({
    username: '3cdf0aee-2e6b-4854-956b-a996a910eb36',
    password: 'WktXDbf4WxOp',
    path: {
        workspace_id: 'b2d503fb-9b60-45fd-81f1-ace535cdc482'
    }, // replace with workspace ID
    version_date: '2016-07-11'
});

module.exports = function(app) {

    app.post('/api/message', function(req, res) {

        input_value = req.body.input;

            var mensagem = {
                input: {
                    text: input_value
                },
                context: context_value
            };

        // console.log(mensagem);
        // Start conversation with empty message.
        conversation.message(mensagem, function(err, data) {
            if (err) {
                return res.status(err.code || 500).json(err.code);
            }
            return res.json(processResponse(err, data))
        });

        function processResponse(err, response) {
            if (err) {
                console.error("erro -> " + err); // something went wrong
                return;
            }

            // Display the output from dialog, if any.
            if (response.output.text.length != 0) {

                context_value = response.context;

                console.log(response.output.text);

                return response.output.text;
            }
        }

    });
}
