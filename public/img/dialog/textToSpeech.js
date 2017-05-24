//controllers.js
var isPlay = false;
var isNight = false;

function sendTextToSpeech(conversation) {
    console.log(conversation);
    var audio = document.getElementById('audio');
    var url = '/api/synthesize?voice=pt-BR_IsabelaVoice&text=' + conversation;
    audio.src = url;
    audio.play();

    audio.onloadedmetadata = function() {
        isPlay = true;
        if(isNight){
          $("#simbolos").attr("class", "col col-75 padding-simbolo dia-simbolo-falando-noite");
        } else {
          $("#simbolos").attr("class", "col col-75 padding-simbolo dia-simbolo-falando");
        }
    }

    $("#audio").bind("ended", function() {
        isPlay = false;
        $("#simbolos").attr("class", "col col-75 padding-simbolo dia-simbolo");
    });

}
