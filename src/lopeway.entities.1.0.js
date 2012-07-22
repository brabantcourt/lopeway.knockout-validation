/*globals $,jQuery,console,ko,lopeway,window*/
$(function () {

    "use strict";

    (function (lopeway, $, undefined) {

        var Address, Name, Person;

        Address = (function () {
            function Address() {
                this.street1 = ko.observable();
                this.street2 = ko.observable();
                this.city = ko.observable();
                this.statecounty = ko.observable();
                this.postalcode = ko.observable();
                this.country = ko.observable();
            }
            return Address;
        }());
        Name = (function () {
            function Name() {
                this.first = ko.observable().extend({ required: { message: "Please provide a first name." } });
                this.last = ko.observable().extend({ required: { message: "Please provide a last name." } });
            }
            Name.prototype.equals = function (that) {
                return this.first === that.first && this.last === that.last;
            };
            return Name;
        }());
        Person = (function () {
            function Person() {
                this.name = ko.observable(new Name()).extend({ validObject: true });
                this.email = ko.observable().extend({ required: { message: "Please provide an email address." }, email: true });
                this.age = ko.observable().extend({ required: { message: "Please provide a value for age." } }).extend({ min: 0 }).extend({ max: 120 });
                this.address = new Address();
            }
            Person.prototype.toString = function () {
            };
            return Person;
        }());

        lopeway.entities = lopeway.entities || {};

        lopeway.entities.Address = Address;
        lopeway.entities.Name = Name;
        lopeway.entities.Person = Person;

    }(window.lopeway = window.lopeway || {}, jQuery));

});