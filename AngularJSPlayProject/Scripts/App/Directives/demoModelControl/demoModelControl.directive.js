(function() {
    "use strict";

    function directive() {

        return {
            scope: {
                model: '=ngModel'
            },
            templateUrl: '/Scripts/App/Directives/demoModelControl/demoModelControl.html',
            controller: [
                '$scope', function(scope) {

                    scope.add = function() {
                        scope.model++;
                    };

                    scope.subtract = function() {
                        scope.model--;
                    };

                }
            ]
        };
    };

    angular.module('ngDemo').directive('demoModelControl', directive);

})();