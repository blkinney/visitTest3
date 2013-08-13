var moment = require("moment");

var events = Alloy.Collections.events;

var currentDay = moment().day(1);
var currentDayNext = moment().day(7);

events.thisWeek(currentDay, currentDayNext);

$.weekNow.text = currentDay.format("MM/DD/YYYY")+' - '+ currentDayNext.format("MM/DD/YYYY");

//function updateUI(){}

function transformData(model) {
	var attrs = model.toJSON();
	var date = moment.unix(model.get('time'));
	var dateEnd = moment.unix(model.get('end'));
	attrs.date_day = date.format("DD");
	attrs.date_dow = date.format("ddd");
	attrs.time = 'from ' + date.format("h:mm a") + ' to' + dateEnd.format("h:mm a");
	
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