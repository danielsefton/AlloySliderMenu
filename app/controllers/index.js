var data = [];

for ( i = 0; i < 4; i++) {

	var section = Ti.UI.createTableViewSection();

	var customView = Ti.UI.createView({
		height : 'auto',
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
	for ( j = 1; j < 4; j++) {
		var args = {
			title : 'Row ' + j,
			customView : 'view' + j,
			image : "images/ic_search.png"
		};
		section.add(Alloy.createController('menurow', args).getView());
	}

	data[i] = section;
}

// Pass data to widget tableView
$.ds.tableView.data = data;

var currentView = Alloy.createController("view1").getView();
$.ds.contentview.add(currentView);

// Swap views on menu item click
$.ds.tableView.addEventListener('click', function selectRow(e) {
	if (currentView.id != e.row.customView) {
		$.ds.contentview.remove(currentView);
		currentView = Alloy.createController(e.row.customView).getView();
		$.ds.contentview.add(currentView);
	}
	$.ds.toggleLeftSlider();
});

// Set row title highlight colour
var storedRowTitle = null;
$.ds.tableView.addEventListener('touchstart', function(e) {
	storedRowTitle = e.row.customTitle;
	storedRowTitle.color = "#FFF";
});
$.ds.tableView.addEventListener('touchend', function(e) {
	storedRowTitle.color = "#666";
});
$.ds.tableView.addEventListener('scroll', function(e) {
	if (storedRowTitle != null)
		storedRowTitle.color = "#666";
});

if (Ti.Platform.osname === 'iphone')
	$.win.open({
		transition : Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
	});
else
	$.win.open();
