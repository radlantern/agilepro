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

function loadNavStack(path) {
	path = path || 'home';
	$.get('/views/nav/'+path+'.hbt').then(function(src) {

		var $newMenu = $(Handlebars.compile(src)());
		$newMenu.find('.navPlatform').css({opacity: 0});
		$('#navStack').append($newMenu);
		
		TweenMax.fromTo($newMenu.find('.navPlatform'),1,{z:200},{z:0 ,onComplete: function()
		{
			$('body').unbind('mousemove').mousemove(function(e)
			{
				var maxTilt = 20;
				var $this = $('#navStack .navPlatform');
				var height = $this.height();
				var width = $this.width();

				var navOffset = $this.offset();

				var accrossPercent = (e.screenX - navOffset.left) / width - 0.6;
				var upDownPercent = (e.screenY - navOffset.top) / height - 0.9;

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

		$newMenu.find('.navSquare')
		.mouseenter(function(){
			$('#navTip').html($(this).data('tip'));
		})
		.mouseleave(function(){
			$('#navTip').html('');
		})
		.click(function(){
			if (!$(this).parent().hasClass('current')) {
				return;
			}

			TweenMax.to(this,0.5,{z:20, background: '#CD2825',});
			TweenMax.to($(this).siblings('.navSquare'),0.35,{z:0, background: '#767575'});

			if($(this).data('back'))
			{
				var $previousMenus = $(this).parent().siblings();
				TweenMax.to($(this).parent(),0.25,{z:200, opacity: 0, ease: Sine.easeOut, onComplete: function(){
					$(this.target).remove();
				}});
				$previousMenus.each(function(index){
					TweenMax.to(this,0.25,{z:0, opacity: 1, delay: 0.5 * $previousMenus.length - index - 1 + 0.5});
					if (index + 1 === $previousMenus.length) {
						$(this).addClass('current');
					}
				});
				return;
			}
			if($(this).data('menu'))
			{
				$parent = $(this).parent();
				$parent.removeClass('current');
				var menu = $(this).data('menu');
				TweenMax.to($parent,0.25,{z:-100, opacity: 0.5, ease: Sine.easeInOut, delay: 0.35, onComplete: function(){
					loadNavStack(menu);
				}});
			}

			if($(this).data('url'))
			{
				loader(0);
				loader(50);
				loader(100);
				changePage($(this).data('url'),viewContext);
			}
		});
	});
}