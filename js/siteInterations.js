function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
$(document).ready(function()
{
	//Perform the intro animation then load the
	TweenMax.fromTo('#nucleus',2,{rotationY: getRandomInt(-500,500), rotationX: getRandomInt(-500,500), z: 5000},{rotationY: 230, rotationX: 140, z:0, onComplete: logoInteractions});
	TweenMax.to('.face',0.75,{opacity: 0.8});
});

function logoInteractions() {
	danceLoop();
	$('#nucleus').click(function(){
		if(window.wheeeTl && window.wheeeTl._active)
		{
			return;
		}
		danceLoop(true);
		var tl = window.wheeeTl = new TimelineMax({repeat:0, onComplete: danceLoop}); //alert('done'); }
		tl.add(TweenMax.to('#nucleus',3,{rotationY: 3000}));
		tl.add(TweenMax.to('#nucleus',3,{rotationY: 230, rotationX: 140, ease: Sine.easeInOut}));
		TweenMax.to('#wheee',0.5,{css:{opacity: 1}});
		TweenMax.to('#wheee',0.5,{css:{opacity: 0}, delay: 2});
	});
}

//spins the cube to some random coords then back to some multiple of the base coords.
function danceLoop(stop) {
	var tl;
	if (!window.danceLoopTimer) {
		$('#nucleus').addClass('dance');
		window.danceLoopTimer = setTimeout(danceLoop, 5000);
		return;
	}
	if (stop) {
		if (window.danceTl) {
			window.danceTl.stop();
		}
		clearTimeout(window.danceLoopTimer);
		window.danceLoopTimer = false;
		$('#nucleus').removeClass('dance');
		return;
	}
	tl = window.danceTl = new TimelineMax({repeat:0});
	tl.add(TweenMax.to('#nucleus.dance',2,{rotationY: getRandomInt(-500,500), rotationX: getRandomInt(-500,500)}));
	tl.add(TweenMax.to('#nucleus.dance',2,{rotationY: getRandomInt(-500,500), rotationX: getRandomInt(-500,500)}));
	tl.add(TweenMax.to('#nucleus.dance',2,{rotationY: 590, rotationX: 500,}));
	window.danceLoopTimer = setTimeout(danceLoop, 15000);
}