import uid from 'uid';

let EnumCreator=(variants)=>{
	return new Enum(variants);
};

let Enum=function(variants){
	let EnumValue=function(name,data){
		Object.defineProperties(this,{
			'__id':{
				value:uid(),
				writable:false,
				enumerable:false
			},
			'__name':{
				value:name,
				writable:false,
				enumerable:false
			},
			'__data':{
				value:data,
				writable:false,
				enumerable:false
			}
		});
	};

	Object.defineProperty(EnumValue.prototype,'__rusted',{
		value:true,
		writable:false,
		enumerable:false
	});

	Object.defineProperty(this,'__impl',{
		value(name,fn){
			EnumValue.prototype[name]=function(){
				return fn.apply({},[this].concat(Array.prototype.slice.apply(arguments,[0])));
			};
		},
		writable:false,
		enumerable:false
	});

	for(let variant in variants){
		let data=variants[variant];

		if(data===null){
			Object.defineProperty(this,variant,{
				get(){
					return new EnumValue(variant,data);
				},
				enumerable:true
			});
		}else{
			Object.defineProperty(this,variant,{
				value(data){
					return new EnumValue(variant,data);
				},
				writable:false,
				enumerable:true
			});
		}
	}
};

export default EnumCreator;

export {Enum};
