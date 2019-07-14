// This is called a "self calling function"
(function() {
    "use strict"; // Activates "string mode" for JS-execution https://www.w3schools.com/js/js_strict.asp

    function demoDr() {

        // returning the "directive definition object"
        return {
            require: '?^demoDirective',
            template: '<p>Hallo from demoDirectiveRequire</p><button ng-click="btnClicked()">Foo</button>',
            link: function (scope, elem, attr, controller) {

                console.log('linker-controller:', controller);

                scope.btnClicked = function() {
                    console.log('btn clicked in require-directive');

                    // this will trigger the onUpdateClick on the demoDirective-controller
                    controller.onUpdateClicked();
                };
            }
        };
    }

    angular.module("ngDemo").directive('demoDirectiveRequire', [demoDr]);

})();