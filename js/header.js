function startHeader()
{
  //Perform the fly-in animation
  TweenMax.fromTo('#nucleus',2,{rotationY: getRandomInt(-270,270), rotationX: getRandomInt(-270,270), z: 250},{rotationY: 230, rotationX: 140, z:0, onComplete: logoInteractions});
  TweenMax.to('.face',0.75,{opacity: 0.8});
}

function loader(p) {
	var percentage = p;
	if (percentage === 0) {
		TweenMax.set('#progressPusher',{width: percentage+'%'});
		TweenMax.to('#loaderBar',0.5,{opacity: 1});
		return;
	}
	TweenMax.to('#progressPusher',2,{width: (percentage-0.1)+'%', onComplete:
		function(){
			if(percentage >= 100){
				//TweenMax.set('#progressPusher',{width: '99.9%'});
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
		TweenMax.to(this,0.4,{css:{color: '#8fcaf1', textShadow:"2px -4px 8px #8fcaf1"}, delay: 0.05 * index});
		TweenMax.to(this,0.8,{css:{color: '#000000'}, delay: 0.1 * index + 0.6});
		TweenMax.to(this,0.4,{css:{textShadow:"1px 1px 8px #ffba75"}, delay: 0.07 * index + 0.4});
		TweenMax.to(this,0.6,{css:{textShadow:"0px 0px 0px #fdf5ec"}, delay:1.5, onComplete: function(){
				$(letter).attr({style: ''});
			}
		});
	});
	//split wheee
	$('#wheee').css({display: 'inline-block'}).html('<span>'+$('#wheee').text().split("").join('</span><span>')+'</span>');

	//tells the loader to become visible
	loader(0);
	loader(50);
	//sets the progress bar to 100% for no good reason;
	setTimeout(function(){
		loader(100);
		startNavStack();
	},1500);

	//For Jason
	$('#logo').css({cursor: 'help'}).click(function(){
		if(window.wheeeTl && window.wheeeTl._active) window.wheeeTl.stop();
		danceLoop(true);
		var tl = window.wheeeTl = new TimelineMax({repeat:0, onComplete: danceLoop});
		tl.add(TweenMax.to('#nucleus',3,{rotationY: 2900, onStart: function(){
			$('#nucleus .back').html('<img src="/img/rob_cube.jpg">');
		}}));
		tl.add(TweenMax.to('#nucleus',3,{rotationY: 230, rotationX: 140, ease: Sine.easeInOut}));
		TweenMax.to('#wheee',0.2,{css:{opacity: 1}});
		$('#wheee span').each(function(index){
		  if (index) {
			TweenMax.to(this,0.2,{css:{z:-50},ease: Sine.easeIn, delay: 0.1 * index+0.1});
			TweenMax.to(this,0.2,{css:{z:0},ease: Linear.easeNone,delay: 0.1 * index+0.3});
			TweenMax.to(this,0.2,{css:{z:-50},ease: Linear.easeNone,delay: 0.1 * index+0.8});
			TweenMax.to(this,0.2,{css:{z:0},ease: Sine.easeOut,delay: 0.1 * index+1});
		  }
		});
		TweenMax.to('#wheee',0.4,{css:{opacity: 0}, delay: 2.2});
	});
}

//spins the cube to some random coords then back to some multiple of the base coords.
function danceLoop(stop) {
	var tl;
	if (stop) {
		if (window.danceTl) {
			window.danceTl.stop();
		}
		clearTimeout(window.danceLoopTimer);
		window.danceLoopTimer = false;
		$('#nucleus').removeClass('dance');
		return;
	}
	if (!window.danceLoopTimer) {
		$('#nucleus').addClass('dance');
		window.danceLoopTimer = setTimeout(danceLoop, 5000);
		return;
	}
	tl = window.danceTl = new TimelineMax({repeat:0});
	tl.add(TweenMax.to('#nucleus.dance',2,{rotationY: getRandomInt(-360,360), rotationX: getRandomInt(-360,360)}));
	tl.add(TweenMax.to('#nucleus.dance',2,{rotationY: getRandomInt(-360,360), rotationX: getRandomInt(-360,360)}));
	tl.add(TweenMax.to('#nucleus.dance',2,{rotationY: 230, rotationX: 140,}));
	window.danceLoopTimer = setTimeout(danceLoop, 15000);
}
