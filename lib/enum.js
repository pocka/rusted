'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _panic = require('./panic');

var _panic2 = _interopRequireDefault(_panic);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var factory = function factory(variants) {
	var EnumValue = function EnumValue(name, data) {
		Object.defineProperties(this, {
			'__rusted': {
				value: true,
				writable: false,
				enumerable: false,
				configurable: false
			},
			'__name': {
				value: name,
				writable: false,
				enumerable: false,
				configurable: false
			},
			'__data': {
				value: data,
				writable: false,
				enumerable: false,
				configurable: false
			}
		});
	};

	Object.keys(variants).forEach(function (variant) {
		var data = variants[variant];

		if (data === null) {
			Object.defineProperty(EnumValue, variant, {
				get: function get() {
					return new EnumValue(variant);
				},

				enumerable: true,
				configurable: false
			});
		} else {
			Object.defineProperty(EnumValue, variant, {
				value: function value(_value) {
					var _check_type = (0, _util.check_type)(data, _value);

					var match = _check_type.match;
					var expected = _check_type.expected;
					var actual = _check_type.actual;

					match || (0, _panic2.default)('enum arm "' + variant + '" expects ' + expected + ', but ' + actual + ' was passed.');
					return new EnumValue(variant, _value);
				},

				writable: false,
				enumerable: true,
				configurable: false
			});
		}
	});

	return EnumValue;
};

exports.default = factory;
