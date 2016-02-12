'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _panic = require('./panic');

var _panic2 = _interopRequireDefault(_panic);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var impl = function impl(to, what) {
	var setter = to.prototype ? function (name, fn) {
		(0, _util.is_static_method)(fn) ? to[name] = fn : to.prototype[name] = function () {
			return fn.apply({}, [this].concat(Array.prototype.slice.call(arguments, 0)));
		};
	} : (0, _panic2.default)('Cannot implementate to ' + to);

	for (var name in what) {
		setter(name, what[name]);
	}
};

exports.default = impl;
