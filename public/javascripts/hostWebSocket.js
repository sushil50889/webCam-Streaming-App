var socket = io();
// socket.on('connect', function(){
//     console.log('FROM CLIENT : Connected to the server.');
//     // socket.emit('stream', stream);
//     // var room = GetParameterValues('room');
//     // console.log(room);
// });




var video = document.getElementById('video');
var canvas = document.getElementById('preview');
var context = canvas.getContext('2d');

canvas.width = 480;
canvas.height = 360;

context.width = canvas.width;
context.height = canvas.height;

function loadCam(stream){
    // var video = $('#video');
    // console.log(video);
    // video.src = window.URL.createObjectURL(stream);
    video.srcObject = stream;
    console.log('from load cam stream');        
    socket.emit('stream', stream);        
    // socket.emit('stream', 'dsdfsdfs');        
}


function loadFail(stream){
    console.log('from loadfail cam stream');
}

function viewVideo(video, context){
    context.drawImage(video, 0, 0, context.width, context.height);
    // var room = GetParameterValues('room');
    // console.log(room);
    socket.emit('stream', canvas.toDataURL('image/webp'));
    // socket.emit('stream', {room: room, data: canvas.toDataURL('image/webp')});
}




socket.on('connect', function(){
    console.log('FROM CLIENT : Connected to the server.');
    // socket.emit('stream', stream);
    // var room = GetParameterValues('room');
    // console.log(room);
    $(function() {
        // var video = $('#video').attr('src');
        navigator.getUserMedia = (
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msgGetUserMedia
        );
    
    
        if(navigator.getUserMedia){
            navigator.getUserMedia({video: true}, loadCam, loadFail);
        }
    
    
        setInterval(function(){
            viewVideo(video, context);
        }, 50);    
        // console.log( "ready!" );
    });
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

