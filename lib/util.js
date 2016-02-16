'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.is_static_method = is_static_method;
exports.is_empty_function = is_empty_function;
exports.check_type = check_type;
function is_static_method(fn) {
	return !fn.toString().match(/^function\*?\s*[a-zA-Z0-9_$]*\(self[),\s]/);
}

function is_empty_function(fn) {
	return !!fn.toString().match(/^function\*?\s*[a-zA-Z0-9_$]*\([^)]*\)\s*{}$/);
}

function check_type(type, value) {
	var is_constructor = typeof type === 'function',
	    expected = type,
	    actual = is_constructor ? value.constructor : typeof value === 'undefined' ? 'undefined' : _typeof(value);
	return {
		match: type === 'any' || expected === actual,
		expected: type,
		actual: actual
	};
}
