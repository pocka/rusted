import {is_static_method,is_empty_function} from './util';

let factory=(block)=>{
	let methods=Object.keys(block).map(key=>({key,value:block[key]}));

	let trait={};

	methods.forEach((method)=>{
		Object.defineProperty(trait,method.key,{
			value:{
				is_static:is_static_method(method.value),
				is_empty:is_empty_function(method.value),
				body:method.value
			},
			enumerable:true,
			writable:false,
			configurable:false
		});
	});

	return trait;
};

export default factory;
