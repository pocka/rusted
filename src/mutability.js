export function Mutability(data,mut){
	Object.defineProperties(this,{
		mutable:{
			value:mut,
			writable:false,
			configurable:false,
			enumerable:true
		},
		data:{
			value:data,
			writable:false,
			configurable:false,
			enumerable:true
		}
	});
}

export function mut(data){
	return new Mutability(data,true);
}

export function imm(data){
	return new Mutability(data,false);
}
