(function () {
    'use strict';
    app.controller('postcardController', [
        '$scope', '$location', 'persistenceService', 'documentService', function ($scope, $location, persistenceService, documentService) {
            $scope.Message = "some message to be things to say!"
            $scope.fileSelected = false;
            $scope.supportDocsUploaded = false;
            $scope.supportDocument = '';
            $scope.upped = false;
            $scope.restart = false;
            $scope.resizedImage = '';
            $scope.base64Complete = '';
            $scope.base64Split = '';
            $scope.base64DataType = '';
            $scope.base64OriginalImage = '';
            $scope.base64ImageName = '';
            $scope.uploadInProgress = false;
            $scope.disableSubmit = false;
            $scope.gSequence = 0;
            $scope.vm = {
                fn: "",
                ln: "",
                message: "",

            }

            //clear cookies
            //persistenceService.clearCookieData();
            $scope.openUploadDoc = function () {
                $scope.UploadDoc.center().open();
            };
            $scope.closeUploadDoc = function () {
                $scope.UploadDoc.close();
            };
            $scope.go = function () {
                //post request to service to log, create and send email.
                //var request = $http({
                //    method: "post",
                //    url: "api/Send",
                //    params: {
                //        action: "add"
                //    },
                //    data: {
                //        locationdata: ""//$scope.img.locationData placeholder for location data
                //        , applicationID: ""//$scope.vm.applicationID
                //        , moredata: ""//$scope.vm.barCodeID
                //        , restart: $scope.restart != false ? "true" : "false"
                //        , resizedImage: $scope.resizedImage
                //        , originalImage: $scope.img//$scope.base64OriginalImage
                //        , firstName: $scope.vm.fn
                //        , lastName: $scope.vm.ln
                //        , sequence: $scope.gSequence
                //    }
                //});
                //return (request.then(handleSuccess, handleError));

                $location.path('#');
            };


            // start Picture Preview    
            $scope.imageUpload = function (event) {
                var files = event.target.files;

                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    var fileExtension = file.type.toLowerCase();
                    var fileSize = file.size;

                    if (fileExtension != ".pdf" && fileExtension != ".gif" && fileExtension != ".jpg" && fileExtension != "image/jpeg" && fileExtension != ".jpeg" && fileExtension != ".png") {
                        //e.preventDefault();
                        console.log("Invalid file type")
                        //alertsService.logError('invalid file type');
                        return;
                    }

                    if (fileSize > 5242880) {
                        //e.preventDefault();
                        console.log("File too large");
                        //alertsService.logError('file size error));
                        return;
                    }
                    var reader = new FileReader();
                    reader.onload = $scope.imageIsLoaded;
                    
                    reader.readAsDataURL(file);
                    persistenceService.setCookieDataByType("image64", reader.file);
                    resizeImage(file, fileExtension.replace('.', ''));

                    $scope.fileSelected = true;
                }
            };

            $scope.imageIsLoaded = function (e) {
                $scope.$apply(function () {
                    $scope.img = e.target.result;
                });
            };



            // Setup the Kendo Upload control
            $scope.postcardUploadOptions = {
                async: {
                    saveUrl: 'save',
                    autoUpload: false,
                    removeUrl: 'url',
                    removeField: 'files',
                },
                multiple: false
            };
                            //,
                //localization: {
                //    select:                     "Select",
                //    cancel:                     "Cancel",
                //    headerStatusUploaded:       "Upload Complete",
                //    headerStatusUploading:      "Uploading",
                //    retry:                      "Retry",
                //    uploadSelectedFiles:        "Upload File"
                //}
            // Method used by the Kendo Upload control whenever the user selects a file to upload.
            $scope.selectFiles = function (e) {

                for (var index = 0; index <= e.files.length - 1; index++) {

                    var file = e.files[index];
                    var fileExtension = file.extension.toLowerCase();
                    var fileSize = file.size;

                    if (fileExtension != ".pdf" && fileExtension != ".gif" && fileExtension != ".jpg" && fileExtension != ".jpeg" && fileExtension != ".png") {
                        e.preventDefault();
                        console.log("Invalid file type")
                        //alertsService.logError('invalid file type');
                        return;
                    }

                    if (fileSize > 5242880) {
                        e.preventDefault();
                        console.log("File too large");
                        //alertsService.logError('file size error));
                        return;
                    }

                    addPreview(file, fileExtension.replace('.', ''));
                    resizeImage(file, fileExtension.replace('.', ''));
                }
            };

            function addPreview(file, fileExtension) {
                var raw = file.rawFile;
                var reader = new FileReader();

                if (raw) {
                    reader.onloadend = function () {
                        var preview = $("<img class='image-preview'>").attr("src", this.result);

                        if (fileExtension != "pdf")
                            $(".k-file[data-uid='" + file.uid + "']").find(".k-i-" + fileExtension).replaceWith(preview);
                    };

                    reader.readAsDataURL(raw);
                }
            }

            function resizeImage(file, fileExtension) {
                var raw = file.rawFile;
                var reader = new FileReader();

                if (raw) {
                    reader.onloadend = function () {
                        if (fileExtension != "pdf") {
                            var image = new Image();

                            image.addEventListener("load", function () {
                                var imageInfo = file.name + ' ' +
                                    image.width + '×' + image.height + ' '
                                    + file.type + ' ' + Math.round(file.size / 1024) + 'KB';
                                var canvas = document.createElement('CANVAS');
                                var ctx = canvas.getContext('2d');
                                var dataURL;
                                var maxHeight = 640;
                                var maxWidth = 640;

                                if (image.height > maxHeight) {
                                    canvas.width = image.width / (image.height / maxHeight);
                                    canvas.height = maxHeight;
                                }

                                else {
                                    canvas.width = image.width;
                                    canvas.height = image.height;
                                }

                                if (canvas.width > maxWidth) {
                                    canvas.height = canvas.height / (canvas.width / maxWidth);
                                    canvas.width = maxWidth;
                                }

                                ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
                                dataURL = canvas.toDataURL('image/jpeg');
                                $scope.resizedImage = dataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
                                canvas = null;
                            });

                            $scope.base64Complete = reader.result;
                            $scope.base64Split = $scope.base64Complete.split(";");
                            $scope.base64DataType = $scope.base64Split[0].split(":")[1];
                            $scope.base64OriginalImage = $scope.base64Complete.replace(/^data:image\/(png|jpg|jpeg|gif);base64,/, "");
                            $scope.base64ImageName = file.name;

                            image.src = reader.result;
                        }

                        else {
                            $scope.base64Complete = reader.result;
                            $scope.base64Split = $scope.base64Complete.split(";");
                            $scope.base64DataType = $scope.base64Split[0].split(":")[1];
                            $scope.base64OriginalImage = $scope.base64Complete.replace(/^data:application\/pdf;base64,/, "");
                            $scope.base64ImageName = file.name;
                        }
                    };

                    reader.readAsDataURL(raw);
                }
            }
            $scope.uploadFiles = function () {
                // Hide Preview Link & the Restart Checkbox
                //$scope.supportDocsUploaded = false;
                //if ($scope.restart || isNaN($scope.gSequence)) {
                //    $scope.gSequence = 1;
                //} else {
                //    $scope.gSequence = $scope.gSequence + 1;
                //}
                // Add the other parameters
                var imageData = {
                    locationdata: ""//$scope.img.locationData placeholder for location data
                    , applicationID: ""//$scope.vm.applicationID
                    , moredata: ""//$scope.vm.barCodeID
                    , restart: $scope.restart != false ? "true" : "false"
                    , resizedImage: $scope.resizedImage
                    , originalImage: $scope.img//$scope.base64OriginalImage
                    , firstName: $scope.vm.fn
                    , lastName: $scope.vm.ln
                    , sequence: $scope.gSequence
                };
                if ($scope.restart) {
                    $scope.erasefiles();  // remove prior files from tables //
                }
                // Clear the Restart Checkbox
                $scope.restart = false;

                ///convertAll(locPage(), 'upload', 'documentation', $scope.vm.barCodeID);
            };

            $scope.erasefiles = function () {
                var eraseDetails = {
                    "applicationID": $scope.vm.applicationID,
                }
                documentService.eraseFiles(eraseDetails).then((function (results) {
                    //place holder should log through service
                    console.log("ok", results);
                }),
                    function (response) {
                        //place holder should log through service
                        console.log("err0r", results);
                    });
            }

            $scope.uploadSuccess = function (e) {
                alertsService.logSuccess("Files uploaded");
                convertAll(locPage(), 'upload', 'success', $scope.vm.barCodeID);
                $(".k-widget.k-upload").find("ul").remove();
                createDocumentDetails();
                //if (documentdetails === true) { $scope.supportDocsUploaded = true; }
            };

            $scope.uploadError = function (e) {
                if ($scope.vm.supportingDocLocation !== null) {
                    // Show Preview Link & the Restart Checkbox
                    $scope.supportDocsUploaded = true;
                }

                convertAll(locPage(), 'upload', 'fail', $scope.vm.barCodeID);
                //tempResponseJSON["responseCode"]
                if (e.XMLHttpRequest === null || typeof e.XMLHttpRequest === 'undefined' || e.XMLHttpRequest.responseText === '')
                    console.log("OK");//alertsService.logError(e.files[0].name + ': ' + "Upload ERROR");
                else
                    console.log("Err");
                    //alertsService.logError(e.files[0].name + ': ' + (angular.fromJson(e.XMLHttpRequest.responseText).message));
            };

            function base64Details() {
                // Show Spinner
                $scope.uploadInProgress = true;
                var base64Details = {
                    "locationdata": $scope.vm.locationData,
                    "applicationID": $scope.vm.applicationID,
                    "moredata": $scope.vm.barCodeID,
                    "firstName": $scope.customerDetails.firstName,
                    "lastName": $scope.customerDetails.lastName,
                    "filename": $scope.base64ImageName,
                    "filetype": $scope.base64DataType,
                    "sequence": $scope.gSequence,
                    "image64": $scope.base64OriginalImage
                }

                documentService.base64Details(base64Details).then((function (results) {
                    // Hide Spinner
                    $scope.uploadInProgress = false;
                }),
                    function (response) {
                        console.log();
                    });
            };
        }]);
}).call(this);