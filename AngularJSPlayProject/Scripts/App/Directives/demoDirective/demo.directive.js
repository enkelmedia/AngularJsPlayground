
(function() {
    "use strict";

    function demoDirective($http) {

        // This function works as a "controller" for the directive
        var linkInternal = function(scope, element, attrs) {

            console.log('demo directive link');

            scope.valueFromLink = 'I was created in the link-function';

            scope.onUpdateClicked = function() {
                console.log('onUpdate was clicked');

                // trying to call the event-handler from the parent
                scope.onUpdate({
                    foo: { label: scope.label, info: scope.info },
                    bar : 'I was created in the directive'
                });

            };

        };

        return {
            replace:
                true, // This will replace the <multi-choice/> element from the calling view with the content of the directive.
            scope: {
                //TODO: Example with details and "two way"
                label: '@label', //@ performs "attribute"-binding. If the parent scope changes it'll be reflected, not the other way around. We can still change the local scope but this will be overwritten when/if the parent scope changes.
                info: '@', //if the isolated scope property name is the same as the passed we can just use the @-sign. In this case this would be the same as @info
                moreInfo: '@moreInfo',
                details: '=details',
                items: '=items', //= performs a "two-way" binding, this directive can change it and it will reflect outside changes
                onUpdate: '&onUpdate'
            },
            templateUrl: '/scripts/app/directives/demoDirective/demo.html',
            link: linkInternal
            //template: 'Hallo World'
        };
    }

    angular.module("ngDemo").directive("demoDirective", ['$http', demoDirective]);

})();