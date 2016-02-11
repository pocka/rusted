import panic from './panic';

let impl=(to,what)=>{
	let setter=typeof to.__impl=='function'
			? to.__impl
		: to.prototype
			? (name,fn)=>{
				to.prototype[name]=function(){
					return fn.apply({},[this].concat(Array.prototype.slice.call(arguments,0)));
				};
			}
			: panic(`Cannot implementate to ${to}`) ;

	for(let name in what){
		setter(name,what[name]);
	}
};

export default impl;
