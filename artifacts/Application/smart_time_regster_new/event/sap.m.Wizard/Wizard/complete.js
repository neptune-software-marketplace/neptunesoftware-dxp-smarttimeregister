if (DateTimePickerStartTime.getValue() == "" || DateTimePickerEndTime.getValue() == "") {
    sap.m.MessageToast.show("Choose a valid start and end date");
    return;
}

var empty = [];
myWorkingHours = [];

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

var today = new Date();
var day = today.getDate();
var month = today.getMonth() + 1;
var year = today.getFullYear();
var hour = today.getHours();
var minute = today.getMinutes();
var second = today.getSeconds();
var start_Time;
var end_Time;
var starttimecal;
var endtimecal;
if (sap.ushell && sap.ushell.Container) {
  var username = AppCache.userInfo.email;
}else{
var username = "";
}
if (username == null) {
    username = "admin";
}
var data;
if(comeBack == false){
data = modelModelArrayMeetings.getData();
}
if(comeBack == true){
data = modeloSinglePlanningCalendar.getData();
}



var currentDate = new Date();
currentDate.setHours(0, 0, 0, 0);
var addBreakfast = true;
data.forEach(function (isthere) {
    var eventDate = new Date(isthere.start);
    eventDate.setHours(0, 0, 0, 0);
    if (isthere.title === "Breakfast break" && eventDate.getTime() === currentDate.getTime()) {
        addBreakfast = false;
    }
});
var addLunch = true;
data.forEach(function (isthere) {
    var eventDate = new Date(isthere.start);
    eventDate.setHours(0, 0, 0, 0);
    if (isthere.title === "Lunch break" && eventDate.getTime() === currentDate.getTime()) {
        addLunch = false;
    }
});


if (DateTimePickerStartTime.getDateValue() != "" && DateTimePickerEndTime.getDateValue() != "") {
    start_Time = DateTimePickerStartTime.getDateValue();
    end_Time = DateTimePickerEndTime.getDateValue();

    start_Time = moment(start_Time, ["h:mm A"]).format("HH:mm");
    end_Time = moment(end_Time, ["h:mm A"]).format("HH:mm");

    hour = getStringAfterSemicolon(start_Time, 0);
    minute = getStringAfterSemicolon(start_Time, 1);
    second = getStringAfterSemicolon(start_Time, 2);

    starttimecal = getFirstTwoChars(start_Time);
    endtimecal = getFirstTwoChars(end_Time);
    hourDiff = endtimecal - starttimecal;
    oSinglePlanningCalendar.setStartHour(parseInt(starttimecal));
    oSinglePlanningCalendar.setEndHour(parseInt(endtimecal));
}


var myWorkingHoursplus = modelModelArrayMeetings.getData();
if (myWorkingHoursplus.length > 0) {
    const convertedEvents = myWorkingHoursplus.map((event) => ({
        start: new Date(event.start),
        end: new Date(event.end),
        title: event.title,
        info: event.info,
        type: event.type,
        Uniqe_id : event.Uniqe_id
    }));
    myWorkingHoursplus = [];
    myWorkingHoursplus = convertedEvents;
}

for (let i = 0; i < myWorkingHours.length; i++) {
    myWorkingHoursplus.push(myWorkingHours[i]);
}


modelModelArrayMeetings.setData(myWorkingHoursplus);
modeloSinglePlanningCalendar.setData(modelModelArrayMeetings.getData());
modeloSinglePlanningCalendar.refresh();
oSinglePlanningCalendar.setSelectedView(oSinglePlanningCalendarDayView);
oSinglePlanningCalendar.setVisible(true);
sap.ui.core.BusyIndicator.hide();
oButtonSignIn.setVisible(false);
Page1.setVisible(false);
Page.setVisible(true);
addActivity();
processActivities();

