let impl=(to,what)=>{
	let setter;
	if(typeof to.__impl=='function'){
		setter=to.__impl;
	}else if(to.prototype){
		setter=(name,fn)=>{
			to.prototype[name]=function(){
				return fn.apply({},[this].concat(Array.prototype.slice.apply(arguments,[0])));
			};
		}
	}else{
		throw new Error(`Cannot implementate to ${to}`);
	}

	for(let name in what){
		setter(name,what[name]);
	}
};

export default impl;
