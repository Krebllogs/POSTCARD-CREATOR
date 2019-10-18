'use strict';
(function () {
    app.factory('persistenceService', ['$cookies', 'localStorageService', function ($cookies, localStorageService) {
        var persistenceService = {
            setCookieData: setCookieData,
            getCookieData: getCookieData,
            clearCookieData: clearCookieData,
            setCookieDataByType: setCookieDataByType,
            getCookieDataByType: getCookieDataByType,
            clearCookieDataByType: clearCookieDataByType,
            setLocalStorageData: setLocalStorageData,
            getLocalStorageData: getLocalStorageData,
            removeLocalStorageData: removeLocalStorageData
        };

        return persistenceService;

        //Set Customer ID in a Cookie
        function setCookieData(applicationID) {
            $cookies.put("applicationID", applicationID);//, { expires: now });
        };

        //Get Customer ID from Cookie
        function getCookieData() {
            var now = new Date();
            now.setDate(now.getDate());
            now.setMinutes(now.getMinutes() + 5);
            $cookies.put("applicationID", $cookies.get("applicationID"), { expires: now })
            var customerID = $cookies.get("applicationID");
            return customerID;
        };

        //Delete customer data, & token from Cookie
        function clearCookieData() {
            $cookies.remove("locationData");
            $cookies.remove("applicationID");
            $cookies.remove("barcodeID");
            $cookies.remove("firstName");
            $cookies.remove("lastName");
            $cookies.remove("filename");
            $cookies.remove("filetype");
            $cookies.remove("sequence");
            $cookies.remove("image64");
            //delete token from local storage
            localStorageService.remove("authorizationExternal");
        };

        //Set data into cookie by type
        function setCookieDataByType(cookieType, data) {
            $cookies.put(cookieType, data);
        };
        //Get data into cookie by type
        function getCookieDataByType(cookieType) {
            var data = $cookies.get(cookieType);
            return data;
        };

        //Delete Customer ID from Cookie by Type
        function clearCookieDataByType(cookieType) {
            $cookies.remove(cookieType);
        };

        function setLocalStorageData(key, value) {
            localStorageService.set(key, value);
        };

        function getLocalStorageData(key) {
            return localStorageService.get(key);
        };

        function removeLocalStorageData(key) {
            localStorageService.remove(key);
        };
    }])
}());
