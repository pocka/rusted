import panic from './panic';

import {is_static_method} from './util';

let impl=(to,what)=>{
	let setter=to.prototype
			? (name,fn)=>{
				is_static_method(fn)
					? (to[name]=fn)
					: (to.prototype[name]=function(){
						return fn.apply({},[this].concat(Array.prototype.slice.call(arguments,0)));
					});
			}
			: panic(`Cannot implementate to ${to}`) ;

	for(let name in what){
		setter(name,what[name]);
	}
};

export default impl;
