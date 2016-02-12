[![npm version](https://badge.fury.io/js/rusted.svg)](https://badge.fury.io/js/rusted)
[![Coverage Status](https://coveralls.io/repos/github/pocka/rusted/badge.svg?branch=master)](https://coveralls.io/github/pocka/rusted?branch=master)
[![Build Status](https://travis-ci.org/pocka/rusted.svg?branch=master)](https://travis-ci.org/pocka/rusted)
[![dependencies](https://david-dm.org/pocka/rusted.svg)](https://david-dm.org/pocka/rusted)
[![Code Climate](https://codeclimate.com/github/pocka/rusted/badges/gpa.svg)](https://codeclimate.com/github/pocka/rusted)

# rusted

Rust-like enum, Result, Option, impl and match for javascript.

## Feature
- [x] `enum`
	+ [ ] type checking
- [x] `struct`
	+ [x] type checking
	+ [ ] mutable property
- [x] `impl`
	- [x] static method (associated function)
- [x] `trait`
- [ ] `iter`
- [x] type alias
- [x] `panic` (not a macro)
- [x] `match`
- [x] `Result`
- [x] `Option`

## Install
```
npm install rusted
```

## Example
These examples require es6 transpiler.

### `enum` (and `impl` (and `match`))
```javascript
import {Enum,impl,match} from 'rusted';

/*
enum Message {
	Quit,
	ChangeColor(i32,i32,i32),
	Move {x:i32, y:i32},
	Write(String)
}
*/

let Message=Enum({
	Quit:null,
	ChangeColor:[0,0,0],
	Move:{x:0,y:0},
	Write:''
});

// let x: Message = Message::Move { x: 3, y: 4 };
let x=Message.Move({x:3,y:4});

// let y: Message = Message::Quit;
let y=Message.Quit;

impl(Message,{
	print(self){
		console.log(match(self,{
			Quit:()=>'Quit!',
			ChangeColor:[r,g,b]=>`Changed to ${r},${g},${b}`,
			Move:{x,y}=>`Moved to (${x},${y})`,
			Write:x=>x
		}));
	}
});

x.print(); // > Moved to (3,4)
y.print(); // > Quit!
```

### `struct` (and `impl`)
`struct` checks type of property when instantiate.

+ `'any'`
	- do not check type
+ `'number'`,`'string'`,`'object'`... (String)
	- compared to `typeof value_of_prop`
+ `Object`,`Array`,`Number`... (Constructor)
	- compared to `value_of_prop.constructor`

```javascript
import {struct,impl} from 'rusted';

let Circle=struct({
	x:'number',
	y:'number',
	radius:'number'
});

impl(Circle,{
	area(self){
		return Math.PI*(self.radius*self.radius);
	}
});

let c=Circle({
	x:0,y:0,
	radius:2
});

console.log(c.area()); // > 12.56...
```

### `Option`
```javascript
import {Some,None,match} from 'rusted';

let divide=(numerator,denominator)=>{
	return denominator==0
			? None
			: Some(numerator/denominator);
};

let result = divide(2.0, 3.0);

match(result,{
	Some:x=>console.log(`Result: ${x}`),
	None:()=>console.log('Cannot divide by 0')
});
// > Result: 0.666...
```

### `Result`
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
