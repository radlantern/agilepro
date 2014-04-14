$(document).ready(function()
{
	TweenMax.to('#shape',5,{rotationY: 400, rotationX: -360, ease: Linear.easeNone, onComplete: startSite});
	TweenMax.to('#stage',5,{z:0});
});

function startSite() {
	//TweenMax.to('#shape',10,{rotationZ: 360, ease: Linear.easeNone});

}