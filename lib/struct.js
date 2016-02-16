'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _panic = require('./panic');

var _panic2 = _interopRequireDefault(_panic);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var factory = function factory(def) {
	var prop_info = Object.keys(def).map(function (key) {
		return {
			name: key,
			type: def[key],
			mutable: false
		};
	});

	var struct = function struct(props) {
		var _this = this;

		prop_info.forEach(function (_ref) {
			var name = _ref.name;
			var type = _ref.type;
			var mutable = _ref.mutable;

			name in props || (0, _panic2.default)('Property ' + name + ' does not found');

			var _check_type = (0, _util.check_type)(type, props[name]);

			var match = _check_type.match;
			var expected = _check_type.expected;
			var actual = _check_type.actual;

			match ? Object.defineProperty(_this, name, {
				value: props[name],
				writable: mutable,
				enumerable: true,
				configurable: false
			}) : (0, _panic2.default)('Type mismatched for ' + name + ' ! expected: ' + expected + ', actual: ' + actual);
		});
	};

	var creator = function creator(props) {
		return new struct(props);
	};

	creator.toString = function () {
		var props = prop_info.map(function (prop) {
			return prop.name + ': ' + prop.type;
		}).join(',');
		return 'rusted struct type: {' + props + ' }';
	};

	struct.prototype = creator.prototype;

	return creator;
};

exports.default = factory;
