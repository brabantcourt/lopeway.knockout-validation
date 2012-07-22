#lopeway.knockout-validation

Additional rules for the [KnockoutJS Validation library](https://github.com/ericmbarnard/Knockout-Validation)

The additional rules are:

*	**lopeway.validation.rules.validObject**
*	**lopeway.validation.rules.validArray**

###How to use

####validObject####

```javascript
ko.validation.rules.validObject = lopeway.validation.rules.validObject;
ko.validation.registerExtenders();

viewModel = {
	person: ko.observable({
		name: ko.observable().extend({ required: true }),
		age: ko.observable().extend({ min: 0, max: 120 })
	}.extend({ validObject: true })
};
ko.applyBindings(viewModel);
```

####validArray####

```javascript
ko.validation.rules.validArray = lopeway.validation.rules.validArray;
ko.validation.registerExtenders();

viewModel = {
	person: ko.observableArray([{
		name: ko.observable().extend({ required: true }),
		age: ko.observable().extend({ min: 0, max: 120 })
	}, {
		name: ko.observable().extend({ required: true }),
		age: ko.observable().extend({ min:0, max:120 })
	}].extend({ validArray: true })
};
ko.applyBindings(viewModel);
```

###Examples

A standalone example that uses both rules is at [index.html](https://github.com/brabantcourt/lopeway.knockout-validation/blob/master/index.html)