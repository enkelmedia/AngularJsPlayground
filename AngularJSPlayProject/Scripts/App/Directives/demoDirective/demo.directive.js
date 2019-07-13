/*
 * This demo-directive will act as a "show case" for learnings around directives.
 *
 * Good reads about directive link, controller and compile-function
 * - https://stackoverflow.com/questions/15676614/link-vs-compile-vs-controller
 * - https://odetocode.com/blogs/scott/archive/2014/05/28/compile-pre-and-post-linking-in-angularjs.aspx
 *
 * -- Link, Controller and Compile (pre/post) --
 * Controller: Attached in the return object {controller:function($scope){}}. Is the first thing that is called. Before any compilation or linking takes placed.
 * Compile: Pre and Post, used to manipulate the DOM-object template before it's copied inside ng-repeat ie. The post-function returns a link-function if needed.
 * Link: Can be used when we don't need to manipulate the DOM before the "copy" of the DOM-element is created.
 *
 * Order of execution:
 * - Controller - 
 * - Compile - Pre - Angular has already added the directive template, but has not performed any transclusion or setup the data binding
 *   - Link-function if any
 * - Compile - Post
 *   - Link-function if any
 */
(function() {
    "use strict";

    function demoDirective($http, bengt) {

        // This function works as a "controller" for the directive
        var linkInternal = function(scope, element, attrs) {

            console.log('demo directive link');

            scope.valueFromLink = 'I was created in the link-function';
            scope.label = 'Markus foo';
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
            compile: function (elem, attr, transcludeFn) { // Compile function

                console.log('directive: compile()', elem);
                // This compile-function is called just once "per page", this gives us a chance
                // to manipulate the content of the elem (the DOM element for the directive)
                // this happens before any transclusion (sammanfogning) or bindings are setup

                // See here, we're appending a html-element including a binding to {{label}} this will 
                // be bound and updated just as if this was included in the template-string or .html-file.
                var node = document.createElement("p");
                node.innerHTML = 'Appended from compile()-function in directive. {{label}}';
                elem.append(node);
                
                return { // Must return an object
                    pre : function(scope, elem, attr, controllers, transcludeFn) {
                        // Pre link function 
                        console.log('directive compile() pre');
                        //return linkInternal(scope, elem, attr);
                        scope.label2 = 'label prelink';
                        return linkInternal(scope, elem, attr);
                    },
                    post : function(scope, elem, attr, controllers, transcludeFn) {
                        // Post link function 
                        console.log('directive compile() post');
                        //return linkInternal(scope, elem,attr);
                        scope.label2 = 'label postlink';
                        return linkInternal(scope, elem, attr);
                    }
                };
            },
            templateUrl: '/scripts/app/directives/demoDirective/demo.html',
            link: linkInternal,
            controller: function($scope) { //passing the $http-variable injected to the directive-function

                console.log('controller started');

                $scope.label = 'hej';

                bengt(function() {
                    $scope.label = 'hej2';
                }, 1000);

            }
            //template: 'Hallo World'
        };
    }

    angular.module("ngDemo").directive("demoDirective", ['$http', '$timeout', demoDirective]);

})();