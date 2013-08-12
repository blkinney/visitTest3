function Controller() {
    function updateUi() {
        var models = __alloyId7.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId5 = models[i];
            __alloyId5.__transform = transformData(__alloyId5);
            var __alloyId6 = Alloy.createController("events_row", {
                $model: __alloyId5
            });
            rows.push(__alloyId6.getViewEx({
                recurse: true
            }));
        }
        $.__views.table.setData(rows);
    }
    function transformData(model) {
        var attrs = model.toJSON();
        attrs.date_day = strftime("%d", events.get("time"));
        attrs.date_dow = strftime("%a", events.get("time")).toUpperCase();
        attrs.time = "from " + strftime("%l:%M %p", events.get("time")) + " to" + strftime("%l:%M %p", events.get("end"));
        attrs.row_color = "#fff";
        return attrs;
    }
    function doClickNext() {
        Titanium.API.info("You clicked the next week button");
        currentDay.add("days", 7);
        currentDayNext.add("days", 7);
        $.weekNow.text = currentDay.format("MM/DD/YYYY") + " - " + currentDayNext.format("MM/DD/YYYY");
        events.thisWeek(currentDay, currentDayNext);
    }
    function doClickPrev() {
        Titanium.API.info("You clicked the previous week button");
        $.weekNow.text = "Last Week";
        currentDay.subtract("days", 7);
        currentDayNext.subtract("days", 7);
        $.weekNow.text = currentDay.format("MM/DD/YYYY") + " - " + currentDayNext.format("MM/DD/YYYY");
        events.thisWeek(currentDay, currentDayNext);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    Alloy.Collections.instance("events");
    $.__views.eventsWindow = Ti.UI.createWindow({
        id: "eventsWindow",
        title: "Events"
    });
    $.__views.weekView = Ti.UI.createView({
        height: "15%",
        top: 0,
        backgroundColor: "white",
        borderColor: "gray",
        id: "weekView"
    });
    $.__views.eventsWindow.add($.__views.weekView);
    $.__views.prevWeekButton = Ti.UI.createButton({
        id: "prevWeekButton",
        title: " < ",
        top: "25%",
        width: "auto",
        height: "50%",
        left: "5%",
        backgroundColor: "#fff"
    });
    $.__views.weekView.add($.__views.prevWeekButton);
    doClickPrev ? $.__views.prevWeekButton.addEventListener("click", doClickPrev) : __defers["$.__views.prevWeekButton!click!doClickPrev"] = true;
    $.__views.weekNow = Ti.UI.createLabel({
        font: {
            fontWeight: "bold",
            fontSize: 14
        },
        id: "weekNow"
    });
    $.__views.weekView.add($.__views.weekNow);
    $.__views.nextWeekButton = Ti.UI.createButton({
        id: "nextWeekButton",
        title: " > ",
        top: "25%",
        width: "auto",
        height: "50%",
        right: "5%",
        backgroundColor: "#fff"
    });
    $.__views.weekView.add($.__views.nextWeekButton);
    doClickNext ? $.__views.nextWeekButton.addEventListener("click", doClickNext) : __defers["$.__views.nextWeekButton!click!doClickNext"] = true;
    $.__views.table = Ti.UI.createTableView({
        top: "15%",
        id: "table"
    });
    $.__views.eventsWindow.add($.__views.table);
    var __alloyId7 = Alloy.Collections["events"] || events;
    __alloyId7.on("fetch destroy change add remove reset", updateUi);
    $.__views.eventsTab = Ti.UI.createTab({
        window: $.__views.eventsWindow,
        id: "eventsTab",
        title: "Events",
        hasChild: "true"
    });
    $.__views.eventsTab && $.addTopLevelView($.__views.eventsTab);
    exports.destroy = function() {
        __alloyId7.off("fetch destroy change add remove reset", updateUi);
    };
    _.extend($, $.__views);
    var strftime = require("strftime");
    var moment = require("moment");
    var events = Alloy.Collections.events;
    var currentDay = moment().startOf("week");
    var currentDayNext = moment().endOf("week");
    events.thisWeek(currentDay, currentDayNext);
    $.weekNow.text = currentDay.format("MM/DD/YYYY") + " - " + currentDayNext.format("MM/DD/YYYY");
    $.table.addEventListener("click", function(_e) {
        var detailController = Alloy.createController("event_detail", {
            parentTab: $.eventsTab,
            data: events.at(_e.index)
        });
        $.eventsTab.open(detailController.getView());
    });
    __defers["$.__views.prevWeekButton!click!doClickPrev"] && $.__views.prevWeekButton.addEventListener("click", doClickPrev);
    __defers["$.__views.nextWeekButton!click!doClickNext"] && $.__views.nextWeekButton.addEventListener("click", doClickNext);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;