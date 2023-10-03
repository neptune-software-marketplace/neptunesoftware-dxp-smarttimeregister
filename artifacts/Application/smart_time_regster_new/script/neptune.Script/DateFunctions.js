var today = new Date();
var day = today.getDate();
var month = today.getMonth() + 1;
var year = today.getFullYear();
var hour = today.getHours();
var minute = today.getMinutes();
var second = today.getSeconds();
var endhour;
var endminute;
var start_Time;
var end_Time;
if (sap.ushell && sap.ushell.Container) {
    var username = AppCache.userInfo.email;
} else {
    var username = "kaan.koska@neptune-software.com";
}
if (username == null) {
    username = "admin";
}
function getFirstTwoChars(str) {
    return str.substring(0, 2);
}
function getStringAfterSemicolon(str, index) {
    var parts = str.split(":");
    if (index >= 0 && index < parts.length) {
        return parts[index];
    }
    return "";
}

function addActivity() {
    start_Time = DateTimePicker1.getDateValue();
    end_Time = DateTimePicker.getDateValue();
}
function removeDuplicates(arr) {
    let uniqueArray = [];
    let seen = new Set();

    for (let i = 0; i < arr.length; i++) {
        let currentItem = arr[i];
        let itemKey = `${currentItem.start}_${currentItem.end}_${currentItem.info}_${currentItem.title}`;

        if (currentItem.title === "Breakfast" || currentItem.title === "Lunch") {
            continue;
        }

        if (!seen.has(itemKey)) {
            seen.add(itemKey);
            uniqueArray.push(currentItem);
        }
    }

    return uniqueArray;
}
function processActivities() {
    var activities = modelModelArrayMeetings.getData();
    if (cahceCheck == true) {
        var cacheData = modelModelArraymeetingsCache.getData();
        for (let i = 0; i < cacheData.length; i++) {
            activities.push(cacheData[i]);
        }
    }
    removeDuplicates(activities);
    if (activities.length > 0) {
        var convertedEvents = activities.map((event) => ({
            start: new Date(event.start),
            end: new Date(event.end),
            title: event.title,
            info: event.info,
            type: event.type,
            id: event.id,
            User_Name: username,
            Uniqe_id: event.Uniqe_id,
        }));
        activities = [];
        activities = convertedEvents;
        activities1 = convertedEvents;
    }

    for (var i = 0; i < activities.length; i++) {
        var activity = activities[i];
        if (activity.title == "Working hour") {
            activities.splice(i, 1);
            i--;
        }
    }

    var workingActivities = activities.filter(function (activity) {
        return activity.title !== "Working hour";
    });

    workingActivities.sort(function (a, b) {
        return a.start - b.start;
    });

    var filledActivities = [];
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 3);

    var endOfWeek = new Date(currentDate);
    endOfWeek.setDate(endOfWeek.getDate() + 10);

    // if (endOfWeek.getMonth() !== currentDate.getMonth()) {
    //     endOfWeek.setDate(endOfWeek.getDate() - currentDate.getDate());
