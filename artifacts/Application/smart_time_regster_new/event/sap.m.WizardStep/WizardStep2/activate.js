var today = new Date();
var day = today.getDate();
var month = today.toLocaleString("default", { month: "short" });
var year = today.getFullYear();
var hour = 9;
var minute = 0;
var second = 0;

// Add leading zeros to day, hour, minute, and second if necessary
var formattedDay = day < 10 ? "0" + day : day;
var formattedHour = hour < 10 ? "0" + hour : hour;
var formattedMinute = minute < 10 ? "0" + minute : minute;
var formattedSecond = second < 10 ? "0" + second : second;

var morning =
    formattedDay +
    " " +
    month +
    " " +
    year +
    " " +
    formattedHour +
    ":" +
    formattedMinute +
    ":" +
    formattedSecond;
hour = 17;
var formattedHourEnd = hour < 10 ? "0" + hour : hour;
var morning_2 =
    formattedDay +
    " " +
    month +
    " " +
    year +
    " " +
    formattedHourEnd +
    ":" +
    formattedMinute +
    ":" +
    formattedSecond;

var StartDateObject = new Date(morning);
var EndDateObject = new Date(morning_2);
DateTimePickerStartTime.setDateValue(StartDateObject);
DateTimePickerEndTime.setDateValue(EndDateObject);
var morningBreakfastEnd = new Date(year, today.getMonth(), day, 10, 0, 0);
var morningLunchTime = new Date(year, today.getMonth(), day, 13, 0, 0);
var morningLunchTimeEnd = new Date(year, today.getMonth(), day, 14, 0, 0);
oButtonSignIn.setVisible(false);

