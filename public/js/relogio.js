
var worker = new Worker("js/timer.js");

flag = '';
cont = 0;
worker.postMessage("iniciar");

worker.addEventListener('message', function(e) {

      horario_atual = JSON.parse(e.data)
      // console.log( horario_atual.hora + ":" + horario_atual.minuto);

      horas = horario_atual.hora;
      minutos = horario_atual.minuto
      console.log(cont);
      console.log('oilaakdm');

      if(cont >= 3){
          $("#sol").attr("src","./img/sunny/sunny-bocejando.gif");
          cont = 0;
          flag = '';
      } else {
        cont++;
        if(horas == '16' && minutos == '45'){
          if(flag != "comendo_flag"){
            flag = "comendo_flag";
            $("#sol").attr("src","./img/sunny/sunny-comendo.gif");
          }
        } else{
          if(flag != "idol_flag"){
            flag = "idol_flag";
            $("#sol").attr("src","./img/sunny/sunny-idol.gif");
          }
        }
      }


}, false);

var isShow = true;

function button_animation() {
    if (isShow) {
        isShow = false;
        $('#animation').attr('class', 'animated bounceOutRight');
    } else {
        isShow = true;
        $('#animation').attr('class', 'animated bounceInRight');
    }
}
