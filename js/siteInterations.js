function startNavStack() {
	changePage('content/intro.hbt',{myName: 'Robert Lynch'})
}

function changePage(view,context) {
	context = context || {};
	var $content = $('#content');
	TweenMax.to($content, 0.5, {opacity: 0, onComplete: function(){
		$.get('/views/'+view).then(function(src) {
			$content.html(Handlebars.compile(src)(context));
			TweenMax.to($content, 1, {opacity: 1});
		});
	}});
}
