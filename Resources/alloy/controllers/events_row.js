function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    var $model = arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    Alloy.Collections.instance("events");
    $.__views.events_row = Ti.UI.createTableViewRow({
        backgroundColor: "white",
        hasChild: "true",
        id: "events_row"
    });
    $.__views.events_row && $.addTopLevelView($.__views.events_row);
    $.__views.event_row = Ti.UI.createView({
        height: 70,
        id: "event_row"
    });
    $.__views.events_row.add($.__views.event_row);
    $.__views.event_date = Ti.UI.createView({
        layout: "vertical",
        top: 6,
        left: 0,
        width: 70,
        id: "event_date"
    });
    $.__views.event_row.add($.__views.event_date);
    $.__views.date_dow = Ti.UI.createLabel({
        width: "auto",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: 10
        },
        top: 1,
        id: "date_dow",
        text: "undefined" != typeof $model.__transform["date_dow"] ? $model.__transform["date_dow"] : $model.get("date_dow")
    });
    $.__views.event_date.add($.__views.date_dow);
    $.__views.date_day = Ti.UI.createLabel({
        width: "auto",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: 28,
            fontWeight: "bold"
        },
        top: -4,
        id: "date_day",
        text: "undefined" != typeof $model.__transform["date_day"] ? $model.__transform["date_day"] : $model.get("date_day")
    });
    $.__views.event_date.add($.__views.date_day);
    $.__views.event_description = Ti.UI.createView({
        top: 0,
        left: 70,
        right: 10,
        id: "event_description"
    });
    $.__views.event_row.add($.__views.event_description);
    $.__views.title = Ti.UI.createLabel({
        width: "auto",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 15,
            fontWeight: "bold"
        },
        top: 10,
        left: 10,
        height: 30,
        minimumFontSize: 15,
        id: "title",
        text: "undefined" != typeof $model.__transform["title"] ? $model.__transform["title"] : $model.get("title")
    });
    $.__views.event_description.add($.__views.title);
    $.__views.time = Ti.UI.createLabel({
        width: "auto",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: 14
        },
        top: 35,
        left: 20,
        id: "time",
        text: "undefined" != typeof $model.__transform["time"] ? $model.__transform["time"] : $model.get("time")
    });
    $.__views.event_description.add($.__views.time);
    $.__views.location = Ti.UI.createLabel({
        width: "auto",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: 14
        },
        top: 50,
        left: 20,
        id: "location",
        text: "undefined" != typeof $model.__transform["location"] ? $model.__transform["location"] : $model.get("location")
    });
    $.__views.event_description.add($.__views.location);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;