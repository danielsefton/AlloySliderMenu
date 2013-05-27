Ti.App.addEventListener("sliderToggled", function(e) {
	if (e.hasSlided) {
		$.table.touchEnabled = false;
	}
	else {
		$.table.touchEnabled = true;
	}
});