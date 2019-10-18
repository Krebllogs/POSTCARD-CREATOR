//place holder serverce reference for a document service 
//to save and delete stored files
'use strict';
app.factory('documentService', ['$http', function ($http) {
    var documentsServiceFactory = {
        getDocument: _getDocument,
        eraseFiles: _eraseFiles,
        awsSend: _Send
    };

    return documentsServiceFactory;

    function _getDocument(documentdetails) {
        return $http.post('api/document/getdocument', documentdetails).then(function (results) {
            return results;
        });
    };

    function _eraseFiles(eraseDetails) {
        return $http.post('api/discardImages', eraseDetails).then(function (results) {
            return results;
        });
    }
    function _Send(Details) {
        return $http.post('api/Send', Details).then(function (results) {
            return results;
        });
    }
}]);