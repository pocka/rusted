import Enum from './enum';
import impl from './impl';
import match from './match';
import {Some,None} from './option';
import panic from './panic';
import type from './type';

let Result=Enum({
	Ok:type.any,
	Err:type.any
});

let {Ok,Err}=Result;

impl(Result,{
	is_ok(self){
		return match(self,{
			Ok:true,
			Err:false
		});
	},
	is_err(self){
		return !self.is_ok();
	},
	ok(self){
		return match(self,{
			Ok:x=>Some(x),
			Err:_=>None
		});
	},
	err(self){
		return match(self,{
			Ok:_=>None,
			Err:x=>Some(x)
		});
	},
	map(self,op){
		return match(self,{
			Ok:t=>Ok(op(t)),
			Err:e=>Err(e)
		});
	},
	map_err(self,op){
		return match(self,{
			Ok:t=>Ok(t),
			Err:e=>Err(op(e))
		});
	},
	//iter(self){
	//},
	and(self,res){
		return match(self,{
			Ok:_=>res,
			Err:e=>Err(e)
		});
	},
	and_then(self,op){
		return match(self,{
			Ok:t=>op(t),
			Err:e=>Err(e)
		});
	},
	or(self,res){
		return match(self,{
			Ok:v=>Ok(v),
			Err:_=>res
		});
	},
	or_else(self,op){
		return match(self,{
			Ok:t=>Ok(t),
			Err:e=>op(e)
		});
	},
	unwrap_or(self,optb){
		return match(self,{
			Ok:t=>t,
			Err:_=>optb
		});
	},
	unwrap_or_else(self,op){
		return match(self,{
			Ok:t=>t,
			Err:e=>op(e)
		});
	},
	unwrap(self){
		return match(self,{
			Ok:x=>x,
			Err:(e)=>unwrap_failed('called `Result::unwrap()` on an `Err` value\n',e)
		});
	},
	expect(self,msg){
		return match(self,{
			Ok:t=>t,
			Err:e=>unwrap_failed(msg,e)
		});
	},
	unwrap_err(self){
		return match(self,{
			Ok:t=>unwrap_failed('called `Result::unwrap_err()` on an `Ok` value',t),
			Err:e=>e
		});
	}
});

let unwrap_failed=(msg,error)=>{
	panic(`${msg}: ${error}`);
};

export {Ok,Err,Result};
