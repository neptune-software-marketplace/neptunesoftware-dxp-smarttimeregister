function findEmptyWorkingHours(activities) {
    var emptyActivities = [];
    var currentDate = new Date();
    var startDate = new Date(currentDate);
    startDate.setDate(startDate.getDate() - 3); // Set the start date as 3 days ago from today

    while (startDate <= currentDate) {
        var hasWorkingHour = false;
        var emptyHour = null;

        for (var i = 0; i < activities.length; i++) {
            var activity = activities[i];
            var activityDate = new Date(activity.start);
            if (
                activityDate.getDate() === startDate.getDate() &&
                activityDate.getMonth() === startDate.getMonth() &&
                activityDate.getFullYear() === startDate.getFullYear() &&
                activity.title === "Working hour"
            ) {
                hasWorkingHour = true;
                emptyHour = {
                    start: new Date(activity.start),
                    end: new Date(activity.end),
                    title: activity.title,
                    info: activity.info,
                    type: activity.type,
                };
                emptyActivities.push(emptyHour);
                // break;
            }
        }

        // if (emptyHour != null) {
        //     emptyActivities.push(emptyHour); 
        // }
        startDate.setDate(startDate.getDate() + 1);
    }

    return emptyActivities;
}



var activities = modeloSinglePlanningCalendar.getData();
var emptyWorkingHours = findEmptyWorkingHours(activities);


if (emptyWorkingHours.length > 0) {
    jQuery.sap.require("sap.m.MessageBox");
    sap.m.MessageBox.show(
        "You have empty working hours in the last 3 days. Do you want to update them?",
        {
            icon: sap.m.MessageBox.Icon.INFORMATION,
            title: "Warning",
            actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
            onClose: function (oAction) {
                if (oAction == "YES") {
                    modelListEmptyActivities.setData(emptyWorkingHours);
                    DialogUpdateActivities.open();
                }
                if (oAction == "NO") {
                    sap.m.MessageToast.show("Saved");
                }
            },
        }
    );
} else {
    sap.m.MessageToast.show("Saved");
    
}
