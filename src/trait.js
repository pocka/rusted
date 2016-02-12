import {is_empty_function} from './util';

let factory=(block)=>{
	let methods=Object.keys(block).map(key=>({key,value:block[key]}));

	let trait={};

	methods.forEach((method)=>{
		Object.defineProperty(trait,method.key,{
			value:method.value,
			enumerable:true,
			writable:false,
			configurable:false
		});
	});

	return trait;
};

export default factory;
