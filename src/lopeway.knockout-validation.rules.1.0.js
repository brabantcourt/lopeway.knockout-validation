/*globals $,jQuery,ko,console,window*/
$(function () {

    "use strict";

    (function (lopeway, $, undefined) {

        var debugValidationMessages, rules;

        rules = {
            validObject: {
                validator: function (obj, bool) {
                    if (!obj || typeof obj !== "object") {
                        throw "Parameter must be an object";
                    }
                    return bool === (ko.validation.group(obj)().length === 0);
                },
                message: "Every property of the object must validate to '{0}'"
            },
            validArray: {
                validator: function (arr, bool) {
                    // filter the observable array for an element
                    // for which there are validation errors
                    // If the results is an empty array, there are no errors in its elements
                    if (!arr || typeof arr !== "object" || !(arr instanceof Array)) {
                        throw "Parameter must be an array";
                    }
                    return bool === (arr.filter(function (element) {
                        // Create then invoke validation group over each element
                        // If the element's validation group contains error messages
                        // Then return the element as an invalid element
                        var validations;
                        validations = ko.validation.group(ko.utils.unwrapObservable(element))();
                        return validations.length !== 0;
                    }).length === 0);
                },
                message: "Every element in the array must validate to '{0}'"
            }
        };

        lopeway.validation = lopeway.validation || {};
        lopeway.validation.rules = rules;

    }(window.lopeway = window.lopeway || {}, jQuery));

});