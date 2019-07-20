/*
 * Spännande guide om custom validation för AngularJS (tex "adult" eller "country"): http://techfunda.com/howto/560/custom-validation-directive
 *
 * https://stackoverflow.com/questions/32753370/angularjs-custom-form-validator-for-custom-directive-form-controls
 */

(function () {
    "use strict";

    function directive($parse) {

        return {
            require: "?ngModel", // This and the ngModel.$setViewValue(modelValue) fixes the validation with angular
            scope: {
                model: '=ngModel'
            },
            templateUrl: '/Scripts/App/Directives/demoModelControl/demoModelControl.html',
            link: function (scope, elem, attr, ngModelCtrl) {

                scope.internalModel = scope.model;

               
                function setModelValue(newVal) {
                    
                    scope.internalModel = newVal;

                    ngModelCtrl.$setViewValue(newVal);
                    
                }

                // Copied from the AngularJS-src
                var isNumberNaN = Number.isNaN || function isNumberNaN(num) {
                    // eslint-disable-next-line no-self-compare
                    return num !== num;
                };

                // Copied from the AngularJS-src
                function parseNumberAttrVal(val) {
                    if (angular.isDefined(val) && !angular.isNumber(val)) {
                        val = parseFloat(val);
                    }
                    return !isNumberNaN(val) ? val : undefined;
                }

                scope.add = function () {

                    setModelValue(scope.internalModel + 1);
                };

                scope.subtract = function() {
                    setModelValue(scope.internalModel - 1);
                };

                ngModelCtrl.$render = function () {
                    // This method is called by the ngModelController when the value is changed from the outside.
                    // here we can update our internal state for this property.
                    scope.internalModel = ngModelCtrl.$viewValue;
                };

                // This was used internally by angular to parse a reference passed to the max/min-attributes, since we have a isolated scope here
                // we need to use the scope.$parent scope to parse this value.
                console.log('CustomParse', $parse("vm.customMax")(scope.$parent));
                
                /*
                 * Validation
                 * Some validation-attributes (ie required and max-length, min-length) are global to all elements with "ng-model" but we can also add support for
                 * more specific types of validation, ie the min/max attributes for a <input type="number"/>, in AngularJS-core this is done here:
                 * https://github.com/angular/angular.js/blob/65f800e19ec669ab7d5abbd2f6b82bf60110651a/src/ng/directive/input.js#L1724
                 * Search for numberInputType if the line number is not right.
                 *
                 * For this custom directive this means that we would need to create these validators on the ngModelController passed by the "required" property
                 * on the Directive Definition Object that this directive returns.
                 *
                 */
                
                // Min-validation
                var parsedMinVal;
                if (angular.isDefined(attr.min) || attr.ngMin) {

                    // This will either take the min="12"-value or the ng-min="model.prop"-value and use $parse() to get the value from the parent scope.
                    var minVal = attr.min || $parse(attr.ngMin)(scope.$parent);
                    parsedMinVal = parseNumberAttrVal(minVal);

                    ngModelCtrl.$validators.min = function (modelValue, viewValue) {
                        return ngModelCtrl.$isEmpty(viewValue) || angular.isUndefined(parsedMinVal) || viewValue >= parsedMinVal;
                    };

                    // We need this since the min-value might be bound to something
                    attr.$observe('min', function (val) {
                        if (val !== minVal) {
                            parsedMinVal = parseNumberAttrVal(val);
                            minVal = val;
                            // Trigger a new validation
                            ngModelCtrl.$validate();
                        }
                    });
                }

                // Max validation
                if (angular.isDefined(attr.max) || attr.ngMax) {
                    console.log('ngmax: ', attr.ngMax);
                    console.log('ngmax-parse', $parse("vm.customMax")(scope.$parent));

                    // This will either take the max="12"-value or the ng-max="model.prop"-value and use $parse() to get the value from the parent scope.
                    var maxVal = attr.max || $parse(attr.ngMax)(scope.$parent);
                    console.log('maxVal: ', maxVal);

                    var parsedMaxVal = parseNumberAttrVal(maxVal);
                    console.log('parsedMaxVal: ', parsedMaxVal);

                    ngModelCtrl.$validators.max = function (modelValue, viewValue) {
                        return ngModelCtrl.$isEmpty(viewValue) || angular.isUndefined(parsedMaxVal) || viewValue <= parsedMaxVal;
                    };

                    attr.$observe('max', function (val) {
                        console.log('$observe:max');
                        if (val !== maxVal) {    
                            console.log('$observe:max:inner-if');
                            parsedMaxVal = parseNumberAttrVal(val);
                            maxVal = val;
                            // Trigger a new validation
                            ngModelCtrl.$validate();
                        }
                    });
                }

                // Custom validation for must-be-even="true"
                if (attr.mustBeEven || attr.ngMustBeEven) {

                    var mustBeEven = attr.mustBeEven == 'true' || $parse(attr.ngMustBeEven)(scope.$parent);

                    var isEven = function(n) {
                        return n % 2 == 0;
                    };

                    if (mustBeEven) {

                        ngModelCtrl.$validators.mustBeEven = function (modelValue, viewValue) {
                            return ngModelCtrl.$isEmpty(viewValue) || isEven(viewValue);
                        };

                    }
                    
                    console.log('has attribute');

                }

            }
            
        };
    };

    angular.module('ngDemo').directive('demoModelControl', ['$parse',directive]);

})();