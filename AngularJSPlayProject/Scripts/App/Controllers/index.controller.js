(function () {
    "use strict";

    function Controller(scope,$http) {

        var vm = this;
        vm.parentLabel = "My Label";
        vm.parentInfo = "Some information goes here";
        vm.parentDetails = "Some parent details here";

        // When 
        vm.directiveUpdated = function (args,args2) {
            console.log('Directive updated:', args, 'more args: ', args2);
        };

        scope.$watch('vm.parentLabel', function (foo1, foo2) {
            if (foo1===foo2) {
                return;
            }
            // At this point, in the watcher the scope (vm.parentLabel) is already 
            // updated to the new value
            console.log('parentLabel changed', vm.parentLabel, foo1, foo2);
        });

    }

    angular.module("ngDemo").controller("indexController", ['$scope','$http', Controller]);
})();