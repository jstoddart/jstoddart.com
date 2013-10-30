$(document).ready(function(){
	console.log('document is ready.');

	$('#mySVG').load('svg/test_1.' + 'svg', function(){
		//do stuff here
	});

	$('#mySVG').draggable();
});

$(window).load(function(){
	console.log ('content loaded');

	$('circle').click(function(){
		var name = $(this).attr('id');
		var loc = '[ ' + toString($(this).attr('cx')) + ', ' + toString($(this).attr('cy')) + ' ]';
		$('#objID').empty();
		$('#objID').append(name);
		$('#objLoc').empty();
		$('#objLoc').append(loc);
		
	});

	$('circle').mouseup(function(){
		$('#objID').empty();
		$('#objID').append('nothing hovering');
		$('#objLoc').empty();
		$('#objLoc').append('[ px , py');
	}); 

});



