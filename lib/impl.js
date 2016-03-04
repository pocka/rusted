'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _panic = require('./panic');

var _panic2 = _interopRequireDefault(_panic);

var _trait = require('./trait');

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var impl = function impl() /*trait?, target, block*/{
	var trait = arguments[0] instanceof _trait.Trait ? arguments[0] : null,
	    target = trait ? arguments[1] : arguments[0],
	    block = trait ? arguments[2] : arguments[1];

	var setter = target.prototype ? function (name, fn) {
		name[0] === '$' ? target[(0, _util.format_static_method_name)(name)] = fn : target.prototype[name] = function () {
			return fn.apply({}, [this].concat(Array.prototype.slice.call(arguments, 0)));
		};
	} : (0, _panic2.default)('Cannot implementate to ' + target);

	trait ? Object.keys(trait).forEach(function (name) {
		block && name in block ? setter(name, block[name]) : (0, _util.is_empty_function)(trait[name]) ? (0, _panic2.default)('A selected trait needs to implementate method [' + name + '] !') : setter(name, trait[name]);
	}) : Object.keys(block).forEach(function (name) {
		setter(name, block[name]);
	});
};

exports.default = impl;
