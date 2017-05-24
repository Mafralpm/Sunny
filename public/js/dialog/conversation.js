var http = new XMLHttpRequest();
var texto = document.getElementById("input");
var speech = 'teste';
var isShow = true;

function enviarMensagem() {

    var frase = texto.value;
    if (frase.trim() != '') {

        var json = {
            input: frase
        }

        jsonStringify = JSON.stringify(json);

        console.log(jsonStringify);

        send(jsonStringify);

        scroll();

    } else {
        alert("é nescessario escrever alguma coisa para iniciar uma conversa com o watson")
    }
}

function handle(e) {

    if (e.keyCode === 13) {
        enviarMensagem();

		e.preventDefault();

    }
}

function send(json) {

    http.open('POST', '/api/message', false);
    http.setRequestHeader('Content-type', 'application/json');
    http.send(json);

    obj = JSON.parse(json);

    $(".ms-body").append('<div class="message-feed right"><div class="pull-right"><img src="img/user.png" alt="" class="img-avatar"></div><div class="media-body"><div class="mf-content">' + obj.input + '</div><small class="mf-date"><i class="fa fa-clock-o"></i> ' + Date() + '</small></div></div>');
    scroll();
    texto.value = '';

    conversation_response();

    sendTextToSpeech(speech);

}

function conversation_response(){
  var obj = JSON.parse(http.responseText);
  speech = "";
  obj.forEach(function(element) {
     $(".ms-body").append('<div class="message-feed media"><div class="pull-left"><img src="img/watson.png" alt="" class="img-avatar"></div><div class="media-body"><div class="mf-content">' + element + '</div><small class="mf-date"><i class="fa fa-clock-o"></i> ' + Date() + '</small></div></div>');
     speech += element + " ";
  }, this);

}

function button_animation() {
    if (isShow) {
        isShow = false;
        $('#animation').attr('class', 'animated bounceOutRight');
    } else {
        isShow = true;
        $('#animation').attr('class', 'animated bounceInRight');
    }
}
