export function is_static_method(fn){
	return !fn.toString().match(/^function\*?\s*[a-zA-Z0-9_$]*\(self[),\s]/);
}

export function is_empty_function(fn){
	return !!fn.toString().match(/^function\*?\s*[a-zA-Z0-9_$]*\([^)]*\)\s*{}$/);
}

export function check_type(type,value){
	let is_constructor=typeof type==='function',
		expected=type,
		actual=is_constructor
			? value.constructor
			: typeof value ;
	return {
		match:type==='any'||expected===actual,
		expected:type,
		actual:actual
	};
}
