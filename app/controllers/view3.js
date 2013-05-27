Ti.App.addEventListener("sliderToggled", function(e) {
	if (e.hasSlided) {
		$.timap.touchEnabled = false;
	}
	else {
		$.timap.touchEnabled = true;
	}
});