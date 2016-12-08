var express = require('express');
var path = require('path');
var BodyParser = require('body-parser')
var app = express();
app.use(express.static(path.join(__dirname,'./static')));
app.use(BodyParser.urlencoded({extended:true}));
app.set('views',path.join(__dirname,'./views'));
app.set('view engine','ejs');

app.get('/',function(request,response) {
	response.render('index')
})

var port = 5000;
var server = app.listen(port, function(){
	console.log('Running at LOCALHOST Port',port);
})

var times = 0;
var socket_names = {};
var io = require('socket.io').listen(server);
io.sockets.on('connection',function(socket) {
	console.log('New connection socket:',socket.id);

	socket.on("SOCKET_NAME",function(data) {
		// console.log('data:',data)
		socket_names[socket.id] = data;
	})

	socket.on("inquire",function(data){
		var emit_name = "set_counter";
		socket.emit(emit_name,times);
		// console.log('Emit:',emit_name,times);	
	})

	socket.on("push_epic",function(data){
		times += 1;
		var emit_name = "set_counter";
		io.emit(emit_name,times);
		console.log('Pushed by',socket_names[socket.id])
		// console.log('Full Broadcast:',emit_name,times);
	})

	socket.on("push_reset",function(data){
		times = 0;
		var emit_name = "set_counter";
		io.emit(emit_name,times);
		console.log('Reset by',socket_names[socket.id])
		// console.log('Full Broadcast:',emit_name,times);
	})
})