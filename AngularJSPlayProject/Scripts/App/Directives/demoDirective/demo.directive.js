
(function () {
    "use strict";

    function demoDirective($http) {

        return {
            replace:true, // This will replace the <multi-choice/> element from the calling view with the content of the directive.
            scope: {
                label: '@label', //@ performs "attribute"-binding. If the parent scope changes it'll be reflected, not the other way around. We can still change the local scope but this will be overwritten when/if the parent scope changes.
                info: '@', //if the isolated scope property name is the same as the passed we can just use the @-sign. In this case this would be the same as @info
                moreInfo: '@moreInfo',
                details : '=details',
                items: '=items', //= performs a "two-way" binding, this directive can change it and it will reflect outside changes
                onUpdate : '&onUpdate'
            },
            templateUrl: '/scripts/app/directives/demoDirective/demo.html'
            //template: 'Hallo World'
        };
    }

    angular.module("ngDemo").directive("demoDirective", ['$http', demoDirective]);

})();

