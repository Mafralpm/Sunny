function getTime(){
  var d = new Date();
  var hour = d.getHours();
  var min = d.getMinutes();
  postMessage('{"hora":'+ hour + ',"minuto":'+ min + '}');
  setTimeout("getTime()", 1500);
}

//getTime();

self.addEventListener('message', function(e) {
  getTime();
}, false);
