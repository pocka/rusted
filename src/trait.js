let Trait=function(){
};

let factory=(block)=>{
	let trait=new Trait();

	for(let name in block){
		Object.defineProperty(trait,name,{
			value:block[name],
			enumerable:true,
			writable:false,
			configurable:false
		});
	}

	return trait;
};

export default factory;

export {Trait};