//     // }
// console.log("start date of the week",currentDate);
// console.log("end date of the week",endOfWeek);


    while (currentDate <= endOfWeek) {
        var currentDayActivities = workingActivities.filter(function (activity) {
            var activityDate = new Date(activity.start);
            return (
                activityDate.getFullYear() === currentDate.getFullYear() &&
                activityDate.getMonth() === currentDate.getMonth() &&
                activityDate.getDate() === currentDate.getDate()
            );
        });

        var startDateFromChoice = new Date(DateTimePickerStartTime.getValue());
        var startHourDay = startDateFromChoice.getHours();
        var startHourDayMins = startDateFromChoice.getMinutes();

        var workingHourStart = new Date(currentDate);
        workingHourStart.setHours(startHourDay);
        workingHourStart.setMinutes(startHourDayMins);
        workingHourStart.setSeconds(0);
        // console.log("workingHourStart", workingHourStart);

        var endDateFromChoice = new Date(DateTimePickerEndTime.getValue());
        var endHourDay = endDateFromChoice.getHours();
        var endHourDayMins = endDateFromChoice.getMinutes();

        var workingHourEnd = new Date(currentDate);
        workingHourEnd.setHours(endHourDay);
        workingHourEnd.setMinutes(endHourDayMins);
        workingHourEnd.setSeconds(0);
        // console.log("workingHourEnd", workingHourEnd);
        if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
            var id = generateUUID();
            
            filledActivities.push({
                start: workingHourStart,
                end: workingHourEnd,
                title: "Holiday",
                info: "Non-Working Day",
                type: "Type03",
                Uniqe_id: id,
                User_Name: username,
            });
        } else if (currentDayActivities.length === 0) {
            var id1 = generateUUID();
            
            filledActivities.push({
                start: workingHourStart,
                end: workingHourEnd,
                title: "Working hour",
                info: "Pre-filled working hour",
                type: "Type14",
                Uniqe_id: id1,
            });
        } else {
            currentDayActivities.sort(function (a, b) {
                return a.start - b.start;
            });
            if (workingHourStart < currentDayActivities[0].start) {
                var id2 = generateUUID();
              
                filledActivities.push({
                    start: workingHourStart,
                    end: new Date(currentDayActivities[0].start),
                    title: "Working hour",
                    info: "Pre-filled working hour",
                    type: "Type14",
                    Uniqe_id: id2,
                });
            }

            for (var i = 0; i < currentDayActivities.length; i++) {
                var activity = currentDayActivities[i];
                filledActivities.push(activity);
                if (i < currentDayActivities.length - 1) {
                    var nextActivity = currentDayActivities[i + 1];
                    var id3 = generateUUID();
                    
                    if (activity.end < nextActivity.start) {
                        filledActivities.push({
                            start: new Date(activity.end),
                            end: new Date(nextActivity.start),
                            title: "Working hour",
                            info: "Pre-filled working hour",
                            type: "Type14",
                            Uniqe_id: id3,
                        });
                    }
                }
            }

            if (currentDayActivities[currentDayActivities.length - 1].end < workingHourEnd) {
                var id4 = generateUUID();
               
                filledActivities.push({
                    start: new Date(currentDayActivities[currentDayActivities.length - 1].end),
                    end: workingHourEnd,
                    title: "Working hour",
                    info: "Pre-filled working hour",
                    type: "Type14",
                    Uniqe_id: id4,
                });
               
            }
        }

        currentDate.setDate(currentDate.getDate() + 1);
    }

    var activitiesToRemove = [];
    for (var i = 0; i < filledActivities.length; i++) {
        var activity = filledActivities[i];
        var start = new Date(activity.start);
        start.setMilliseconds(0);
        var end = new Date(activity.end);
        end.setMilliseconds(0);

        if (activity.title === "Working hour" && start.getTime() === end.getTime()) {
            activitiesToRemove.push(activity);
        }
    }

    for (var i = 0; i < activitiesToRemove.length; i++) {
        var activityToRemove = activitiesToRemove[i];
        var index = filledActivities.indexOf(activityToRemove);
        if (index !== -1) {
            filledActivities.splice(index, 1);
        }
    }
  
    modelModelArray.setData(filledActivities);
    modeloSinglePlanningCalendar.setData(modelModelArray.getData());
    modeloSinglePlanningCalendar.refresh();
}

function addActivity1() {
    endhour = "";
    endminute = "";
    start_Time = "";
    end_Time = "";

    var activities = modelModelArrayMeetings.getData();

    start_Time = DateTimePicker1.getDateValue();
    end_Time = DateTimePicker.getDateValue();

    if (DateTimePicker.getValue() != "" && DateTimePicker1.getValue() != "") {
        start_Time = moment(start_Time, ["h:mm A"]).format("HH:mm");
        end_Time = moment(end_Time, ["h:mm A"]).format("HH:mm");
        var hour = getStringAfterSemicolon(start_Time, 0);
        var minute = getStringAfterSemicolon(start_Time, 1);
        var second = 0;
        var endhour = getStringAfterSemicolon(end_Time, 0);
        var endminute = getStringAfterSemicolon(end_Time, 1);
        endhour = endhour + ":";
    }

    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();
    var date = year + "-" + month + "-" + day;
    var start = hour + ":" + minute + ":" + second;
    var end = endhour + endminute + ":" + second;
    var activityTitle = InputTitle.getValue();
    var activityDetails = TextAreaDetails.getValue();

    var activity = {
        start: new Date(DateTimePicker1.getValue()),
        end: new Date(DateTimePicker.getValue()),
        title: activityTitle,
        info: activityDetails,
        type: "Type08",
        Uniqe_id: "something wrong",
    };
    activities.push(activity);
}
