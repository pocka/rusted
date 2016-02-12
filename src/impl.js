import panic from './panic';

let is_static=(fn)=>{
	return !fn.toString().match(/^function\*?\s[a-zA-Z0-9_$]*\(self/);
};

let impl=(to,what)=>{
	let setter=to.prototype
			? (name,fn)=>{
				is_static(fn)
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
