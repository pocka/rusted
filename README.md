[![npm version](https://badge.fury.io/js/rusted.svg)](https://badge.fury.io/js/rusted)
[![Coverage Status](https://coveralls.io/repos/github/pocka/rusted/badge.svg?branch=master)](https://coveralls.io/github/pocka/rusted?branch=master)
[![Build Status](https://travis-ci.org/pocka/rusted.svg?branch=master)](https://travis-ci.org/pocka/rusted)
[![dependencies](https://david-dm.org/pocka/rusted.svg)](https://david-dm.org/pocka/rusted)
[![Code Climate](https://codeclimate.com/github/pocka/rusted/badges/gpa.svg)](https://codeclimate.com/github/pocka/rusted)

# rusted

[Rust](https://github.com/rust-lang/rust)'s syntax features for javascript.

These features will support us on writing program with functional way.

## Feature
- [x] `enum`
	+ [x] type checking
- [x] `struct`
	+ [x] type checking
	+ [x] mutable property
	+ [ ] tuple struct
	+ [ ] unit struct
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
npm install --save rusted
```

## Example
These examples require es6 transpiler like [Babel](https://github.com/babel/babel).

### `enum`
```javascript
import {Enum} from 'rusted';

//enum Message {
//	Quit,
//	ChangeColor(i32,i32,i32),
//	Move {x:i32, y:i32},
//	Write(String)
//}
let Message=Enum({
	Quit:null, // no data
	ChangeColor:Array, // accepts if data.constructor==Array
	Move:'object', // accepts if typeof data=='object'
	Write:'string' // accepts if typeof data=='string'
});

// with data
let x=Message.Move({x:3,y:4}); // let x: Message = Message::Move { x: 3, y: 4 };
// without data
let y=Message.Quit; // let y: Message = Message::Quit;
```

### `struct`
`struct` and `enum` checks type of property when instantiate.

+ `'any'`
	- accepts any type
+ `'number'`,`'string'`,`'object'`... (String)
	- compared to `typeof value_of_prop`
+ `Object`,`Array`,`Number`... (Constructor)
	- compared to `value_of_prop.constructor`

```javascript
import {struct} from 'rusted';

let Position=struct({
	x:'number', // accepts if typeof x=="number"
	y:'number'  // accepts if typeof y=="number"
});

let Player=struct({
	name:'string', // accepts if typeof name=="string"
	position:Position, // accepts if position.constructor==Position
	items:Array, // accepts if items.constructor==Array
	memory:'any' // accepts any type
});

let player=Player({
	name:'foo',
	position:Position({
		x:0,y:0
	}),
	items:[],
	memory:{}
});

console.log(player.position.x); // > 0
```

### `impl`
```javascript
import {Enum,struct,match,impl} from 'rusted';

// For struct
let SomeStruct=struct({
	x:'number',y:'number'
});

impl(SomeStruct,{
	// without placing `self` argument at first, we can declare associated function (static method)
	new(x,y){
		return SomeStruct({x,y});
	},
	print(self){
		console.log(`(${x},${y})`);
	}
});

let some_struct=SomeStruct.new(2,3);
some_struct.print(); // > (2,3)

// For enum
let SomeEnum=Enum({
	Foo:null,
	Bar:'number'
});

impl(SomeEnum,{
	unwrap(self){
		return match(self,{
			Foo:()=>'Foo!',
			Bar:x=>`Bar,${x}!`
		});
	}
});

let x=SomeEnum.Foo,y=SomeEnum.Bar(7);
console.log(x.unwrap()); // > Foo!
console.log(y.unwrap()); // > Bar,7!

// For ordinary constructor (javascript class)
let SomeConstructor=function(){
	this.name='foo';
};

impl(SomeConstructor,{
	create(){
		return new SomeConstructor();
	},
	greet(self){
		console.log(`Hello, ${self.name} !`);
	}
});

let some_constructor=SomeConstructor.create();
some_constructor.greet(); // > Hello, foo !
```

### `trait`
```javascript
import {struct,trait,impl} from 'rusted';

let Foo=struct({
	name:'string'
});

let BarTrait=trait({
	print(self){}, // empty body, need to implement on `impl`
	hello(self){ // has contents, not need to implement on `impl`
		console.log('hello');
	}
});

impl(BarTrait,Foo,{
	print(self){
		console.log(self.name);
	}
});
/* This would be error
impl(BarTrait,Foo,{});
*/

let foo=Foo({name:'Taro'});
foo.print(); // > Taro
foo.hello(); // > hello
```

### `Option`
```javascript
import {Some,None,match} from 'rusted';

let divide=(numerator,denominator)=>{
	return denominator==0
		? None // represents there are no data
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

console.log(Foo(10).unwrap()); // > 10
console.log(Foo(3).unwrap()); // throws error
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
