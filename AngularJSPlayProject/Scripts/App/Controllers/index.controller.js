(function () {
    "use strict";

    function Controller($http) {

        var vm = this;
        vm.parentLabel = "My Label";
        vm.parentInfo = "Some information goes here";
        vm.parentDetails = "Some parent details here";

        vm.directiveUpdated = function (args) {
            console.log('Diretive updated:', args);
            alert('Directive was updated');
        };
    }

    angular.module("ngDemo").controller("indexController", ['$http', Controller]);
})();