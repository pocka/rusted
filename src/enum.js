import panic from './panic';

import {check_type} from './util';

let factory=function(variants){
	let EnumValue=function(name,data){
		Object.defineProperties(this,{
			'__rusted':{
				value:true,
				writable:false,
				enumerable:false,
				configurable:false
			},
			'__name':{
				value:name,
				writable:false,
				enumerable:false,
				configurable:false
			},
			'__data':{
				value:data,
				writable:false,
				enumerable:false,
				configurable:false
			}
		});
	};

	let Enum={};

	Object.keys(variants).forEach((variant)=>{
		let data=variants[variant];

		if(data===null){
			Object.defineProperty(Enum,variant,{
				get(){
					return new EnumValue(variant);
				},
				enumerable:true,
				configurable:false
			});
		}else{
			Object.defineProperty(Enum,variant,{
				value(value){
					let {match,expected,actual}=check_type(data,value);
					match
						|| panic(`enum arm "${variant}" expects ${expected}, but ${actual} was passed.`) ;
					return new EnumValue(variant,value);
				},
				writable:false,
				enumerable:true,
				configurable:false
			});
		}
	});

	Object.defineProperty(Enum,'prototype',{
		get(){
			return EnumValue.prototype;
		},
		enumerable:false,
		configurable:false
	});

	return Enum;
};

export default factory;
