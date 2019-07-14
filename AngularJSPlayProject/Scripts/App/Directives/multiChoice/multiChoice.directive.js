// https://weblogs.asp.net/dwahlin/creating-custom-angularjs-directives-part-6-using-controllers
(function () {
    "use strict";

    function demoDirectiveWV($http) {

        var link = function (scope, element, attrs) {

            function setupLocalModel() {

                // first, add one item per setting item
                if (!angular.isArray(scope.localItems)) {

                    scope.localItems = [];

                    angular.forEach(scope.items, function (item, index) {

                        scope.localItems.push({
                            id: item.id.toString(),
                            name: item.name,
                            selected: false
                        });

                    });

                }

                var modelItem = scope.model;

                if (angular.isDefined(modelItem) && modelItem != null) {

                    // has values, split string into array
                    var arrValues = modelItem.split(',');

                    angular.forEach(scope.localItems, function (item, index) {

                        if (arrValues.indexOf(item.id) > -1) {
                            item.selected = true;
                        } else {
                            item.selected = false;
                        }

                    });

                }
                else {
                    angular.forEach(scope.localItems, function (item, index) {
                        item.selected = false;
                    });
                }

            };

            scope.filter = {
                name: ''
            };

            scope.updateModel = function () {

                var modelValue = '';

                angular.forEach(scope.localItems, function (item, key) {
                    if (item.selected) {
                        modelValue += item.id + ',';
                    }
                });

                // Remove last comma if modelValue has any data
                if (modelValue.length > 0) {
                    modelValue = modelValue.substring(0, modelValue.length - 1);
                }

                scope.model = modelValue;

            };

            scope.$watch('localItems', function () {
                scope.updateModel();
            }, true); // True here means to watch the whole object for changes

            scope.$watch('model', function () {
                setupLocalModel();
            }, true); // True here means to watch the whole object for changes

            setupLocalModel();

        };

        return {
            restrict: 'E',
            replace: true,
            scope: {
                model: '=model',
                items: '<items'
            },
            templateUrl: '/scripts/app/directives/multiChoice/multiChoice.html',
            link: link
        };
    }

    angular.module("ngDemo").directive("multiChoice", ['$http', demoDirectiveWV]);

})();

