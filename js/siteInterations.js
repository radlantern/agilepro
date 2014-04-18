var viewContext = {myName: 'Robert Lynch'};

function startNavStack() {
	loadNavStack();
}

function changePage(view,context) {
	context = context || {};
	var $content = $('#content');
	TweenMax.to($content, 0.5, {opacity: 0, onComplete: function(){
		$.get('/views/'+view+'.hbt').then(function(src) {
			$content.html(Handlebars.compile(src)(context));
			TweenMax.to($content, 1, {opacity: 1, delay: 0.5});
		});
	}});
}

function loadNavStack() {
	$.get('/views/nav/home.hbt').then(function(src) {

		$('#navStack').append(Handlebars.compile(src)());



		TweenMax.to($('#navStack .navPlatform'),0.5,{rotationX: 10,rotationY: -20,onComplete: function()
						{
							$('body').mousemove(function(e)
							{
								var maxTilt = 20;
								var $this = $('#navStack .navPlatform');
								var height = $this.height();
								var width = $this.width();

								var navOffset = $this.offset();

								var accrossPercent = (e.screenX - navOffset.left) / width - 0.6;
								var upDownPercent = (e.screenY - navOffset.top) / height - 0.75;

								var yMod = maxTilt * accrossPercent;
								var xMod = maxTilt * upDownPercent;

								if (yMod > maxTilt || yMod < -maxTilt) {
									yMod = maxTilt | (-0 & yMod);
								}
								if (xMod > maxTilt || xMod < -maxTilt) {
									xMod = maxTilt | (-0 & xMod);
								}

								TweenMax.to($this,0.5,{rotationX: xMod,rotationY: -yMod});
							});
						}});
		$('.navSquare').click(function(){
			if (!$(this).parent().hasClass('current')) {
				return;
			}
			$(this).parent().removeClass('current');
			TweenMax.to(this,0.5,{z:5, opacity: 1,});
			TweenMax.to($(this).siblings(),0.35,{z:-10, opacity: 0.5});

			if($(this).data('menu'))
			{
				TweenMax.to($(this).parent(),0.25,{z:-100, x: -10, ease: Sine.easeInOut, delay: 0.25});
			}else{
				loader(0);
				loader(50);
				loader(100);
				changePage($(this).data('url'),viewContext);
			}

		});
	});
}