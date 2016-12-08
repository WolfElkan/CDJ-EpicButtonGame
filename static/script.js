var socket = io.connect();

socket.emit("inquire");
var times = 0;
var plural = true;
var _plural = true; // Leading Underscore indicates former value

function socket_name(data) {
	var emit_name = "SOCKET_NAME";
	socket.emit(emit_name,data);
	console.log('Emit:',emit_name,data);	
}

function set_counter_to(num) {
	$('#times').html(num);
	plural = (num != 1);
	if (plural ^ _plural) {
		if (plural) {
			$('#plural').html('s');
		} else {
			$('#plural').html('');
		}
	}
	_plural = (num != 1);
}

socket.on("set_counter",function(data){
	console.log('data:',data);
	times = data;
	set_counter_to(times);
})

$(document).ready(function(){
	set_counter_to(times);

	$('#epic').click(function(){
		console.log('epic')
		var emit_name = "push_epic";
		socket.emit(emit_name);
		console.log('Emit:',emit_name);	
	});

	$('#reset').click(function(){
		var emit_name = "push_reset";
		socket.emit(emit_name);
		console.log('Emit:',emit_name);	
	});
})