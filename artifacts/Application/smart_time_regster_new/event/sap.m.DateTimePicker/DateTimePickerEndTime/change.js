var date1 = DateTimePickerStartTime.getDateValue();
var date2 = DateTimePickerEndTime.getDateValue();
var time1 = DateTimePickerStartTime.getValue();
var time2 = DateTimePickerEndTime.getValue();

if (date2 < date1 || (date2.getTime() === date1.getTime() && time2 < time1)) {
    sap.m.MessageToast.show("Working hour end time cannot be earlier than start time.");
    DateTimePickerEndTime.setDateValue(DateTimePickerStartTime.getDateValue());
}

var year1 = date2.getFullYear();
var month1 = date2.getMonth() + 1;
var day1 = date2.getDate();

var currentDate = new Date();
var year2 = currentDate.getFullYear();
var month2 = currentDate.getMonth() + 1;
var day2 = currentDate.getDate();

if (year2 < year1 || (year2 === year1 && month2 < month1) || (year2 === year1 && month2 === month1 && day2 < day1)) {
    sap.m.MessageToast.show("Choose your daily schedule");
    DateTimePickerEndTime.setDateValue(DateTimePickerStartTime.getDateValue());
}
