export function is_static_method(fn){
	return !fn.toString().match(/^function\*?\s*[a-zA-Z0-9_$]*\(self\)/);
};

export function is_empty_function(fn){
	return !!fn.toString().match(/^function\*?\s*[a-zA-Z0-9_$]*\([^)]*\)\s*{}$/);
};
