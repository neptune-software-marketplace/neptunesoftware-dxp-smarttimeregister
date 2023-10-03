var clickedAppointment = oEvent.getParameter("appointment");
if (clickedAppointment !== undefined) {
    var clickedDate = clickedAppointment.getStartDate();
    var currentDate = new Date();
    var startDate = new Date(currentDate);
    var selectedAppo = oEvent.getParameter("appointment");
    if (selectedAppo) {
        var appoObj = selectedAppo.getBindingContext().getObject();
        TitleID.setText(appoObj.Uniqe_id);
        TitleID1.setText(appoObj.Uniqe_id);
        if (appoObj.title == "Working hour") {
            DateTimePicker1.setDateValue(appoObj.start);
            DateTimePicker.setDateValue(appoObj.end);
            InputTitle.setValue(appoObj.title);
            TextAreaDetails.setValue(appoObj.detail);
            DateTimePicker1.setEnabled(true);
            DateTimePicker.setEnabled(true);
            ButtonNewActiviyUpdate.setVisible(false);
            ButtonNewActiviySave.setVisible(true);
            oDialog.open();
        }
        if (appoObj.title != "Working hour") {
            ButtonNewActiviyUpdate.setVisible(true);
            ButtonNewActiviySave.setVisible(false);
            oButtonEdit.setVisible(true);
            oButtonDelete.setVisible(true);
            
            if (TitleID1.getText() === "office") {
                oButtonEdit.setVisible(false);
                oButtonDelete.setVisible(false);
            }
            DateTimePicker1.setDateValue(appoObj.start);
            DateTimePicker.setDateValue(appoObj.end);
            InputTitle.setValue(appoObj.title);
            TextAreaDetails.setValue(appoObj.info);
            TextTitle.setText(appoObj.title);
            var start = appoObj.start;
            var day = start.getDate();
            var month = start.getMonth() + 1;
            var year = start.getFullYear();
            var hours = start.getHours().toString().padStart(2, "0");
            var minutes = start.getMinutes().toString().padStart(2, "0");
            var formattedStartDate = day + "/" + month + "/" + year + " " + hours + ":" + minutes;
            TextStartDate.setText(formattedStartDate);
            var end = appoObj.end;
            var day = end.getDate();
            var month = end.getMonth() + 1;
            var year = end.getFullYear();
            var hours = end.getHours().toString().padStart(2, "0");
            var minutes = end.getMinutes().toString().padStart(2, "0");
            var formattedEndDate = day + "/" + month + "/" + year + " " + hours + ":" + minutes;
            TextEndDate.setText(formattedEndDate);
            TextInfo.setText(appoObj.info);
            ResponsivePopover.open();
        }
    }
}
