var leftData = [];
var rightData = [];

if (OS_IOS || OS_ANDROID) {
	Alloy.Globals.Map = require('ti.map');
}

function createSection() {
	var section = Ti.UI.createTableViewSection();

	var customView = Ti.UI.createView({
		height : 'auto',
		backgroundColor : "#EEE",
		backgroundGradient : {
			type : "linear",
			startPoint : {
				x : "0%",
				y : "0%"
			},
			endPoint : {
				x : "0%",
				y : "100%"
			},
			colors : [{
				color : "#EEE",
				offset : 0.0
			}, {
				color : "#CCC",
				offset : 1.0
			}]
		}
	});

	var customLabel = Ti.UI.createLabel({
		top : 8,
		bottom : 8,
		left : 10,
		right : 10,
		height : 'auto',
		text : 'HEADER',
		font : {
			fontSize : 12,
			fontWeight : 'bold'
		},
		color : '#666666'
	});

	customView.add(customLabel);

	section.headerView = customView;
	for (var j = 1; j < 4; j++) {
		var args = {
			title : 'Row ' + j,
			customView : 'view' + j,
			image : "images/ic_search.png"
		};
		section.add(Alloy.createController('menurow', args).getView());
	}

	return section;
}

function rowSelect(e) {
	if (currentView.id != e.row.customView) {
		$.ds.contentview.remove(currentView);
		currentView = Alloy.createController(e.row.customView).getView();
		$.ds.contentview.add(currentView);
	}
}

for (var i = 0; i < 4; i++) {
	leftData[i] = createSection();
	rightData[i] = createSection();
}

// Pass data to widget leftTableView and rightTableView
$.ds.leftTableView.data = leftData;
$.ds.rightTableView.data = rightData;

var currentView = Alloy.createController("view1").getView();
$.ds.contentview.add(currentView);

// Swap views on menu item click
$.ds.leftTableView.addEventListener('click', function selectRow(e) {
	rowSelect(e);
	$.ds.toggleLeftSlider();
});
$.ds.rightTableView.addEventListener('click', function selectRow(e) {
	rowSelect(e);
	$.ds.toggleRightSlider();
});

// Set row title highlight colour (left table view)
var storedRowTitle = null;
$.ds.leftTableView.addEventListener('touchstart', function(e) {
	storedRowTitle = e.row.customTitle;
	storedRowTitle.color = "#FFF";
});
$.ds.leftTableView.addEventListener('touchend', function(e) {
	storedRowTitle.color = "#666";
});
$.ds.leftTableView.addEventListener('scroll', function(e) {
	if (storedRowTitle != null)
		storedRowTitle.color = "#666";
});

// Set row title highlight colour (right table view)
var storedRowTitle = null;
$.ds.rightTableView.addEventListener('touchstart', function(e) {
	storedRowTitle = e.row.customTitle;
	storedRowTitle.color = "#FFF";
});
$.ds.rightTableView.addEventListener('touchend', function(e) {
	storedRowTitle.color = "#666";
});
$.ds.rightTableView.addEventListener('scroll', function(e) {
	if (storedRowTitle != null)
		storedRowTitle.color = "#666";
});

Ti.App.addEventListener("sliderToggled", function(e) {
	if (e.direction == "right") {
		$.ds.leftMenu.zIndex = 2;
		$.ds.rightMenu.zIndex = 1;
	} else if (e.direction == "left") {
		$.ds.leftMenu.zIndex = 1;
		$.ds.rightMenu.zIndex = 2;
	}
});

if (Ti.Platform.osname === 'iphone')
	$.win.open({
		transition : Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
	});
else
	$.win.open();
