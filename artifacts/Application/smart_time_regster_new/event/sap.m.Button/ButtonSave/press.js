var originalActivities = modeloSinglePlanningCalendar.getData();
var updatedActivities = modelListEmptyActivities.getData();
var selectedItems = ListEmptyActivities.getSelectedItems();

for (var i = 0; i < selectedItems.length; i++) {
  var selectedItem = selectedItems[i];
  var bindingContext = selectedItem.getBindingContext();
  var data = bindingContext.getObject();
  var selectedStart = data.start;
  var selectedEnd = data.end;

  for (var j = 0; j < originalActivities.length; j++) {
    var originalActivity = originalActivities[j];
    var originalStart = originalActivity.start;
    var originalEnd = originalActivity.end;

    if (originalStart.getTime() === selectedStart.getTime() && originalEnd.getTime() === selectedEnd.getTime()) {
      originalActivity.title = InputTitle1.getValue();
      originalActivity.info = TextAreaDetails1.getValue();
      originalActivity.type = "Type07";
      break;
    }
  }
}

modeloSinglePlanningCalendar.setData(originalActivities);
DialogUpdateActivities.close();





// var originalActivities = modeloSinglePlanningCalendar.getData();
// var updatedActivities = modelListEmptyActivities.getData();
// var selectedItems = ListEmptyActivities.getSelectedItems();

// for (var i = 0; i < selectedItems.length; i++) {
//   var selectedItem = selectedItems[i];
//   var bindingContext = selectedItem.getBindingContext();
//   var data = bindingContext.getObject();
//   var selectedStart = data.start;
//   var selectedEnd = data.end;

//   for (var j = 0; j < originalActivities.length; j++) {
//     var originalActivity = originalActivities[j];
//     var originalStart = originalActivity.start;
//     var originalEnd = originalActivity.end;

//     if (originalStart.getTime() === selectedStart.getTime() && originalEnd.getTime() === selectedEnd.getTime()) {
//       originalActivity.title = InputTitle1.getValue();
//       originalActivity.info = TextAreaDetails1.getValue();
//       originalActivity.type = "Type07";
//       break;
//     }
//   }
// }

// modeloSinglePlanningCalendar.setData(originalActivities);
// DialogUpdateActivities.close();


