/*
 * This demo-directive will act as a "show case" for learnings around directives.
 *
 * Good reads about directive link, controller and compile-function
 * - https://stackoverflow.com/questions/15676614/link-vs-compile-vs-controller
 * - https://odetocode.com/blogs/scott/archive/2014/05/28/compile-pre-and-post-linking-in-angularjs.aspx
 *
 * ---- Link, Controller and Compile (pre/post) ----
 *
 * Controller: Attached in the return object {controller:function($scope){}}. Is the first thing that is called. Before any compilation or linking takes places.
 *             The controller does not know anything about the DOM-element which is good to have in mind.
 *
 * Compile: Pre and Post, used to manipulate the DOM-object template before it's copied inside ng-repeat ie. The post-function returns a link-function if needed.
 *
 * Link: Can be used when we don't need to manipulate the DOM before the "copy" of the DOM-element is created. This will give us an opportunity to perform dom-manipulation
 *       for each individual instance of the directive ie changing a class etc.
 *
 * Order of execution:
 *  1) for `@` scope variable, set an observer function and queue it for later, 2) set `@` scope variable to the interpolated value, for = there is "two way binding"
 * - Controller - 
 * - Compile - Pre - Angular has already added the directive template, but has not performed any transclusion or setup the data binding
 *   - Link-function if any
 * - Compile - Post
 *   - Link-function if any
 *  N) observer runs against interpolated value and sets the scope value
 *
 * ------- Controller - controllerAs & bindToController -------
 * The returned directives object can contain settings for controllerAs : 'vm' and bindToController:true in this
 * case the binding (performed as the last step as you can see above) is targeted to the "this" of the controller
 * and not to the scope. This of course means that the scope-variable passed to the compile/link-functions will not
 * contain these values OR get updated when the bound value changes. Also, we can't access the vm from in the link-functions.
 *
 * ------ require -------
 * 
 *
 */
(function() {
    "use strict";

    function demoDirective(http, timeout) {

        // This function demoDirective() is the "entry point" to the directive, it's only called once
        // when the directive is loaded. At this point in the execution-chain we only have
        // injected dependencies from the function-parameters ($http and timeout) to play
        // with so must of the time we do not add any logic directly in this function.

        console.log('demoDirective-function()');

        var linkInternal = function(scope, element, attrs) {

            // This is the "linker"-function that we return from the "compile"-function. The linker-function
            // will be executed once per instance of the directive - after the controller-function.
            // At this point the local scope is interpolated once but it will be interpolated again
            // when the link-function is executed (since we might change DOM-elements) so any changes to the
            // scope is not reflected here

            console.log('demo directive link-function()');

            console.log('Label in linker: ', scope.label);

            // At this point, since we're using bindToController:true - the changes on the scope will not
            // have any impact on the "scope" used in the view since we're using the "this" of the 
            // controller-function (aka vm.foo). We could set values on the scope and read them in a controller
            // function or via a watcher in the controller.
            scope.valueFromLink = 'I was created in the link-function';

        };

        return {
            replace:
                true, // This will replace the <multi-choice/> element from the calling view with the content of the directive.
            scope: {
                //TODO: Example with details and "two way"
                label:
                    '@label', //@ performs "attribute"-binding. If the parent scope changes it'll be reflected, not the other way around. We can still change the local scope but this will be overwritten when/if the parent scope changes.
                info:
                    '@', //if the isolated scope property name is the same as the passed we can just use the @-sign. In this case this would be the same as @info
                moreInfo: '@moreInfo',
                details:
                    '=details', //= performs a "two-way" binding, this directive can change it and it will reflect on the bound object.
                items: '=items',
                onUpdate: '&onUpdate' // & means that we're passing a function
            },
            compile: function(elem, attr, transcludeFn) { // Compile function

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
                    pre: function(scope, elem, attr, controllers, transcludeFn) {
                        // Pre link function
                        console.log('directive compile() pre');
                        //return linkInternal(scope, elem, attr);
                        console.log('label in pre-compile(): ', scope.label);
                        scope.label = 'I was change in pre compile()';

                        scope.label2 = 'label prelink';
                        return linkInternal(scope, elem, attr);
                    },
                    post: function(scope, elem, attr, controllers, transcludeFn) {
                        // Post link function 
                        console.log('directive compile() post');
                        //return linkInternal(scope, elem,attr);
                        scope.label2 = 'label postlink';

                        console.log('label in post-compile(): ', scope.label);
                        scope.label = 'I was change in post compile()';
                        console.log('label after change in post-compile(): ', scope.label);
                        return linkInternal(scope, elem, attr);
                    }
                };
            },
            templateUrl: '/scripts/app/directives/demoDirective/demo.html',
            //link: linkInternal, // Passing a link-function. This is only something we want to do when we're not implementing a compile-function. In this case the function passed here will be used as the "post"-link function.
            controller: [
                '$scope', function(scope) { //passing the $http-variable injected to the directive-function

                    // The controller is the first thing that is called when a individual instance of the 
                    // directive is created. 
                    // At this point the "binding" is not setup so any changes to scope-variables passed as @-attributes will be 
                    // overwritten by the attrs.$observe - function as you can we with scope.label.

                    // If we have "controllerAs" on the returned object we can bind
                    var vm = this;

                    console.log('demoDirective controller started');

                    console.log('vm.label in controller:', vm.label);

                    vm.label = 'hej';

                    console.log('vm.label in controller after change:', vm.label);
                    //scope.label = 'foo';

                    vm.label =
                        scope.label; // This will only copy the value @-binding will no be re-evaluated when the bind-value changes.
                    vm.label2 = 'foo';
                    vm.label3 = 'Set from the controller';

                    vm.onUpdateClicked = function() {
                        console.log('onUpdate was clicked');

                        // trying to call the event-handler from the parent
                        vm.onUpdate({
                            foo: { label: scope.label, info: scope.info },
                            bar: 'I was created in the directive'
                        });

                    };

                }
            ],
            controllerAs:
                'foo', // Gives the controller a name to use in the views. Not that we're using vm. in the controller but 'foo.label' in the view because of this setting.
            bindToController: true // Tells to bind the scope to "foo"
            //template: 'Hallo World' // If we're not using a .html-file we can create the output html as a string here. This would speed up first rendering since we don't need to fetch another html-file.
        };
    }

    angular.module("ngDemo").directive("demoDirective", ['$http', '$timeout', demoDirective]);

})();