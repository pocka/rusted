let expect=require('chai').expect;

import Enum from '../src/enum';
import struct from '../src/struct';
import match from '../src/match';
import impl from '../src/impl';

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
				Bar:0
			}),
			bar=Foo.Bar(3),
			foo=Foo.Foo;

			impl(Foo,{
				hoge(self,num){
					return match(self,{
						Foo:num,
						Bar:x=>x*num
					});
				}
			});

			expect(bar.hoge(4)).to.equal(12);
			expect(foo.hoge(5)).to.equal(5);
		});
		it('should works properly for struct',()=>{
			let Position=struct({
				x:'number',
				y:'number'
			});
			impl(Position,{
				toString(self){
					return `(${self.x},${self.y})`;
				}
			});
			let pos=Position({
				x:0,
				y:0
			});
			expect(pos.toString()).to.equal('(0,0)');
		});
	});
});
