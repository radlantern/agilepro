$(document).ready(function()
{
	var $window = $(window);
	var win = {height: $window.height(), width: $window.width()};

	//$('.page').css({height: win.height / 2, width: win.width});
	//TweenMax.to($('#nucleus'),0,{height: win.height/1.5, width: win.height/1.5});
	TweenMax.to($('.page'),0,{translateZ: win.height/1.5/1.9});

	var sides = $('.page').length;
	/*$('.page').each(function(index){
		//place each page to a side of the center.
		var rotation = 360 / sides * index;
		var distance = win.height/3;
		if (rotation > 89 || rotation > 269) {
			distance = distance * -1;
		}
		TweenMax.to($(this),0,{ rotationY: rotation, z: distance});
	});*/
	TweenMax.to('#nucleus',10,{rotationY: 400, ease: Linear.easeNone, onComplete: startSite});
	TweenMax.to('#nucleus',10,{z:-1000});
});

function startSite() {
	//TweenMax.to('#shape',10,{rotationZ: 360, ease: Linear.easeNone});

}