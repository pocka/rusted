'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _panic = require('./panic');

var _panic2 = _interopRequireDefault(_panic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var is_static = function is_static(fn) {
	return !fn.toString().match(/^function\*?\s[a-zA-Z0-9_$]*\(self/);
};

var impl = function impl(to, what) {
	var setter = to.prototype ? function (name, fn) {
		is_static(fn) ? to[name] = fn : to.prototype[name] = function () {
			return fn.apply({}, [this].concat(Array.prototype.slice.call(arguments, 0)));
		};
	} : (0, _panic2.default)('Cannot implementate to ' + to);

	for (var name in what) {
		setter(name, what[name]);
	}
};

exports.default = impl;
