$(document).ready(function(){
	console.log("document loaded.");

	//establish limits
	var MaxViews = 4;
	var MaxTween = 2;
	var MaxZoom = 3;

	//toggle behaviors
	var SpinToggle = true;
	var ZoomToggle = true;

	//current position logger
	var CurrentLoc = 1;
	var CurrentZoom = 1;

	//transition speed
	var SpinSpeed = 500;

	//variables for operating elements
	var $img = $('#image img');
	var $svg = $('#overlay');


	$svg.load('svg/bm--1__1.' + 'svg', function() {  
		$svg.attr('width',$img.attr('width'));
		$svg.attr('height',$img.attr('height'));
	});
	console.log("svg loaded.");

	//REFERENCE
	//image format - "bm--[zoom]__[angle]_-[tween].png"

	function spinLeft(){
		console.log ('spinLeft() called');

		//turn of tweening frames at max zoom level
		if (CurrentZoom > 1){
			SpinToggle = false;
		}else{
			SpinToggle = true;
		}

		//stop Zooming while spin is in effect
		ZoomToggle = false;

		//clear SVG to prevent selection while turning
		$svg.empty();

		//pull source file location from current image
		var src = $('#image img').attr('src');

		//index filename variables
		var index1 = src.indexOf('--')+2;
		var index2 = src.indexOf('__')+2;
		var index3 = src.indexOf('_-')+2;

		//parse filename variables
		var zoomIndex = parseInt(src.substr(index1,1));
		var angleIndex = parseInt(src.substr(index2,1));
		var tweenIndex = parseInt(src.substr(index3,1));

		console.log ("zoom level: "+zoomIndex+" / angle: "+angleIndex+" / tween frame: "+tweenIndex);

		//for values at the min
		if (angleIndex >= MaxViews){
			if (SpinToggle){
				angleIndex = 1;
				tweenIndex = 1;
			}
			else {
				angleIndex = 1;
				tweenIndex = 0;
			}
		}

		//for all numbers above the min
		else if (angleIndex < MaxViews){
			if (SpinToggle){
				angleIndex++;
				tweenIndex = 1;
			}
			else{
				angleIndex++;
				tweenIndex = 0;
			}
		}

		while(tweenIndex>0){
			setTimeout(function(){
				var src = $img.attr('src');
				//set new source for next frame
				var srcNew = "img/bm--"+zoomIndex+"__"+angleIndex+"_-"+tweenIndex+".png";
				//set image tag to new image
				$img.attr('src',srcNew);
			}, SpinSpeed);

			console.log ("zoom level: "+zoomIndex+" / angle: "+angleIndex+" / tween frame: "+tweenIndex);
			tweenIndex++;
			if (tweenIndex > MaxTween) tweenIndex = 0;

		}

		console.log ("zoom level: "+zoomIndex+" / angle: "+angleIndex+" / tween frame: "+tweenIndex);

		//set new source for next frame
		var srcNew = "img/bm--"+zoomIndex+"__"+angleIndex+"_-"+tweenIndex+".png";

		//log current frame to global variable
		CurrentLoc = angleIndex;

		//set image tag to new image
		$img.attr('src',srcNew);

		//load new svg
		$svg.load('svg/bm--'+zoomIndex+'__'+angleIndex+'.svg', function() {  
			$svg.attr('width',$img.attr('width'));
			$svg.attr('height',$img.attr('height'));
		});

		console.log('svg '+zoomIndex+'/'+angleIndex+' loaded.');

		//re-enable zooming
		ZoomToggle = true;

	}//end SpinLeft

	function spinRight(){
		onsole.log ('spinRight() called');

		//turn of tweening frames at max zoom level
		if (CurrentZoom > 1){
			SpinToggle = false;
		}
		else{
			SpinToggle = true;
		}

		//stop Zooming while spin is in effect
		ZoomToggle = false;

		//clear SVG to prevent selection while turning
		$svg.empty();

		//pull source file location from current image
		var src = $('#image img').attr('src');

		//index filename variables
		var index1 = src.indexOf('--')+2;
		var index2 = src.indexOf('__')+2;
		var index3 = src.indexOf('_-')+2;

		//parse filename variables
		var zoomIndex = parseInt(src.substr(index1,1));
		var angleIndex = parseInt(src.substr(index2,1));
		var tweenIndex = parseInt(src.substr(index3,1));

		console.log ("zoom level: "+zoomIndex+" / angle: "+angleIndex+" / tween frame: "+tweenIndex);

		if (angleIndex <= 1){
			if (SpinToggle){
				angleIndex = MaxViews;
				tweenIndex = MaxTween;
			}
			else {
				angleIndex = MaxViews;
				tweenIndex = 0;
			}
		}

		else if (angleIndex > 1){
			if (SpinToggle){
				angleIndex--;
				tweenIndex = MaxTween;
			}
			else {
				angleIndex--;
				tweenIndex=0;
			}
		}

	} //end SpinRight

});