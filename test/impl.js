let expect=require('chai').expect;

import Enum from '../src/enum';
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
		it('should works fine to Enum',()=>{
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
	});
});
