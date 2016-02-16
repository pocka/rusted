'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var js_type = {
	number: 'number',
	string: 'string',
	object: 'object',
	'undefined': 'undefined',
	bool: 'boolean',
	symbol: 'symbol',
	fn: 'function',
	array: Array
};

var alias = {
	u8: js_type.number,
	u16: js_type.number,
	u32: js_type.number,
	u64: js_type.number,
	i8: js_type.number,
	i16: js_type.number,
	i32: js_type.number,
	i64: js_type.number,
	f32: js_type.number,
	f64: js_type.number,
	usize: js_type.number,
	isize: js_type.number,
	char: js_type.string,
	str: js_type.string,
	any: 'any'
};

exports.default = alias;
