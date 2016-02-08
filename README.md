[![npm version](https://badge.fury.io/js/rusted.svg)](https://badge.fury.io/js/rusted)
[![Coverage Status](https://coveralls.io/repos/github/pocka/rusted/badge.svg?branch=master)](https://coveralls.io/github/pocka/rusted?branch=master)
[![Build Status](https://travis-ci.org/pocka/rusted.svg?branch=master)](https://travis-ci.org/pocka/rusted)

# rusted

Rust-like enum, Result, Option, impl and match for javascript.

## Install
```
npm install rusted
```

## Example
These examples require es6 transpiler.

### enum

```rust
enum Message {
	Quit,
	ChangeColor(i32,i32,i32),
	Move {x:i32, y:i32},
	Write(String),
}

let x: Message = Message::Move { x: 3, y: 4 };
let y: Message = Message::Quit;
```
the above could written as below
```javascript
import {Enum} from 'rusted';

let Message=Enum({
	Quit:null,
	ChangeColor:[0,0,0],
	Move:{x:0,y:0},
	Write:''
});
let x=Message.Move({x:3,y:4});
let y=Message.Quit;
```

### Result
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
