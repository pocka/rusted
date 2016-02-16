let expect=require('chai').expect;

import Enum from '../src/enum';
import struct from '../src/struct';
import match from '../src/match';
import impl from '../src/impl';
import type from '../src/type';
import trait from '../src/trait';

describe('impl.js',()=>{
	describe('#impl',()=>{
		it('should append function to prototype when constructor was passed',()=>{
			let ClsFoo=function(){
				this.foo='foo';
			};

			impl(ClsFoo,{
				bar(self){
					return `${self.foo} bar`;
				}
			});

			expect(ClsFoo.prototype).to.have.property('bar');
			expect((new ClsFoo()).bar()).to.equal('foo bar');
		});
		it('should throws error when non-function object was passed',()=>{
			expect(()=>{
				impl('Foo',{
					print(self){
						console.log(self);
					}
				});
			}).to.throw();
		});
		it('should works properly for constructor',()=>{
			let Person=function(name){
				this.name=name;
			};
			impl(Person,{
				greet(self){
					return `Hello, ${self.name}`;
				}
			});

			expect((new Person('Foo')).greet()).to.equal('Hello, Foo');
		});
		it('should works fine for Enum',()=>{
			let Foo=Enum({
				Foo:null,
				Bar:'number'
			}),
			bar=Foo.Bar(3),
			foo=Foo.Foo;

			impl(Foo,{
				hoge(self,num){
					return match(self,{
						Foo:num,
						Bar:x=>x*num
					});
				},
				fuga(){
					return Foo.Foo;
				}
			});

			expect(bar.hoge(4)).to.equal(12);
			expect(foo.hoge(5)).to.equal(5);
			expect(Foo.fuga().hoge(3)).to.equal(3);
		});
		it('should works properly for struct',()=>{
			let Position=struct({
				x:'number',
				y:'number'
			});
			impl(Position,{
				toString(self){
					return `(${self.x},${self.y})`;
				},
				from_array(arr){
					return Position({x:arr[0],y:arr[1]});
				}
			});
			let pos=Position({
				x:0,
				y:0
			});
			expect(pos.toString()).to.equal('(0,0)');
			expect(Position.from_array([2,3]).toString()).to.equal('(2,3)');
		});
		it('should sets static method to constructor directly (associated function)',()=>{
			let Foo=struct({
				x:type.i32,
				y:type.i32
			});
			impl(Foo,{
				new(x,y){
					return Foo({x:x||0,y:y||0});
				}
			});
			expect(Foo).to.have.property('new');
			expect(Foo.new(0,0)).to.be.instanceof(Foo);
		});
		it('should works on primitive type properly',()=>{
			impl(Array,{
				foo(el){
					return el.reverse();
				},
				bar(self){
					return self.map(n=>n*2).join(',');
				}
			});
			expect(Array.foo([1,2,3]).bar()).to.equal('6,4,2');
		});
		it('should works with trait',()=>{
			let FooTrait=trait({
				foo(){
					return true;
				},
				hoge(self){
					return true;
				},
				new(){
				},
				print(self){}
			});

			let Bar=struct({
				x:type.i32,
				y:type.i32
			});

			impl(FooTrait,Bar,{
				new(){
					return Bar({x:0,y:0});
				},
				print(self){
					return `${self.x},${self.y}`;
				}
			});

			expect(Bar.foo()).to.be.true;

			let bar=Bar({
				x:0,y:0
			});

			expect(bar.hoge()).to.be.true;
			expect(bar.print()).to.equal('0,0');

			expect(Bar.new()).to.be.instanceof(Bar);
		});
		it('should panic when passed block not fully implement trait interface',()=>{
			let FooTrait=trait({
				foo(){}
			});
			let Bar=struct({});
			expect(()=>{
				impl(FooTrait,Bar);
			}).to.throw();
		});
		it('should ignore unnecessary methods',()=>{
			let FooTrait=trait({
				foo(){}
			});
			let Bar=struct({});
			impl(FooTrait,Bar,{
				foo(){
					return true;
				},
				bar(){
					return true;
				}
			});
			expect(Bar).not.to.have.property('bar');
		});
	});
});
