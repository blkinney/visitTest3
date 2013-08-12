function Controller() {
    function doClickShare() {
        Titanium.API.info("You clicked the Share button");
        var Social = require("dk.napp.social");
        Social.activityView({
            text: "Check out this awesome event: " + args.data.attributes.title + "!",
            removeIcons: "weibo"
        });
    }
    function doClickCal() {
        Titanium.API.info("You clicked the Calendar button");
        var startDate = events.get("time");
        var endDate = events.get("end");
        var eventDialog = calendar.createEventDialog({
            eventTitle: args.data.attributes.title,
            eventStartDate: startDate,
            eventEndDate: endDate,
            eventLocation: args.data.attributes.location,
            eventNotes: "Note",
            animated: true,
            barColor: "#000"
        });
        eventDialog.addEventListener("complete", function(e) {
            if (e.success) {
                Titanium.API.info("success");
                Titanium.API.info("eventIdentifier of the added event: " + e.eventIdentifier);
            } else switch (e.action) {
              case eventDialog.CANCELED:
                Titanium.API.info("cancel");
                break;

              case eventDialog.NOT_SUPPORTED:
                Titanium.API.info("not support");
                break;

              case eventDialog.SAVED:
                Titanium.API.info("not saved");
            }
        });
        eventDialog.open();
    }
    function doClickPhone() {
        Titanium.API.info("You clicked the Phone button");
        args.data.attributes.phone;
        Ti.Platform.openURL("tel:+the_number");
    }
    function doClickMap() {
        Titanium.API.info("You clicked the Map button");
        args.data.attributes.addr;
        Ti.Platform.openURL("http://maps.apple.com/maps?q=" + args.data.attributes.addr);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.eventWindow = Ti.UI.createWindow({
        layout: "vertical",
        backgroundColor: "#fff",
        id: "eventWindow",
        title: "Event Details"
    });
    $.__views.eventWindow && $.addTopLevelView($.__views.eventWindow);
    $.__views.scrollView = Ti.UI.createScrollView({
        id: "scrollView",
        showVerticalScrollIndicator: "true",
        showHorizontalScrollIndicator: "false",
        height: "100%",
        width: "100%"
    });
    $.__views.eventWindow.add($.__views.scrollView);
    $.__views.dateTitleSection = Ti.UI.createView({
        height: "20%",
        width: "100%",
        top: 0,
        id: "dateTitleSection"
    });
    $.__views.scrollView.add($.__views.dateTitleSection);
    $.__views.dayView = Ti.UI.createView({
        height: "100%",
        top: 0,
        left: "0%",
        width: "30%",
        id: "dayView"
    });
    $.__views.dateTitleSection.add($.__views.dayView);
    $.__views.date_dow = Ti.UI.createLabel({
        width: "10%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 10
        },
        top: "25%",
        left: "25%",
        id: "date_dow"
    });
    $.__views.dayView.add($.__views.date_dow);
    $.__views.date_day = Ti.UI.createLabel({
        width: "auto",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 28,
            fontWeight: "bold"
        },
        top: "20%",
        id: "date_day"
    });
    $.__views.dayView.add($.__views.date_day);
    $.__views.date_month = Ti.UI.createLabel({
        width: "auto",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 12,
            fontWeight: "bold"
        },
        top: "55%",
        id: "date_month"
    });
    $.__views.dayView.add($.__views.date_month);
    $.__views.title = Ti.UI.createLabel({
        width: "auto",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontWeight: "bold",
            fontSize: 20
        },
        left: "30%",
        top: "20%",
        id: "title"
    });
    $.__views.dateTitleSection.add($.__views.title);
    $.__views.buttonView = Ti.UI.createView({
        height: "10%",
        top: "20%",
        width: "100%",
        id: "buttonView"
    });
    $.__views.scrollView.add($.__views.buttonView);
    $.__views.shareView = Ti.UI.createView({
        height: "100%",
        top: 0,
        left: "50%",
        id: "shareView"
    });
    $.__views.buttonView.add($.__views.shareView);
    $.__views.shareButton = Ti.UI.createButton({
        id: "shareButton",
        title: "Share",
        top: "0",
        width: "auto",
        height: "25",
        backgroundColor: "#fff"
    });
    $.__views.shareView.add($.__views.shareButton);
    doClickShare ? $.__views.shareButton.addEventListener("click", doClickShare) : __defers["$.__views.shareButton!click!doClickShare"] = true;
    $.__views.calView = Ti.UI.createView({
        height: "100%",
        top: 0,
        right: "50%",
        id: "calView"
    });
    $.__views.buttonView.add($.__views.calView);
    $.__views.calButton = Ti.UI.createButton({
        id: "calButton",
        title: "Add to Calendar",
        top: "0",
        width: "auto",
        height: "25",
        backgroundColor: "#fff"
    });
    $.__views.calView.add($.__views.calButton);
    doClickCal ? $.__views.calButton.addEventListener("click", doClickCal) : __defers["$.__views.calButton!click!doClickCal"] = true;
    $.__views.timeSection = Ti.UI.createView({
        height: "20%",
        top: "30%",
        right: "5%",
        left: "5%",
        id: "timeSection"
    });
    $.__views.scrollView.add($.__views.timeSection);
    $.__views.startView = Ti.UI.createView({
        height: "50%",
        top: 0,
        width: "auto",
        borderColor: "black",
        id: "startView"
    });
    $.__views.timeSection.add($.__views.startView);
    $.__views.start = Ti.UI.createLabel({
        width: "auto",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontWeight: "bold"
        },
        top: 0,
        left: "5%",
        id: "start",
        text: "Start Time"
    });
    $.__views.startView.add($.__views.start);
    $.__views.time = Ti.UI.createLabel({
        width: "auto",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 14
        },
        top: "50%",
        left: "10%",
        id: "time"
    });
    $.__views.startView.add($.__views.time);
    $.__views.endView = Ti.UI.createView({
        top: "50%",
        height: "50%",
        borderColor: "black",
        id: "endView"
    });
    $.__views.timeSection.add($.__views.endView);
    $.__views.end = Ti.UI.createLabel({
        width: "auto",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontWeight: "bold"
        },
        top: 0,
        left: "5%",
        id: "end",
        text: "End Time"
    });
    $.__views.endView.add($.__views.end);
    $.__views.endTime = Ti.UI.createLabel({
        width: "auto",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 14
        },
        top: "50%",
        left: "10%",
        id: "endTime"
    });
    $.__views.endView.add($.__views.endTime);
    $.__views.phoneView = Ti.UI.createView({
        height: "10%",
        left: "5%",
        right: "5%",
        top: "50%",
        borderColor: "black",
        id: "phoneView"
    });
    $.__views.scrollView.add($.__views.phoneView);
    $.__views.phoneTitle = Ti.UI.createLabel({
        width: "auto",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontWeight: "bold"
        },
        top: 0,
        left: "5%",
        id: "phoneTitle",
        text: "Phone Number"
    });
    $.__views.phoneView.add($.__views.phoneTitle);
    $.__views.phone = Ti.UI.createLabel({
        width: "auto",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 14
        },
        top: "50%",
        left: "10%",
        id: "phone"
    });
    $.__views.phoneView.add($.__views.phone);
    $.__views.phoneButton = Ti.UI.createButton({
        id: "phoneButton",
        title: "Call",
        top: "5",
        width: "auto",
        height: "25",
        right: "5%",
        backgroundColor: "#fff"
    });
    $.__views.phoneView.add($.__views.phoneButton);
    doClickPhone ? $.__views.phoneButton.addEventListener("click", doClickPhone) : __defers["$.__views.phoneButton!click!doClickPhone"] = true;
    $.__views.addrView = Ti.UI.createView({
        height: "20%",
        left: "5%",
        right: "5%",
        top: "60%",
        borderColor: "black",
        id: "addrView"
    });
    $.__views.scrollView.add($.__views.addrView);
    $.__views.addrTitle = Ti.UI.createLabel({
        width: "auto",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontWeight: "bold"
        },
        top: 0,
        left: "5%",
        id: "addrTitle",
        text: "Address"
    });
    $.__views.addrView.add($.__views.addrTitle);
    $.__views.place = Ti.UI.createLabel({
        width: "auto",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 14
        },
        top: "25%",
        left: "10%",
        id: "place"
    });
    $.__views.addrView.add($.__views.place);
    $.__views.street = Ti.UI.createLabel({
        width: "auto",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 14
        },
        top: "50%",
        left: "10%",
        id: "street"
    });
    $.__views.addrView.add($.__views.street);
    $.__views.citZip = Ti.UI.createLabel({
        width: "auto",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 14
        },
        top: "75%",
        left: "10%",
        id: "citZip"
    });
    $.__views.addrView.add($.__views.citZip);
    $.__views.mapButton = Ti.UI.createButton({
        id: "mapButton",
        title: "Open Map",
        top: "5",
        width: "auto",
        height: "25",
        right: "5%",
        backgroundColor: "#fff"
    });
    $.__views.addrView.add($.__views.mapButton);
    doClickMap ? $.__views.mapButton.addEventListener("click", doClickMap) : __defers["$.__views.mapButton!click!doClickMap"] = true;
    $.__views.scroll = Ti.UI.createView({
        top: "80%",
        height: "30%",
        id: "scroll"
    });
    $.__views.scrollView.add($.__views.scroll);
    $.__views.works = Ti.UI.createLabel({
        width: "auto",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 14
        },
        id: "works",
        text: "SCROLLVIEW WORKS"
    });
    $.__views.scroll.add($.__views.works);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var strftime = require("strftime");
    require("moment");
    var args = arguments[0] || {};
    var events = args.events;
    $.parentController = args.parentTab;
    $.title.text = args.data.attributes.title;
    $.phone.text = args.data.attributes.phone;
    $.place.text = args.data.attributes.place;
    $.street.text = args.data.attributes.street;
    $.citZip.text = args.data.attributes.citZip;
    var events = Alloy.Collections.events;
    $.date_dow.text = strftime("%a", events.get("time")).toUpperCase();
    $.date_month.text = strftime("%b", events.get("time")).toUpperCase();
    $.date_day.text = strftime("%d", events.get("time"));
    $.time.text = strftime("%l:%M %p", events.get("time")) + " on " + strftime("%d/%b", events.get("end"));
    $.endTime.text = strftime("%l:%M %p", events.get("time")) + " on " + strftime("%d/%b", events.get("end"));
    var calendar = require("com.gs.calendar");
    __defers["$.__views.shareButton!click!doClickShare"] && $.__views.shareButton.addEventListener("click", doClickShare);
    __defers["$.__views.calButton!click!doClickCal"] && $.__views.calButton.addEventListener("click", doClickCal);
    __defers["$.__views.phoneButton!click!doClickPhone"] && $.__views.phoneButton.addEventListener("click", doClickPhone);
    __defers["$.__views.mapButton!click!doClickMap"] && $.__views.mapButton.addEventListener("click", doClickMap);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;