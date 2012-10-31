var animateLeft = Ti.UI.createAnimation({
	left : 250,
	curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
	duration : 150
});

var animateRight = Ti.UI.createAnimation({
	left : 0,
	curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
	duration : 150
});

var touchStartX = 0;
var touchStarted = false;

$.innerwin.addEventListener('touchstart', function(e) {
	touchStartX = parseInt(e.x, 10);
});

$.innerwin.addEventListener('touchend', function(e) {
	touchStarted = false;
	if ($.win.left >= 150) {
		$.win.animate(animateLeft);
		hasSlided = true;
	} else {
		$.win.animate(animateRight);
		hasSlided = false;
	}
});

$.innerwin.addEventListener('touchmove', function(e) {
	// TODO: Use convertPointToView when fixed in SDK.
	//var coords = e.source.convertPointToView({x:e.x,y:e.y}, $.innerwin);
	//var x = parseInt(coords.x, 10);
	var x = parseInt(e.globalPoint.x, 10);
	var newLeft = x - touchStartX;
	if (touchStarted) {
		if (newLeft <= 250 && newLeft >= 0) {
			$.win.left = newLeft;
		}
	}
	if (newLeft > 30) {
		touchStarted = true;
	}
});

$.button.addEventListener('singletap', function(e) {
	$.toggleSlider();
});

var hasSlided = false;
exports.toggleSlider = function() {
	if (!hasSlided) {
		$.win.animate(animateLeft);
		hasSlided = true;
	} else {
		$.win.animate(animateRight);
		hasSlided = false;
	}
}