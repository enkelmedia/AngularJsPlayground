(function() {
    "use strict";

    function Controller(http) {

        var vm = this;
        vm.parentValue = 10;
    }

    angular.module("ngDemo").controller("modelValueDirectiveController", ['$http', Controller]);
})();