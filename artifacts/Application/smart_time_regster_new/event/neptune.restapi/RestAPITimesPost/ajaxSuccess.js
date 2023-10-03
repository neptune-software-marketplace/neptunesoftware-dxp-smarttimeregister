
if (sap.ushell && sap.ushell.Container) {
  var username = AppCache.userInfo.email;
}else{
var username = "kaan.koska@neptune-software.com";
sap.m.MessageToast.show("User Name Error");
}
if(username == null)
{
    username = "admin"
    sap.m.MessageToast.show("User Name Error");
}

var options = {
    parameters: {
        "where": JSON.stringify({"User_Name": username}) // Optional 
    }
};

apiRestAPIGetTimes(options);



sap.m.MessageToast.show("Saved");