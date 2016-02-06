'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var impl = function impl(to, what) {
	var setter = undefined;
	if (typeof to.__impl == 'function') {
		setter = to.__impl;
	} else if (typeof to == 'function') {
		setter = function setter(name, fn) {
			to.prototype[name] = function () {
				return fn.apply({}, [this].concat(Array.prototype.slice.apply(arguments, [0])));
			};
		};
	} else {
		throw new Error('Cannot implementate to ' + to);
	}

	for (var name in what) {
		setter(name, what[name]);
	}
};

exports.default = impl;
