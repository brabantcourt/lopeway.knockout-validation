/*globals $,jQuery,ko,console,window*/
$(function () {

    "use strict";

    (function (lopeway, $, undefined) {

        var debugValidationMessages, rules;

        debugValidationMessages = function (validations) {
            if (validations.length > 0) {
                validations.forEach(function (message) {
                    console.debug(message);
                });
            }
        };

        rules = {
            validObject: {
                validator: function (obj, bool) {
                    var result, validations;
                    if (!obj || typeof obj !== "object") {
                        throw "Parameter must be an object";
                    }
                    validations = ko.validation.group(obj)();
                    //debugValidationMessages(validations);
                    result = bool === (validations.length === 0);
                    console.debug("[validObject] %s", result);
                    return result;
                },
                message: "Every property of the object must validate to '{0}'"
            },
            validArray: {
                validator: function (arr, bool) {
                    // filter the observable array for an element
                    // for which there are validation errors
                    // If the results is an empty array, there are no errors in its elements
                    var result;
                    if (!arr || typeof arr !== "object" || !(arr instanceof Array)) {
                        throw "Parameter must be an array";
                    }
                    result = bool === (arr.filter(function (element) {
                        // Create then invoke validation group over each element
                        // If the element's validation group contains error messages
                        // Then return the element as an invalid element
                        var validations;
                        validations = ko.validation.group(ko.utils.unwrapObservable(element))();
                        //debugValidationMessages(validations);
                        return validations.length !== 0;
                    }).length === 0);
                    console.debug("[validArray] %s", result);
                    return result;
                },
                message: "Every element in the array must validate to '{0}'"
            }
        };

        lopeway.validation = lopeway.validation || {};
        lopeway.validation.rules = rules;

    }(window.lopeway = window.lopeway || {}, jQuery));

});