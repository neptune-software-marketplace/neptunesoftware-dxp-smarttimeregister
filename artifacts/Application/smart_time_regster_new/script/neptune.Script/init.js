sap.ui.core.BusyIndicator.show(0);
var cahceCheck = false;
var comeBack = false;
if (sap.ushell && sap.ushell.Container) {
  var username = AppCache.userInfo.email;
}else{
var username = "kaan.koska@neptune-software.com";
sap.m.MessageToast.show("User Name Error");
}
if (username == null) {
    username = "admin";
    sap.m.MessageToast.show("User Name Error");
}

var options = {
    parameters: {
        where: JSON.stringify({ User_Name: username }), // Optional
    },
};

apiRestAPIGetTimes(options);
const clientId = "78c9f7c5-a236-41fd-b4c2-3a5000d26c7e";
const tenantId = "8fdb51da-e45d-423f-ae33-cf92118d5311";

const msalConfig = {
    auth: {
        clientId: clientId,
        authority: `https://login.microsoftonline.com/${tenantId}`,
        redirectUri: "https://gtmdemosystem.neptune-software.cloud/", //"https://gtmdemosystem.neptune-software.cloud/public/azure_redirect.html",
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you're having issues on Internet Explorer 11 or Edge
    },
};

// Add scopes for the ID token to be used at Microsoft identity platform endpoints.
const loginScopes = {
    scopes: ["openid", "User.Read", "Calendars.Read"],
};

// Add scopes for the access token to be used at Microsoft Graph API endpoints.
const requestScopes = {
    scopes: ["Calendars.Read"],
};

var aadApplication;
var token;

sap.ui.getCore().attachInit(function (data, navObj) {
    setTimeout(() => {
        aadApplication = new msal.PublicClientApplication(msalConfig);
        oSinglePlanningCalendar.setSelectedView(oSinglePlanningCalendarDayView);
        oButtonSignIn.firePress();
        oButtonSignIn.setVisible(false);
    }, 200);
});


function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}














