[![npm version](https://badge.fury.io/js/rusted.svg)](https://badge.fury.io/js/rusted)

# rusted

Rust-like enum, Result, Option, impl and match for javascript.

## Install
```
npm install rusted
```

## Example
This example requires es6 transpiler.

```javascript
import {Ok,Err,match} from 'rusted';

function Foo(x){
	if(x>5){
		return Ok(x);
	}else{
		return Err('Less than 5 !');
	}
}

console.log(match(Foo(3),{
	Ok:x=>x,
	Err:e=>e
}));
// > Less than 5 !

console.log(Foo(10).unwrap());
// > 10
console.log(Foo(3).unwrap());
// throws error

```

(es5 version.)

```javascript
var rusted=require('rusted'),
	Ok=rusted.Ok,
	Err=rusted.Err,
	match=rusted.match;

function Foo(x){
	if(x>5){
		return Ok(x);
	}else{
		return Err('Less than 5 !');
	}
}

console.log(match(Foo(3),{
	Ok:function(x){
		return x;
	},
	Err:function(e){
		return e;
	}
}));

console.log(Foo(10).unwrap());
console.log(Foo(3).unwrap());
```

## License
MIT
