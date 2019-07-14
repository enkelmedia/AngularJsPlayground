(function() {
    "use strict";

    function mjRepeat() {

        return {
            restrict: 'A',
            compile: function(elem, attr, transcludeFn) {

                var node = document.createElement("p");
                node.innerHTML = 'Appended from compile()-function in directive. {{item.name}}';
                elem.append(node);

                var parent = elem[0].parentNode;

                var updateList = function(scope) {

                    // remove all children in the list
                    var child = parent.lastElementChild;
                    console.log('child:', child);
                    while (child) {
                        parent.removeChild(child);
                        child = parent.lastElementChild;
                    } 

                    angular.forEach(scope.items, function (item, index) {

                        // get the parent
                        console.log(index);
                        console.log(item);

                        var node = document.createElement(elem[0].tagName);
                        node.innerHTML = 'Row ' + index + ', name: ' + scope.items[index].name;
                        parent.append(node);

                    });
                };

                return {
                    pre: function (scope, elem, attrs) {
                        // here we have the scope and we can create one element per i
                        console.log('pre');
                        console.log(elem);
                            
                        updateList(scope);

                        scope.$watch('items', function (nVal, old) {
                            console.log('items changed to', nVal);
                            console.log('elem val', elem);
                            updateList(scope, elem[0].parentNode);
                        },true);

                    },
                    post: function(scope, elem, attr) {

                        

                        //var node = document.createElement("p");
                        //node.innerHTML = 'Appended from postlink()-function in directive. {{name}}';
                        //elem.append(node);
                    }
                };
            },
            scope: {
                items: '=mjRepeat' // bind this to the attribute-usage.
            },
            template: '<p>Hallo from MjRepeat {{name}}, count: {{items.length}}</p>'
        };
    }

    angular.module("ngDemo").directive('mjRepeat', [mjRepeat]);

})();
