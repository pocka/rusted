import panic from './panic';

import {Trait} from './trait';

import {is_static_method,is_empty_function} from './util';

let impl=function(/*trait?, target, block*/){
	let trait=arguments[0] instanceof Trait
			? arguments[0]
			: null ,
		target=trait
			? arguments[1]
			: arguments[0] ,
		block=trait
			? arguments[2]
			: arguments[1] ;

	let setter=target.prototype
			? (name,fn)=>{
				is_static_method(fn)
					? (target[name]=fn)
					: (target.prototype[name]=function(){
						return fn.apply({},[this].concat(Array.prototype.slice.call(arguments,0)));
					});
			}
			: panic(`Cannot implementate to ${target}`) ;

	trait
		? Object.keys(trait).forEach((name)=>{
			block && name in block
				? setter(name,block[name])
				: (is_empty_function(trait[name])
					? panic(`A selected trait needs to implementate method [${name}] !`)
					: setter(name,trait[name])
				);
		})
		: Object.keys(block).forEach((name)=>{
			setter(name,block[name]);
		});
};

export default impl;
