function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
$(document).ready(function()
{
	//Perform the fly-in animation
	TweenMax.fromTo('#nucleus',2,{rotationY: getRandomInt(-500,500), rotationX: getRandomInt(-500,500), z: 5000},{rotationY: 230, rotationX: 140, z:0, onComplete: logoInteractions});
	TweenMax.to('.face',0.75,{opacity: 0.8});
});

function loader(p) {
	var percentage = p;
	if (percentage === 0) {
		TweenMax.set('#progressPusher',{width: percentage+'%'});
		TweenMax.to('#loaderBar',0.5,{opacity: 1});
		return;
	}
	TweenMax.to('#progressPusher',2,{width: percentage+'%', onComplete:
		function(){
			if(percentage >= 100){
				TweenMax.to('#loaderBar',0.5,{opacity: 0});
			}
		}
	});
}

function logoInteractions() {
	danceLoop();

	//H8Rs gonna H8.  One-liners gonna play.
	$('#siteName').css({display: 'inline-block'}).html('<span>'+$('#siteName').text().split("").join('</span><span>')+'</span>').find('span').css({color: '#fdf5ec'}).each(function(index){$(this).attr('id','nameLetter'+index)});

	$('#siteName span').each(function(index){
		var letter = this;
		TweenMax.to(this,0.4,{css:{color: '#8fcaf1', textShadow:"-4px 0px 8px #8fcaf1"}});
		TweenMax.to(this,0.8,{css:{color: '#000000'}, delay: 0.1 * index + 0.6});
		TweenMax.to(this,0.4,{css:{textShadow:"1px 1px 8px #ffba75"}, delay: 0.1 * index + 0.4});
		TweenMax.to(this,0.6,{css:{textShadow:"0px 0px 0px #fdf5ec"}, delay:1.5, onComplete: function(){
				$(letter).attr({style: ''});
			}
		});
	});
	
	//tells the loader to become visible
	loader(0);
	//sets the progress bar to 100% for no good reason;
	setTimeout(function(){ loader(100); },1500);

	//For Jason
	$('#logo').css({cursor: 'help'}).click(function(){
		if(window.wheeeTl && window.wheeeTl._active) return;
		danceLoop(true);
		var tl = window.wheeeTl = new TimelineMax({repeat:0, onComplete: danceLoop});
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
	tl.add(TweenMax.to('#nucleus.dance',2,{rotationY: getRandomInt(-360,360), rotationX: getRandomInt(-360,360)}));
	tl.add(TweenMax.to('#nucleus.dance',2,{rotationY: getRandomInt(-360,360), rotationX: getRandomInt(-360,360)}));
	tl.add(TweenMax.to('#nucleus.dance',2,{rotationY: 230, rotationX: 140,}));
	window.danceLoopTimer = setTimeout(danceLoop, 15000);
}