var socket = io();
var img = document.getElementById('streamPlay');

socket.on('streamToClient', function(streamData){
    // var room = GetParameterValues('room');
    // socket.join(room);
    img.src = streamData;
});





// function GetParameterValues(param) {  
//     var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');  
//     for (var i = 0; i < url.length; i++) {  
//         var urlparam = url[i].split('=');  
//         if (urlparam[0] == param) {  
//             return urlparam[1];  
//         }  
//     }  
// }