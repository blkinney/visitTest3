var moment = require("moment");
var args = arguments[0] || {}
var events = args.events;


$.parentController = args.parentTab;
$.title.text = args.data.attributes.title;
$.phone.text = args.data.attributes.phone;
$.place.text = args.data.attributes.place;
$.street.text = args.data.attributes.street;
$.citZip.text = args.data.attributes.citZip;

var date = moment.unix(args.data.attributes.time);
var dateEnd = moment.unix(args.data.attributes.end);

$.date_dow.text = date.format("ddd").toUpperCase();
$.date_month.text = date.format("MMM");
$.date_day.text = date.format("DD");
$.time.text = date.format("h:mm a") + ' on ' + date.format("MMMM Do, YYYY");
$.endTime.text = dateEnd.format("h:mm a") + ' on ' + dateEnd.format("MMMM Do, YYYY");

function doClickShare(e){
    Titanium.API.info("You clicked the Share button");
    
    var Social = require('dk.napp.social');

	Social.activityView({
			text: 'Check out this awesome event: ' + args.data.attributes.title + '!', removeIcons:'weibo'
		});
};

var calendar = require('com.gs.calendar');

function doClickCal(e){
    Titanium.API.info("You clicked the Calendar button");

	var startDate = moment.unix(args.data.attributes.time);	// event should start now
	var endDate = moment.unix(args.data.attributes.end);
	
	// startDate.format("MMMM D, YYYY");
	// endDate.format("MMMM D, YYYY");
	
    // create and show the event dialog
    var eventDialog = calendar.createEventDialog({
        eventTitle:args.data.attributes.title,	// optional
        eventStartDate:startDate.toDate(),	// optional
        eventEndDate:endDate.toDate(),		// optional
        eventLocation:args.data.attributes.location,	// optional
        eventNotes:"Note",	// optional
        
        //eventAllDay:true,		// optional - can set to true for all day events
        
        animated:true,			// optional - default is true
	barColor:"#000"			// optional - sets the navbar color
    });
    
    // attach a listener for the "complete" event
	eventDialog.addEventListener("complete", function(e) {
		if (e.success) {
			// event was added!
			//label.text = "Event was successfully added";
			Titanium.API.info("success");
			
			/*
			 * e.eventIdentifier is a unique string used to identify the event inside the event store
			 * You can save this to your DB for example, for future syncing
			 */
			Titanium.API.info("eventIdentifier of the added event: " + e.eventIdentifier);
			
		} else {
			// event was NOT added
			
			switch (e.action) {
				case eventDialog.CANCELED: 
					//label.text = "User has canceled the dialog";
					
					Titanium.API.info("cancel");
					break;
				case eventDialog.NOT_SUPPORTED:
					//label.text = "EventKit is only supported on iOS 4 and newer";
					Titanium.API.info("not support");
					break;
				case eventDialog.SAVED:
					// user tried to save the event, but something went wrong
					//label.text = "Error while trying to save the event";
					Titanium.API.info("not saved");
					break;
			}
		}
	});
 
	// show the event dialog
	eventDialog.open();
    
};

function doClickPhone(e){
    Titanium.API.info("You clicked the Phone button");
    var the_number = args.data.attributes.phone;
	Ti.Platform.openURL('tel:+the_number');
};

function doClickMap(e){
    Titanium.API.info("You clicked the Map button");
    var the_address = args.data.attributes.addr;
	Ti.Platform.openURL("http://maps.apple.com/maps?q="+args.data.attributes.addr);
};
