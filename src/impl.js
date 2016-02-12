import panic from './panic';

let impl=(to,what)=>{
	let setter=to.prototype
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
