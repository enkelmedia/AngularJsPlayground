(function () {
    "use strict";

    function Controller(scope,$http) {

        var vm = this;
        vm.parentLabel = "Hallo World";

        vm.addItem = function() {
            vm.items.push({ id: 0, name: vm.newItemText });
            vm.newItemText = '';
        };

        vm.items = [
            { id: 1, name: 'Kalle-Controller' },
            { id: 2, name: 'Sven' },
            { id: 3, name: 'Louise' },
            { id: 4, name: 'Göran' },
            { id: 5, name: 'Anders' }
        ];

    }

    angular.module("ngDemo").controller("mjRepeatController", ['$scope','$http', Controller]);
})();