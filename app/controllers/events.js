var strftime = require('strftime');
var moment = require("moment");

var events = Alloy.Collections.events;

var currentDay = moment().startOf('week');
var currentDayNext = moment().endOf('week');

events.thisWeek(currentDay, currentDayNext);

$.weekNow.text = currentDay.format("MM/DD/YYYY")+' - '+ currentDayNext.format("MM/DD/YYYY");

//function updateUI(){}

function transformData(model) {
	var attrs = model.toJSON();
	attrs.date_day = strftime('%d', events.get('time'));
	attrs.date_dow = strftime('%a', events.get('time')).toUpperCase();
	attrs.time = 'from ' + strftime('%l:%M %p', events.get('time')) + ' to' + strftime('%l:%M %p', events.get('end'));
	attrs.row_color = '#fff';
	
	return attrs;
}

$.table.addEventListener('click', function(_e) {
    var detailController = Alloy.createController('event_detail', {
        parentTab : $.eventsTab,
        data : events.at(_e.index)
    });
    $.eventsTab.open(detailController.getView());
});

function doClickNext(e){
    Titanium.API.info("You clicked the next week button");
    currentDay.add('days', 7);
    currentDayNext.add('days', 7);
    $.weekNow.text = currentDay.format("MM/DD/YYYY")+' - '+ currentDayNext.format("MM/DD/YYYY");
    events.thisWeek(currentDay, currentDayNext);
};

function doClickPrev(e){
    Titanium.API.info("You clicked the previous week button");
    $.weekNow.text = 'Last Week';
    currentDay.subtract('days', 7);
    currentDayNext.subtract('days', 7);
    $.weekNow.text = currentDay.format("MM/DD/YYYY")+' - '+ currentDayNext.format("MM/DD/YYYY");
    events.thisWeek(currentDay, currentDayNext);
};