//controllers.js
var isPlay = false;

function sendTextToSpeech(conversation) {
    console.log(conversation);
    var audio = document.getElementById('audio');
    var url = '/api/synthesize?voice=pt-BR_IsabelaVoice&text=' + conversation;
    audio.src = url;
    audio.play();

    audio.onloadedmetadata = function() {
        isPlay = true;  

        $("#audio").bind("ended", function() {
          isPlay = false;
        });
    }
}
