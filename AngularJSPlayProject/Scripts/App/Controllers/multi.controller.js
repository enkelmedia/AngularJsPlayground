(function() {
    "use strict";

    function Controller(http) {

        var vm = this;
        vm.foo = "Bar";
        vm.selected = "";
        vm.items = [
            { id: 0, name: 'Foo' },
            { id: 1, name: 'Var' },
            { id: 2, name: 'Kalle' },
            { id: 3, name: 'Lorem' },
            { id: 4, name: 'Göran' },
            { id: 5, name: 'Sven' },
            { id: 6, name: 'Louise' },
            { id: 7, name: 'Mackan' },
            { id: 8, name: 'Bar' },
            { id: 9, name: 'Octo' },
            { id: 10, name: 'Mess' }
            ];

    }

    angular.module("ngDemo").controller("multiController", ['$http', Controller]);
})();