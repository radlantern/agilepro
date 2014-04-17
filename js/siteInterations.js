function startNavStack() {

}

function changePage(view,context) {
	context = context ||
	$.get(view).then(function(src) {
		$('#content').html(Handlebars.compile(src)(context));
	});
}
