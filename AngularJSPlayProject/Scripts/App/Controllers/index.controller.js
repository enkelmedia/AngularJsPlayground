(function () {
    "use strict";

    function Controller($http) {

        var vm = this;
        vm.parentLabel = "My Label";
        vm.parentInfo = "Some information goes here";
        vm.parentDetails = "Some parent details here";

        // When 
        vm.directiveUpdated = function (args,args2) {
            console.log('Directive updated:', args, 'more args: ', args2);
        };
    }

    angular.module("ngDemo").controller("indexController", ['$http', Controller]);
})();