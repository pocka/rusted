"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.is_static_method = is_static_method;
exports.is_empty_function = is_empty_function;
function is_static_method(fn) {
	return !fn.toString().match(/^function\*?\s*[a-zA-Z0-9_$]*\(self[),\s]/);
};

function is_empty_function(fn) {
	return !!fn.toString().match(/^function\*?\s*[a-zA-Z0-9_$]*\([^)]*\)\s*{}$/);
};
