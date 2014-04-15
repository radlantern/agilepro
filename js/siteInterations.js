function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
$(document).ready(function()
{
	var $window = $(window);
	var win = {height: $window.height(), width: $window.width()};

	//$('.page').css({height: win.height / 2, width: win.width});
	//TweenMax.set($('#nucleus'),{height: win.height/1.5, width: win.height/1.5});
	//TweenMax.set($('.page'),{transformOrigin:"50% 50% 100"});

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
	TweenMax.fromTo('#nucleus',2,{rotationY: getRandomInt(-300,300), rotationX: getRandomInt(-300,300),},{rotationY: 590, rotationX: 500, z:0, onComplete: startSite});
	TweenMax.to('.page',1,{opacity: 0.8});
	//TweenMax.to('#nucleus',10,{});
});

function startSite() {
	//TweenMax.to('#shape',10,{rotationZ: 360, ease: Linear.easeNone});

}