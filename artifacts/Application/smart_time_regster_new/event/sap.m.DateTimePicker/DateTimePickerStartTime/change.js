var selectedDate = DateTimePickerStartTime.getDateValue();
var today = new Date();
today.setHours(0, 0, 0, 0);

if (selectedDate < today) {
    sap.m.MessageToast.show("Select a valid date.");
    DateTimePickerStartTime.setDateValue(today);
}