import Enum from './enum';
import impl from './impl';
import match from './match';
import {Ok,Err} from './result';

let Option=Enum({
	Some:true,
	None:null
});

let {Some,None}=Option;

impl(Option,{
	is_some(self){
		return match(self,{
			Some:true,
			None:false
		});
	},
	is_none(self){
		return !self.is_some();
	},
	expect(self,msg){
		return match(self,{
			Some:val=>val,
			None:()=>expect_failed(msg)
		});
	},
	unwrap(self){
		return match(self,{
			Some:val=>val,
			None:()=>{throw new Error('called `Option::unwrap()` on a `None` value')}
		});
	},
	unwrap_or(self,def){
		return match(self,{
			Some:x=>x,
			None:()=>def
		});
	},
	unwrap_or_else(self,f){
		return match(self,{
			Some:x=>x,
			None:()=>f()
		});
	},
	map(self,f){
		return match(self,{
			Some:x=>Some(f(x)),
			None:()=>None
		});
	},
	map_or(self,def,f){
		return match(self,{
			Some:t=>f(t),
			None:()=>def
		});
	},
	map_or_else(self,def,f){
		return match(self,{
			Some:t=>f(t),
			None:()=>def()
		});
	},
	ok_or(self,err){
		return match(self,{
			Some:v=>Ok(v),
			None:()=>Err(err)
		});
	},
	ok_or_else(self,err){
		return match(self,{
			Some:v=>Ok(v),
			None:()=>Err(err())
		});
	},
	and(self,optb){
		return match(self,{
			Some:_=>optb,
			None:()=>None
		});
	},
	and_then(self,f){
		return match(self,{
			Some:x=>f(x),
			None:()=>None
		});
	},
	or(self,optb){
		return match(self,{
			Some:_=>self,
			None:()=>optb
		});
	},
	or_else(self,f){
		return match(self,{
			Some:_=>self,
			None:()=>f()
		});
	},
	//take(self){
	//},
	//cloned(self){
	//},
	//unwrap_or_default(self){
	//},
});

let expect_failed=(msg)=>{
	throw new Error(msg);
};

export {Some,None,Option};
