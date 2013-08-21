var animateRight = Ti.UI.createAnimation({
	left : 250,
	curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
	duration : 150
});

var animateReset = Ti.UI.createAnimation({
	left : 0,
	curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
	duration : 150
});

var animateLeft = Ti.UI.createAnimation({
	left : -250,
	curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
	duration : 150
});

var touchStartX = 0;
var touchRightStarted = false;
var touchLeftStarted = false;
var buttonPressed = false;
var hasSlided = false;
var direction = "reset";

$.movableview.addEventListener('touchstart', function(e) {
	touchStartX = e.x;
});

$.movableview.addEventListener('touchend', function(e) {
	if (buttonPressed) {
		buttonPressed = false;
		return;
	}
	if ($.movableview.left >= 150 && touchRightStarted) {
		direction = "right";
		$.leftButton.touchEnabled = false;
		$.movableview.animate(animateRight);
		hasSlided = true;
	}
	else if ($.movableview.left <= -150 && touchLeftStarted) {
		direction = "left";
		$.rightButton.touchEnabled = false;
		$.movableview.animate(animateLeft);
		hasSlided = true;
	} else {
		direction = "reset";
		$.leftButton.touchEnabled = true;
		$.rightButton.touchEnabled = true;
		$.movableview.animate(animateReset);
		hasSlided = false;
	}
	Ti.App.fireEvent("sliderToggled", {
		hasSlided : hasSlided,
		direction : direction
	});
	touchRightStarted = false;
	touchLeftStarted = false;
});

$.movableview.addEventListener('touchmove', function(e) {
	var coords = $.movableview.convertPointToView({
		x : e.x,
		y : e.y
	}, $.containerview);
	var newLeft = coords.x - touchStartX;
	if ((touchRightStarted && newLeft <= 250 && newLeft >= 0) || 
		(touchLeftStarted && newLeft <= 0 && newLeft >= -250)) {
		$.movableview.left = newLeft;
	}
	else {
		// Sometimes newLeft goes beyond its bounds so the view gets stuck.
		// This is a hack to fix that.
		if ((touchRightStarted && newLeft < 0) || (touchLeftStarted && newLeft > 0)) {
			$.movableview.left = 0;
		}
		else if (touchRightStarted && newLeft > 250) {
			$.movableview.left = 250;
		}
		else if (touchLeftStarted && newLeft < -250) {
			$.movableview.left = -250;
		}
	}
	if (newLeft > 5 && !touchLeftStarted && !touchRightStarted) {
		touchRightStarted = true;
		Ti.App.fireEvent("sliderToggled", {
			hasSlided : false,
			direction : "right"
		});
	}
	else if (newLeft < -5 && !touchRightStarted && !touchLeftStarted) {
		touchLeftStarted = true;
		Ti.App.fireEvent("sliderToggled", {
			hasSlided : false,
			direction : "left"
		});
	}
});

$.leftButton.addEventListener('touchend', function(e) {
	if (!touchRightStarted && !touchLeftStarted) {
		buttonPressed = true;
		$.toggleLeftSlider();
	}
});

$.rightButton.addEventListener('touchend', function(e) {
	if (!touchRightStarted && !touchLeftStarted) {
		buttonPressed = true;
		$.toggleRightSlider();
	}
});

exports.toggleLeftSlider = function() {
	if (!hasSlided) {
		direction = "right";
		$.leftButton.touchEnabled = false;
		$.movableview.animate(animateRight);
		hasSlided = true;
	} else {
		direction = "reset";
		$.leftButton.touchEnabled = true;
		$.movableview.animate(animateReset);
		hasSlided = false;
	}
	Ti.App.fireEvent("sliderToggled", {
		hasSlided : hasSlided,
		direction : direction
	});
}

exports.toggleRightSlider = function() {
	if (!hasSlided) {
		direction = "left";
		$.rightButton.touchEnabled = false;
		$.movableview.animate(animateLeft);
		hasSlided = true;
	} else {
		direction = "reset";
		$.rightButton.touchEnabled = true;
		$.movableview.animate(animateReset);
		hasSlided = false;
	}
	Ti.App.fireEvent("sliderToggled", {
		hasSlided : hasSlided,
		direction : direction
    });
}

exports.handleRotation = function() {
/*
  	Add the orientation handler in the controller that loads this widget. Like this:
	Ti.Gesture.addEventListener('orientationchange', function() {
		$.ds.handleRotation();
	});
*/
	$.movableview.width = $.navview.width = $.contentview.width = Ti.Platform.displayCaps.platformWidth;
	$.movableview.height = $.navview.height = $.contentview.height = Ti.Platform.displayCaps.platformHeight;
};
