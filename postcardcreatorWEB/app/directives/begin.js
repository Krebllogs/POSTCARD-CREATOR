(function () {
    app.directive('postcardBegin', begin);
    //applicantInfo.$inject = ['alertsService', 'customerService'];

    function bagin() {

        // Assign this to a local variable so that the context won't change on us unexpectedly.
        var directiveInstance = this;
        // Declare the directive definition
        var directiveDefinition = {
            templateUrl: 'app/views/postcard.home.view.html',  // Url for the template we will be using
            scope: {
                //vm: '=applicantSecVm',
                //showStepItems: '@showStepItems', // (Required - Boolean) Parameter setting used to control the items that should be shown in the wizard view.
                //showReviewItems: '@showReviewItems', // (Required - Boolean) Parameter setting used to control the items that should be shown on the review view.
                //disableReviewItems: '@disableReviewItems',
                //disableReviewItemsNoEdit: '@disableReviewItemsNoEdit',
            },
            restrict: 'E',
            templateNamespace: 'html',
            transclude: false,
            link: linkFunc,
            controller: postcardController
        };
        return directiveDefinition;

        // Link function 
        function linkFunc(scope, instanceElement, instanceAttribute, controller, transcludeFunction) {
            // Set undefined to false
            //scope.showStepItems = ((typeof scope.showStepItems == 'undefined') || (scope.showStepItems == '')) ? false : (scope.showStepItems == "true");
            //scope.showReviewItems = ((typeof scope.showReviewItems == 'undefined') || (scope.showReviewItems == '')) ? false : (scope.showReviewItems == "true");
            //scope.disableReviewItems = ((typeof scope.disableReviewItems == 'undefined') || (scope.disableReviewItems == '')) ? false : (scope.disableReviewItems == "true");
            //scope.disableReviewItemsNoEdit = ((typeof scope.disableReviewItemsNoEdit == 'undefined') || (scope.disableReviewItemsNoEdit == '')) ? false : (scope.disableReviewItemsNoEdit == "true");
            //scope.vm = {snapCardHolder: "true"};
        };
    };

    SolixApplicantInfoController.$inject = ['$scope', '$location'];
    function SolixApplicantInfoController($scope, $location) {
        //var $translatefilter = $filter('translate');

        $scope.obj = {
            show: true,
            hide: false
        };
    };
}());