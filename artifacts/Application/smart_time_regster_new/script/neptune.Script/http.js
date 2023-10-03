function readCalendar(myDate) {
    var myWorkingHours = [];
    sap.ui.core.BusyIndicator.show(0);
    var userDetails = getUserDetails();
    // oSinglePlanningCalendar.setTitle(`Calendar: ${userDetails.name} (${userDetails.username})`);
    var today;
    if (myDate) {
        today = myDate;
    } else {
        today = new Date();
    }
    const startOfWeek = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - today.getDay()
    );
    const endOfWeek = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - today.getDay() + 6
    );
    const startOfRange = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    const endOfRange = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10);

    const endpoint = `https://graph.microsoft.com/v1.0/me/calendarView?$select=attendees,isAllDay,start,end,subject,organizer,body,showAs&startDateTime=${startOfRange.toISOString()}&endDateTime=${endOfRange.toISOString()}&$top=100`;
    const headers = { Authorization: `${token}` };

    $.ajax({
        url: endpoint,
        type: "GET",
        dataType: "json",
        headers,
        success: (data) => {
            var appoArray = data.value;
            var arrCal = [];
            appoArray.forEach((appo, i) => {
                arrCal.push({
                    id: appo.id,
                    start: appo.isAllDay
                        ? new Date(appo.start.dateTime)
                        : new Date(appo.start.dateTime + "Z"),
                    end: appo.isAllDay
                        ? new Date(appo.end.dateTime)
                        : new Date(appo.end.dateTime + "Z"),
                    title: appo.subject,
                    info: appo.organizer.emailAddress.name,
                    type: appo.isAllDay ? "Type02" : "Type07",
                    allday: appo.isAllDay,
                    html: appo.body.content,
                    tentative: appo.showAs === "tentative",
                    attendees: getAttendees(appo.attendees),
                    Uniqe_id: "office",
                });
            });

            var meetings = modelModelArrayMeetings.getData();
            myWorkingHours = arrCal;
            const multiArray = meetings.concat(myWorkingHours);
            modelModelArraymeetingsCache.setData(arrCal);
            modelModelArrayMeetings.setData(multiArray);
            modeloSinglePlanningCalendar.refresh();
            oSinglePlanningCalendar.setSelectedView(oSinglePlanningCalendarDayView);
            oSinglePlanningCalendar.setVisible(true);

            setTimeout(function () {
                sap.ui.core.BusyIndicator.hide();
            }, 2000);

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
        },
        error: (error) => {
            console.log(error);
            sap.m.MessageToast.show(`Error: ${error.responseJSON.error.message} !`);
            sap.ui.core.BusyIndicator.hide();
        },
    });
}

function getAttendees(attendees) {
    var retStr = "";
    if (attendees.length === 0) {
        retStr = "None";
    } else {
        attendees.forEach((attendee) => {
            retStr += `${attendee.emailAddress.name}(${
                attendee.emailAddress.address
            }) - ${attendee.type.toUpperCase()} \n`;
        });
    }
    return retStr;
}
