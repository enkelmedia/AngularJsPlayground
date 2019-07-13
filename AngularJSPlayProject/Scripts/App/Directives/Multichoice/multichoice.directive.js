
(function () {
    "use strict";

    function demoDirective($http) {

        return {
            template: 'Hallo World'
        };
    }

    angular.module("ngDemo").directive("demoDirective", ['$http', demoDirective]);

})();

