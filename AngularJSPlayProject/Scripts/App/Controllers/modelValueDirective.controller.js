(function() {
    "use strict";

    function Controller(http) {

        var vm = this;
        vm.parentValue = 10;
        vm.customMax = 15;
    }

    angular.module("ngDemo").controller("modelValueDirectiveController", ['$http', Controller]);
})();