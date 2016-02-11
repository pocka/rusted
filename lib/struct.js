'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _panic = require('./panic');

var _panic2 = _interopRequireDefault(_panic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var check_type = function check_type(type, value) {
	var is_constructor = typeof type == 'function',
	    expected = type,
	    actual = is_constructor ? value.constructor : typeof value === 'undefined' ? 'undefined' : _typeof(value);
	return {
		match: type == 'any' || expected == actual,
		expected: type,
		actual: actual
	};
};

var factory = function factory(def) {
	var prop_info = Object.entries(def).map(function (_ref) {
		var _ref2 = _slicedToArray(_ref, 2);

		var key = _ref2[0];
		var value = _ref2[1];

		return {
			name: key,
			type: value,
			mutable: false
		};
	});

	var struct = function struct(props) {
		var _this = this;

		prop_info.forEach(function (_ref3) {
			var name = _ref3.name;
			var type = _ref3.type;
			var mutable = _ref3.mutable;

			name in props || (0, _panic2.default)('Property ' + name + ' does not found');

			var _check_type = check_type(type, props[name]);

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
