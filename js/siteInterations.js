function startNavStack() {
	changePage('content/intro',{myName: 'Robert Lynch'});
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
		TweenMax.to($('#navStack .navPlatform'),0.5,{rotationX: 20,rotationY: 20,x: 20, z:-5});
		$('.navSquare').click(function(){
			if (!$(this).parent().hasClass('current')) {
				return;
			}
			$(this).parent().removeClass('current');
			TweenMax.to(this,0.5,{z:5, opacity: 1,});
			TweenMax.to($(this).siblings(),0.5,{z:-10, opacity: 0.5,});
			TweenMax.to($(this).parent(),0.5,{z:-60, x: -10, delay: 1});
		});
	});
}