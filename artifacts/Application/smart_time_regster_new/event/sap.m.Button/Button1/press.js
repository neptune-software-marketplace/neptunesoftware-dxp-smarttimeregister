// modeloSinglePlanningCalendar.refresh();
// oSinglePlanningCalendar.setVisible(true);
// sap.ui.core.BusyIndicator.hide();
// oButtonSignIn.setVisible(false);
// // oApp.to(Page);
// Page1.setVisible(false);
// Page.setVisible(true);
// addActivity()
// processActivities()






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
var data = modelModelArrayMeetings.getData();
var addBreakfast = true;


data.forEach(function (isthere) {
    if (isthere.title === "Breakfast break") {
        addBreakfast = false;
    }
});
var addLunch = true;
data.forEach(function (isthere) {
    if (isthere.title === "Lunch break") {
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
    // endtimecal++;
    // starttimecal--;
    oSinglePlanningCalendar.setStartHour(parseInt(starttimecal));
    oSinglePlanningCalendar.setEndHour(parseInt(endtimecal));
}

// if (
    // TimePickerBreakfast.getValue() != "" &&
    // TimePickerBreakfastEnd1.getValue() != "" &&
    // RadioButtonYes.getSelected() == true
// ) {
    // var start_Time = TimePickerBreakfast.getDateValue();
    // var end_Time = TimePickerBreakfastEnd1.getDateValue();

    // // Format start_Time and end_Time using moment.js
    // var formattedStartTime = moment(start_Time).format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)");
    // var formattedEndTime = moment(end_Time).format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)");

    // var StartDateObject = new Date(formattedStartTime);
    // var EndDateObject = new Date(formattedEndTime);

    // myWorkingHours.push({
    //     start: StartDateObject,
    //     end: EndDateObject,
    //     info: "Breakfast",
    //     title: "Breakfast break",
    //     type: "Type08",
    // });
// if(addBreakfast == true){
//  var options = {
//         data: {
//             User_Name: username,
//             info: "Breakfast",
//             title: "Breakfast break",
//             type: "Type08",
//             start: StartDateObject,
//             end: EndDateObject,
//         },
//     };
//     apiRestAPITimesPost(options);
// }
// }
   

// if (
//     TimePickerLunchTime.getValue() != "" &&
//     TimePickerLunchTimeEnd.getValue() != "" &&
//     RadioButtonYes1.getSelected() == true
// ) {
//     var start_Time = TimePickerLunchTime.getDateValue();
//     var end_Time = TimePickerLunchTimeEnd.getDateValue();

//     // Format start_Time and end_Time using moment.js
//     var formattedStartTime = moment(start_Time).format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)");
//     var formattedEndTime = moment(end_Time).format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)");

//     var StartDateObject = new Date(formattedStartTime);
//     var EndDateObject = new Date(formattedEndTime);

//     // myWorkingHours.push({
//     //     start: StartDateObject,
//     //     end: EndDateObject,
//     //     info: "Lunch",
//     //     title: "Lunch break",
//     //     type: "Type08",
//     // });
//     if (addLunch == true) {
//         var options = {
//             data: {
//                 User_Name: username,
//                 info: "Lunch",
//                 title: "Lunch break",
//                 type: "Type08",
//                 start: StartDateObject,
//                 end: EndDateObject,
//             },
//         };
//         apiRestAPITimesPost(options);
//     }
// }

var myWorkingHoursplus = modelModelArrayMeetings.getData();
if (myWorkingHoursplus.length > 0) {
    const convertedEvents = myWorkingHoursplus.map((event) => ({
        start: new Date(event.start),
        end: new Date(event.end),
        title: event.title,
        info: event.info,
        type: event.type,
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
// oApp.to(Page);
Page1.setVisible(false);
Page.setVisible(true);
addActivity();
processActivities();




// if (DateTimePickerStartTime.getValue() == "" || DateTimePickerEndTime.getValue() == "") {
//     sap.m.MessageToast.show("Choose a valid start and end date");
//     return;
// }

// var empty = [];
// myWorkingHours = [];

// function getFirstTwoChars(str) {
//     return str.substring(0, 2);
// }
// function getStringAfterSemicolon(str, index) {
//     var parts = str.split(":");
//     if (index >= 0 && index < parts.length) {
//         return parts[index];
//     }
//     return "";
// }

// var today = new Date();
// var day = today.getDate();
// var month = today.getMonth() + 1;
// var year = today.getFullYear();
// var hour = today.getHours();
// var minute = today.getMinutes();
// var second = today.getSeconds();
// var start_Time;
// var end_Time;
// var starttimecal;
// var endtimecal;

// if (DateTimePickerStartTime.getDateValue() != "" && DateTimePickerEndTime.getDateValue() != "") {
//     start_Time = DateTimePickerStartTime.getDateValue();
//     end_Time = DateTimePickerEndTime.getDateValue();

//     start_Time = moment(start_Time, ["h:mm A"]).format("HH:mm");
//     end_Time = moment(end_Time, ["h:mm A"]).format("HH:mm");

//     hour = getStringAfterSemicolon(start_Time, 0);
//     minute = getStringAfterSemicolon(start_Time, 1);
//     second = getStringAfterSemicolon(start_Time, 2);

//     starttimecal = getFirstTwoChars(start_Time);
//     endtimecal = getFirstTwoChars(end_Time);
//     hourDiff = endtimecal - starttimecal;
//     // endtimecal++;
//     // starttimecal--;
//     oSinglePlanningCalendar.setStartHour(parseInt(starttimecal));
//     oSinglePlanningCalendar.setEndHour(parseInt(endtimecal));
// }


// if (
//   TimePickerBreakfast.getValue() != "" &&
//   TimePickerBreakfastEnd1.getValue() != "" &&
//   RadioButtonYes.getSelected() == true
// ) {
//   var start_Time = TimePickerBreakfast.getDateValue();
//   var end_Time = TimePickerBreakfastEnd1.getDateValue();

//   // Format start_Time and end_Time using moment.js
//   var formattedStartTime = moment(start_Time).format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)");
//   var formattedEndTime = moment(end_Time).format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)");

//   var StartDateObject = new Date(formattedStartTime);
//   var EndDateObject = new Date(formattedEndTime);

//   myWorkingHours.push({
//     start: StartDateObject,
//     end: EndDateObject,
//     info: "Breakfast",
//     title: "Breakfast break",
//     type: "Type08"
//   });
// }


// if (
//   TimePickerLunchTime.getValue() != "" &&
//   TimePickerLunchTimeEnd.getValue() != "" &&
//   RadioButtonYes1.getSelected() == true
// ) {
//   var start_Time = TimePickerLunchTime.getDateValue();
//   var end_Time = TimePickerLunchTimeEnd.getDateValue();

//   // Format start_Time and end_Time using moment.js
//   var formattedStartTime = moment(start_Time).format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)");
//   var formattedEndTime = moment(end_Time).format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)");

//   var StartDateObject = new Date(formattedStartTime);
//   var EndDateObject = new Date(formattedEndTime);

//   myWorkingHours.push({
//     start: StartDateObject,
//     end: EndDateObject,
//     info: "Lunch",
//     title: "Lunch break",
//     type: "Type08"
//   });
// }



// var myWorkingHoursplus = modelModelArrayMeetings.getData();
// for (let i = 0; i < myWorkingHours.length; i++) {
//     myWorkingHoursplus.push(myWorkingHours[i]);
// }
// modelModelArrayMeetings.setData(myWorkingHoursplus);
// modeloSinglePlanningCalendar.setData(modelModelArrayMeetings.getData());
// modeloSinglePlanningCalendar.refresh();
// oSinglePlanningCalendar.setSelectedView(oSinglePlanningCalendarDayView);
// oSinglePlanningCalendar.setVisible(true);
// sap.ui.core.BusyIndicator.hide();
// oButtonSignIn.setVisible(false);
// oApp.to(Page);
// addActivity();
// processActivities();
