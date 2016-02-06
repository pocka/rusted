'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Enum = undefined;

var _uid = require('uid');

var _uid2 = _interopRequireDefault(_uid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EnumCreator = function EnumCreator(variants) {
	return new Enum(variants);
};

var Enum = function Enum(variants) {
	var _this = this;

	var EnumValue = function EnumValue(name, data) {
		Object.defineProperties(this, {
			'__id': {
				value: (0, _uid2.default)(),
				writable: false,
				enumerable: false
			},
			'__name': {
				value: name,
				writable: false,
				enumerable: false
			},
			'__data': {
				value: data,
				writable: false,
				enumerable: false
			}
		});
	};

	Object.defineProperty(EnumValue.prototype, '__rusted', {
		value: true,
		writable: false,
		enumerable: false
	});

	Object.defineProperty(this, '__impl', {
		value: function value(name, fn) {
			EnumValue.prototype[name] = function () {
				return fn.apply({}, [this].concat(Array.prototype.slice.apply(arguments, [0])));
			};
		},

		writable: false,
		enumerable: false
	});

	var _loop = function _loop(variant) {
		var data = variants[variant];

		if (data === null) {
			Object.defineProperty(_this, variant, {
				get: function get() {
					return new EnumValue(variant, data);
				},

				enumerable: true
			});
		} else {
			Object.defineProperty(_this, variant, {
				value: function value(data) {
					return new EnumValue(variant, data);
				},

				writable: false,
				enumerable: true
			});
		}
	};

	for (var variant in variants) {
		_loop(variant);
	}
};

exports.default = EnumCreator;
exports.Enum = Enum;
