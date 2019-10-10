(function () {
    'use strict';
    app.controller('reviewController', [
        '$scope', '$location', 'alertsService', 'persistenceService', 'customerService', 'documentService', '$translate', '$filter', 'commonService', 'authenticationService', function ($scope, $location, alertsService, persistenceService, customerService, documentService, $translate, $filter, commonService, authenticationService) {

            var $translatefilter = $filter('translate');

            $scope.accordionAppInfo = true;
            $scope.accordionSnap = false;
            $scope.accordionAddress = false;
            $scope.accordionBilling = false;
            $scope.accordionMarketing = true;
            $scope.accordionCertification = true;
            $scope.items = [];
            $scope.selectionMarketing = [];
            $scope.selectionAttestations = [];
            $scope.questionLimit = 3;
            $scope.totalAttestationsLimit = 0;
            $scope.questionMaxReached = false;

            $scope.showStepItems = false;
            $scope.showReviewItems = true;
            $scope.disableReviewItems = true;
            $scope.disableReviewItemsNoEdit = true;
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

            var languageID
            if ($translate.use() === 'undefined') {
                languageID = 1; // Default to English
            }
            else {
                if ($translate.use() === 'en-US') {
                    languageID = 1;
                }
                else {
                    languageID = 2;
                }
            }

            // load the questions from the database
            getQuestions(languageID);

            // Function used to return the questions
            function getQuestions(languageID) {

                //Call the service method.
                commonService.getMarketingQuestions(languageID).then(function (results) {
                    //Get the data from the result Json
                    var questions = angular.fromJson(results.data);

                    // Save the questions data to the scope object
                    $scope.questions = questions.application.questions;

                    // Sort cutoff, this variable will be used to determine where in the list the new column should start
                    // This is to split the list of questions into 2 columns
                    $scope.questionCutoffSortOrder = Math.ceil($scope.questions.question.length / 2);

                }, function (response) {

                    // If error occurs, display error to the user
                    alertsService.logError($translatefilter('AppMsg.ERRMARKETINGQUESTIONSRETRIEVAL'));

                    // Return empty objects.
                    $scope.questions = [];
                });
            }

            // load the attestations from the database
            getAttestations(languageID);

            // Function used to return the attestations
            function getAttestations(languageID) {

                //Call the service method.
                commonService.getAttestations(languageID).then(function (results) {
                    //Get the data from the result Json
                    var attestations = angular.fromJson(results.data);

                    // Save the attestations data to the scope object
                    $scope.attestations = attestations.application.attestations;

                    // Save the total number of attestations that we should have
                    $scope.totalAttestationsLimit = $scope.attestations.attestation.length;

                }, function (response) {

                    // If error occurs, display error to the user
                    alertsService.logError($translatefilter('AppMsg.ERRATTESTATIONSRETRIEVAL'));

                    // Return empty objects.
                    $scope.attestations = [];
                });
            }

            if (typeof persistenceService.getCookieData() !== 'undefined') {
                customerService.externalGetCustomer(persistenceService.getCookieData(), persistenceService.getCookieDataByType(cookieType.referenceNumber)).then((function (results) {

                    //Example of how to retrieve the Customer Details
                    $scope.customerDetails = angular.fromJson(results.data[0]);

                    //split string and store it into array
                    //var dob = $scope.customerDetails.dob;
                    //var dobArray = new Array();
                    //dobArray = dob.split('/');

                    //var snapdob = $scope.customerDetails.snapParticipantDOB;
                    //var snapdobArray = new Array();
                    //snapdobArray = snapdob.split('/');
                    $scope.date = new Date();
                    //xml nodeValue from time element
                    $scope.vm = {
                        fn: $scope.customerDetails.firstName,
                        mi: $scope.customerDetails.middleName,
                        ln: $scope.customerDetails.lastName,
                        dob: $scope.customerDetails.dob,
                        //mm: dobArray[0],
                        //dd: dobArray[1],
                        //yy: dobArray[2],
                        ssn: $scope.customerDetails.ssn,
                        tribalid: $scope.customerDetails.tribalID,
                        taxid: $scope.customerDetails.taxpayerID,
                        homephone: $scope.customerDetails.landlinePhoneNumber,
                        mobilephone: $scope.customerDetails.mobilePhoneNumber,
                        cancontact: $scope.customerDetails.canContact,
                        email: $scope.customerDetails.emailAddress,
                        sfn: $scope.customerDetails.snapParticipantFirstName,
                        smi: $scope.customerDetails.snapParticipantMiddleName,
                        sln: $scope.customerDetails.snapParticipantLastName,
                        //smm: snapdobArray[0],
                        //sdd: snapdobArray[1],
                        //syy: snapdobArray[2],
                        sdob: $scope.customerDetails.snapParticipantDOB,
                        sssn: $scope.customerDetails.snapParticipantSSN,
                        stribalid: $scope.customerDetails.snapParticipantTribalID,
                        staxid: $scope.customerDetails.snapParticipantTaxpayerID,
                        address: $scope.customerDetails.serviceAddress,
                        apt: $scope.customerDetails.serviceAddressAptNo,
                        city: $scope.customerDetails.serviceAddressCity,
                        // Create the option model that will be used by the state dropdown to pre-select the state, if it already exists.
                        //stateoption: { stateCode: $scope.customerDetails.serviceAddressState },
                        //state: $scope.customerDetails.serviceAddressState,
                        zip: $scope.customerDetails.serviceAddressZip,
                        saddress: $scope.customerDetails.mailingAddress,
                        sapt: $scope.customerDetails.mailingAddressAptNo,
                        scity: $scope.customerDetails.mailingAddressCity,
                        // Create the option model that will be used by the state dropdown to pre-select the state, if it already exists.
                        sstateoption: { stateId: $scope.customerDetails.mailingAddressState },
                        //sstate: $scope.customerDetails.mailingAddressState,
                        szip: $scope.customerDetails.mailingAddressZip,
                        sameResShpAddr: false,
                        snapCardHolder: false,
                        issame: false,
                        barCodeID: $scope.customerDetails.barCodeID,
                        applicationID: $scope.customerDetails.applicationID,
                        programID: $scope.customerDetails.programID,
                        supportingDocLocation: $scope.customerDetails.supportingDocLocation,
                    };
                    if ($scope.vm.supportingDocLocation !== null) {
                        createDocumentDetails()
                    }
                    if ($scope.customerDetails.serviceAddressState !== null)
                        if ($scope.vm.programID === 2) { $scope.vm.stateoption = "CA" }
                        else
                            $scope.vm.stateoption = { stateCode: $scope.customerDetails.serviceAddressState };
                }),
                    function (response) {
                        alertsService.logError($translatefilter('AppMsg.ERRCUSTOMERDETAILSRETRIEVAL'));
                    }
                );
            }
            else {
                $location.path('/home');
            };

            $scope.reviewInvalid = function () {

                // Check if the user has selected more than the limit or marketing questions
                if ($scope.selectionMarketing.length > $scope.questionLimit)
                    return true;

                // Check if the user has selected all of the attestations
                if ($scope.totalAttestationsLimit > $scope.selectionAttestations.length)
                    return true;
                if ($scope.upped != true)
                    return true;

                return false;
            };

            $scope.toggleSelectionMarketing = function toggleSelectionMarketing(ID) {
                var idx = $scope.selectionMarketing.indexOf(ID);

                // is currently selected
                if (idx > -1) {
                    $scope.selectionMarketing.splice(idx, 1);
                }

                // is newly selected
                else {
                    $scope.selectionMarketing.push(ID);
                }

                // If the array of selected questions is equal to the limit of questions that can be selected,
                // set the questionMaxReached variable to true. The checkbox's disabled property is data bound to 
                // this property. 
                if ($scope.selectionMarketing.length === $scope.questionLimit) {
                    $scope.questionMaxReached = true;
                }
                else {
                    $scope.questionMaxReached = false;
                }
            };

            $scope.toggleSelectionAttestation = function toggleSelectionAttestation(ID) {
                var idx = $scope.selectionAttestations.indexOf(ID);

                // is currently selected
                if (idx > -1) {
                    $scope.selectionAttestations.splice(idx, 1);
                }

                // is newly selected
                else {
                    $scope.selectionAttestations.push(ID);
                }
            };

            $scope.complete = function () {
                $scope.disableSubmit = true;
                if (typeof persistenceService.getCookieData() !== 'undefined') {

                    if (!$scope.supportDocsUploaded) {
                        alertsService.logError($translatefilter('AppMsg.ERRSUPPORTDOCREQUIRED'));
                        return;
                    }

                    $scope.submittingApp.center().open();

                    //Retrieve bar code
                    customerService.externalGetCustomer(persistenceService.getCookieData(), persistenceService.getCookieDataByType(cookieType.referenceNumber)).then((function (results) {
                        $scope.customerDetails = angular.fromJson(results.data[0]);

                        if ($scope.customerDetails.barCodeID) {
                            var pdfdata = getPDFdata("Submit");

                            customerService.PDFGenerator(pdfdata).then((function (results) {
                                $location.path('/confirm');
                            }),
                                function (response) {
                                    alertsService.logError($translatefilter('AppMsg.ERRPRINTAPPLICATION'));
                                    $scope.submittingApp.close();
                                    return;
                                });
                        }

                        else {
                            alertsService.logError($translatefilter('AppMsg.ERRINVALIDBARCODE'));
                            $scope.submittingApp.close();
                            return;
                        }
                    }),
                        function (response) {
                            alertsService.logError($translatefilter('AppMsg.ERRBARCODERETRIEVAL'));
                            return;
                        });
                }

                else {
                    alertsService.logError($translatefilter('AppMsg.ERRSUBMITAPPLICATION'));
                    return;
                }
            };

            $scope.openUploadDoc = function () {
                $scope.updateDocs.center().open();
            };
            $scope.closeUploadDoc = function () {
                $scope.updateDocs.close();
            };

            // Setup the Kendo Upload control
            $scope.reviewUploadOptions = {
                async: {
                    saveUrl: environmentBase + 'api/Document/UploadDocument',
                    autoUpload: false,
                    removeUrl: "url",
                    removeField: "files",
                },
                multiple: false,
                localization: {
                    select: $translatefilter('Review.UPLOADSELECT'),
                    cancel: $translatefilter('Review.UPLOADCANCEL'),
                    headerStatusUploaded: $translatefilter('Review.UPLOADDONE'),
                    headerStatusUploading: $translatefilter('Review.UPLOADLING'),
                    retry: $translatefilter('Review.UPLOADRETRY'),
                    uploadSelectedFiles: $translatefilter('Review.UPLOADBTN')
                }
            }

            // Method used by the Kendo Upload control whenever the user selects a file to upload.
            $scope.selectFiles = function (e) {

                for (var index = 0; index <= e.files.length - 1; index++) {

                    var file = e.files[index];
                    var fileExtension = file.extension.toLowerCase();
                    var fileSize = file.size;

                    if (fileExtension != ".pdf" && fileExtension != ".gif" && fileExtension != ".jpg" && fileExtension != ".jpeg" && fileExtension != ".png") {
                        e.preventDefault();
                        alertsService.logError($translatefilter('AppMsg.ERRINVALIDFILETYPE'));
                        return;
                    }

                    if (fileSize > 5242880) {
                        e.preventDefault();
                        alertsService.logError($translatefilter('AppMsg.ERRFILESIZE'));
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

            $scope.uploadFiles = function (e) {
                // Hide Preview Link & the Restart Checkbox
                $scope.supportDocsUploaded = false;
                if ($scope.restart || isNaN($scope.gSequence)) {
                    $scope.gSequence = 1;
                } else {
                    $scope.gSequence = $scope.gSequence + 1;
                }
                // Add the other parameters
                e.data = {
                    applicationID: $scope.vm.applicationID
                    , barcodeID: $scope.vm.barCodeID
                    , restart: $scope.restart != false ? "true" : "false"
                    , resizedImage: $scope.resizedImage
                    , originalImage: $scope.base64OriginalImage
                    , languageID: languageID
                    , firstName: $scope.customerDetails.firstName
                    , middleName: $scope.customerDetails.middleName
                    , lastName: $scope.customerDetails.lastName
                    , sequence: $scope.gSequence
                    , state: $scope.customerDetails.state
                };
                if ($scope.restart) {
                    $scope.erasefiles();  // remove prior files from tables //
                }
                // Clear the Restart Checkbox
                $scope.restart = false;

                convertAll(locPage(), 'upload', 'documentation', $scope.vm.barCodeID);
            };

            $scope.erasefiles = function () {
                var eraseDetails = {
                    "applicationID": $scope.vm.applicationID,
                }
                documentService.eraseFiles(eraseDetails).then((function (results) {
                    //console.log("ok", results);
                }),
                    function (response) {
                        console.log("err", results);
                    });
            }

            $scope.uploadSuccess = function (e) {
                alertsService.logSuccess($translatefilter('AppMsg.MSGFILESUPLOADED'));
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
                    alertsService.logError(e.files[0].name + ': ' + $translatefilter('AppMsg.ERRUPLOAD'));
                else
                    alertsService.logError(e.files[0].name + ': ' + (angular.fromJson(e.XMLHttpRequest.responseText).message));
            };

            // Print button function
            $scope.printPDF = function () {
                if (typeof persistenceService.getCookieData() !== 'undefined') {

                    //Retrieve bar code
                    customerService.externalGetCustomer(persistenceService.getCookieData(), persistenceService.getCookieDataByType(cookieType.referenceNumber)).then((function (results) {
                        $scope.customerDetails = angular.fromJson(results.data[0]);

                        if ($scope.customerDetails.barCodeID) {
                            convertAll(locPage(), 'print', 'application', $scope.customerDetails.barCodeID);
                            var pdfdata = getPDFdata("Print");

                            customerService.PDFGenerator(pdfdata).then((function (results) {
                                //window.open("data:application/pdf;base64, " + results.data);

                                var uintArray = Base64Binary.decode(results.data);

                                var file = new Blob([uintArray], { type: 'application/pdf' });
                                if (window.navigator.msSaveOrOpenBlob) {
                                    window.navigator.msSaveOrOpenBlob(file);
                                }
                                else {
                                    var fileURL = URL.createObjectURL(file);
                                    window.open(fileURL);
                                }

                                $location.path('/printapp');
                            }),
                                function (response) {
                                    alertsService.logError($translatefilter('AppMsg.ERRPRINTAPPLICATION'));
                                });
                        }

                        else {
                            alertsService.logError($translatefilter('AppMsg.ERRINVALIDBARCODE'));
                        }
                    }),
                        function (response) {
                            alertsService.logError($translatefilter('AppMsg.ERRBARCODERETRIEVAL'));
                        });
                }

                else {
                    alertsService.logError($translatefilter('AppMsg.ERRPRINTAPPLICATION'));
                }
            };

            var Base64Binary = {
                _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

                /* will return a  Uint8Array type */
                decodeArrayBuffer: function (input) {
                    var bytes = (input.length / 4) * 3;
                    var ab = new ArrayBuffer(bytes);
                    this.decode(input, ab);

                    return ab;
                },

                removePaddingChars: function (input) {
                    var lkey = this._keyStr.indexOf(input.charAt(input.length - 1));
                    if (lkey == 64) {
                        return input.substring(0, input.length - 1);
                    }
                    return input;
                },

                decode: function (input, arrayBuffer) {
                    //get last chars to see if are valid
                    input = this.removePaddingChars(input);
                    input = this.removePaddingChars(input);

                    var bytes = parseInt((input.length / 4) * 3, 10);

                    var uarray;
                    var chr1, chr2, chr3;
                    var enc1, enc2, enc3, enc4;
                    var i = 0;
                    var j = 0;

                    if (arrayBuffer)
                        uarray = new Uint8Array(arrayBuffer);
                    else
                        uarray = new Uint8Array(bytes);

                    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                    for (i = 0; i < bytes; i += 3) {
                        //get the 3 octects in 4 ascii chars
                        enc1 = this._keyStr.indexOf(input.charAt(j++));
                        enc2 = this._keyStr.indexOf(input.charAt(j++));
                        enc3 = this._keyStr.indexOf(input.charAt(j++));
                        enc4 = this._keyStr.indexOf(input.charAt(j++));

                        chr1 = (enc1 << 2) | (enc2 >> 4);
                        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                        chr3 = ((enc3 & 3) << 6) | enc4;

                        uarray[i] = chr1;
                        if (enc3 != 64) uarray[i + 1] = chr2;
                        if (enc4 != 64) uarray[i + 2] = chr3;
                    }

                    return uarray;
                }
            }

            function getPDFdata(action) {
                //set variables for SNAPQ and CASSI
                var SNAPQ;
                var CASSIQ;
                var CONTACT
                var selectedMarketingAnswers = $scope.selectionMarketing.join(",") + ",";
                //create array for marcketing answers with responses
                var marketingAnswers = ["No", "No", "No", "No", "No", "No", "No", "No"];
                var a;
                for (var ans = 0; ans < $scope.selectionMarketing.length; ans++) {
                    a = $scope.selectionMarketing[ans] - 1;
                    if ($scope.selectionMarketing[ans] != null) {
                        marketingAnswers[a] = "Yes";
                    }
                }
                if ($scope.customerDetails.programID === 1) { SNAPQ = "Yes"; }
                else { SNAPQ = "No"; }
                if ($scope.customerDetails.programID === 2) { CASSIQ = "Yes"; }
                else { CASSIQ = "No"; }
                if ($scope.customerDetails.canContact === true) {
                    CONTACT = "Yes"
                }
                else { CONTACT = "No" }

                var pdfdata = {
                    "barcodeID": $scope.customerDetails.barCodeID,
                    "languageId": $scope.customerDetails.languageID != null ? $scope.customerDetails.languageID : "1",
                    "pdfAction": action,
                    "marketingAnswersID": selectedMarketingAnswers,
                    pdfdata: {
                        "ApplicationID": $scope.customerDetails.applicationID,
                        "Full_Name": $scope.customerDetails.firstName + " " + (($scope.customerDetails.middleName === null) ? "" : $scope.customerDetails.middleName + " ") + $scope.customerDetails.lastName,
                        "Billing_Address": $scope.customerDetails.mailingAddress,
                        "Billing_Apt": $scope.customerDetails.mailingAddressAptNo,
                        "Billing_CityStateZip": $scope.customerDetails.mailingAddressCity + " " + $scope.customerDetails.mailingAddressState + " " + $scope.customerDetails.mailingAddressZip,
                        "Service_Address": $scope.customerDetails.serviceAddress,
                        "Service_Apt": $scope.customerDetails.serviceAddressAptNo,
                        "Service_CityStateZip": $scope.customerDetails.serviceAddressCity + " " + $scope.customerDetails.serviceAddressState + " " + $scope.customerDetails.serviceAddressZip,
                        "PhoneNumber": $scope.customerDetails.landlinePhoneNumber === null ? "" : $scope.customerDetails.landlinePhoneNumber,
                        "CellPhoneNumber": $scope.customerDetails.mobilePhoneNumber === null ? "" : $scope.customerDetails.mobilePhoneNumber,
                        "DOB": action != "Submit" ? "" : $scope.customerDetails.dob,//"",//$scope.customerDetails.dob,
                        "SSN": action != "Submit" ? "" : $scope.customerDetails.ssn,//"",//$scope.customerDetails.ssn === null ? "" : $scope.customerDetails.ssn,
                        "TribalId": action != "Submit" ? "" : $scope.customerDetails.tribalID,//"",//$scope.customerDetails.tribalID === null ? "" : $scope.customerDetails.tribalID,
                        "TaxId": action != "Submit" ? "" : $scope.customerDetails.taxpayerID,//"",//$scope.customerDetails.taxpayerID === null ? "" : $scope.customerDetails.taxpayerID,
                        "Email": $scope.customerDetails.emailAddress === null ? "" : $scope.customerDetails.emailAddress,
                        "Snap_FirstName": $scope.customerDetails.snapParticipantFirstName,
                        "Snap_MiddleInitial": $scope.customerDetails.snapParticipantMiddleName === null ? "" : $scope.customerDetails.snapParticipantMiddleName,
                        "Snap_LastName": $scope.customerDetails.snapParticipantLastName,
                        "Snap_DOB": action != "Submit" ? "" : $scope.customerDetails.snapParticipantDOB,//"",//$scope.customerDetails.snapParticipantDOB,
                        "Snap_SSN": action != "Submit" ? "" : $scope.customerDetails.snapParticipantSSN,//"",//$scope.customerDetails.snapParticipantSSN === null ? "" : $scope.customerDetails.snapParticipantSSN,
                        "Snap_TribalId": action != "Submit" ? "" : $scope.customerDetails.snapParticipantTribalID,//"",//$scope.customerDetails.snapParticipantTribalID === null ? "" : $scope.customerDetails.snapParticipantTribalID,
                        "Snap_TaxId": action != "Submit" ? "" : $scope.customerDetails.snapParticipantTaxpayerID,//"",//$scope.customerDetails.snapParticipantTaxpayerID === null ? "" : $scope.customerDetails.snapParticipantTaxpayerID,
                        //"ApplicationID": $scope.customerDetails.applicationID,
                        "Barcode471__AppId": $scope.customerDetails.barCodeID,
                        "BarcodeId": $scope.customerDetails.barCodeID,
                        "ReferenceNumber": $scope.customerDetails.referenceNumber,
                        "Customer_Signature": action != "Submit" ? "" : $scope.customerDetails.firstName + " " + (($scope.customerDetails.middleName === null) ? "" : $scope.customerDetails.middleName + " ") + $scope.customerDetails.lastName,
                        "Snap_Signature": action != "Submit" ? "" : $scope.customerDetails.snapParticipantFirstName + " " + (($scope.customerDetails.snapParticipantMiddleName === null) ? "" : $scope.customerDetails.snapParticipantMiddleName + " ") + $scope.customerDetails.snapParticipantLastName,
                        "Signature_Date": action != "Submit" ? "" : $scope.date.getMonth() + 1 + '/' + $scope.date.getDate() + '/' + $scope.date.getFullYear(),
                        "Snap_Date": action != "Submit" ? "" : $scope.date.getMonth() + 1 + '/' + $scope.date.getDate() + '/' + $scope.date.getFullYear(),
                        "Checkbox__School": marketingAnswers[0],
                        "Checkbox__EveryoneOn": marketingAnswers[3],
                        "Checkbox__Friend": marketingAnswers[6],
                        "Checkbox__National": marketingAnswers[2],
                        "Checkbox__State": marketingAnswers[1],
                        "Checkbox__Radio": marketingAnswers[4],
                        "Checkbox__Mail": marketingAnswers[5],
                        "Checkbox_HUD": marketingAnswers[7],
                        "SNAP_Qualify": SNAPQ,
                        "CASSI_Qualify": CASSIQ,
                        "Checkbox_CanContact": CONTACT,
                    }
                }
                //Return data
                return pdfdata;
            };

            //getMailAppData
            function getMailAppData() {
                var MailAppData = {
                    "customerID": persistenceService.getCookieData(),
                    "userID": "External Web",
                    "applicationID": $scope.vm.applicationID,
                };
                return MailAppData;
            };

            //Mail Application Method
            $scope.mailApp = function () {
                customerService.externalGetCustomer(persistenceService.getCookieData(), persistenceService.getCookieDataByType(cookieType.referenceNumber)).then((function (results) {
                    //Example of how to retrieve the Customer Details
                    $scope.customerDetails = angular.fromJson(results.data[0]);
                    //get mailAppData object
                    var mailAppData = getMailAppData();
                    //call mailApp
                    customerService.MailApplication(mailAppData.customerID, mailAppData.applicationID, mailAppData.userID).then((function (results) {
                        //clear cookies
                        // hp moved to confirmcontroller persistenceService.clearCookieData();
                        $location.path('/mailapp');
                    }),
                        function (response) {
                            alertsService.logError($translatefilter('AppMsg.ERRMAILAPPLICATION'));
                        });
                }),
                    function (response) {
                        alertsService.logError($translatefilter('AppMsg.ERRCUSTOMERDETAILSRETRIEVAL'));
                    }
                );
            };


            //Display Documents
            $scope.getDocument = function (documentLocation, documentType) {
                $scope.documentstabstrip.select(0);
                if (documentType != "Application") {
                    $scope.supportingdocument = documentLocation;
                }
                else {
                    $scope.applicationdocument = documentLocation;
                }

                setTimeout(function () {
                    $scope.kendoWindowDocuments.center().open();
                }, 5000);
            };
            function createDocumentDetails() {
                // Show Spinner
                $scope.uploadInProgress = true;
                customerService.externalGetCustomer(persistenceService.getCookieData(), persistenceService.getCookieDataByType(cookieType.referenceNumber)).then((function (results) {
                    $scope.customerDetails = angular.fromJson(results.data[0]);
                    $scope.vm.supportingDocLocation = $scope.customerDetails.supportingDocLocation;
                    var documentdetails = {
                        "DocumentPath": $scope.vm.supportingDocLocation, //$scope.customerDetails.supportingDocLocation ,
                        "DocumentType": 'SupportDocument',
                        "FromExpire": 0
                    }
                    documentService.getDocument(documentdetails).then((function (results) {
                        $scope.supportDocument = results.data;
                        // Hide Spinner
                        $scope.uploadInProgress = false;
                        //show link
                        $scope.supportDocsUploaded = true;
                        // hpch base64Details();
                    }),
                        function (response) {
                            alertsService.logError($translatefilter('ERROR RETRIVING DOCUMENT'));
                        });
                }),
                    function (response) {
                        alertsService.logError($translatefilter('AppMsg.ERRAPPLICATIONRETRIEVAL'));
                    })
            };

            function base64Details() {
                // Show Spinner
                $scope.uploadInProgress = true;
                var base64Details = {
                    "applicationID": $scope.vm.applicationID,
                    "firstName": $scope.customerDetails.firstName,
                    "middleName": $scope.customerDetails.middleName,
                    "lastName": $scope.customerDetails.lastName,
                    "address": $scope.customerDetails.serviceAddress,
                    "aptNo": $scope.customerDetails.serviceAddressAptNo,
                    "city": $scope.customerDetails.serviceAddressCity,
                    "state": $scope.customerDetails.serviceAddressState,
                    "zip": $scope.customerDetails.serviceAddressZip,
                    "barcodeID": $scope.vm.barCodeID,
                    "language": languageID,
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