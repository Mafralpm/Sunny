
var worker = new Worker("js/timer.js");

flag = '';
cont = 0;
isShow = true;

worker.postMessage("iniciar");

worker.addEventListener('message', function(e) {

      horario_atual = JSON.parse(e.data)
      // console.log( horario_atual.hora + ":" + horario_atual.minuto);

      horas = horario_atual.hora;
      minutos = horario_atual.minuto

      //textToSpeech
      if(isPlay){

        if(flag != "falando_flag"){
          $("#sol").attr("src","./img/sunny/sunny-falando.gif");
          cont = 0;
          flag = "falando_flag";
        }

      } else {

        if(cont >= 10){
            $("#sol").attr("src","./img/sunny/sunny-bocejando.gif");
            cont = 0;
            flag = '';
          } else {
            cont++;
            if(horas == '16' && minutos == '20'){
              if(flag != "comendo_flag"){
                flag = "comendo_flag";
                $("#sol").attr("src","./img/sunny/sunny-comendo.gif");
              }
            } else {
              if(flag != "idol_flag"){
                flag = "idol_flag";
                $("#sol").attr("src","./img/sunny/sunny-idol.gif");
              }
            }
          }
        }

}, false);



function button_animation() {
    if (isShow) {
        isShow = false;
        $('#animation').attr('class', 'animated bounceOutRight');
    } else {
        isShow = true;
        $('#animation').attr('class', 'animated bounceInRight');
    }
}
