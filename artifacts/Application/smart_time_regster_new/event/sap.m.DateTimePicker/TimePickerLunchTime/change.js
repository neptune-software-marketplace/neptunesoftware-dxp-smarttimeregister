var data = modeloSinglePlanningCalendar.getData();
var currentDate = new Date();

for (var i = data.length - 1; i >= 0; i--) {
    var eventDate = new Date(data[i].start);
    eventDate.setHours(0, 0, 0, 0);

    if (data[i].title === "Lunch" && eventDate.getTime() === currentDate.getTime()) {
        data.splice(i, 1);
        modeloSinglePlanningCalendar.setData(data);
    }
}
