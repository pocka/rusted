let expect=require('chai').expect;

import Enum from '../src/enum';
import match from '../src/match';

describe('match.js',()=>{
	describe('#match',()=>{
		describe('when value has __data and __rusted',()=>{
			let Foo=Enum({
				Foo:null,
				Bar:0
			});
			it('should throws error when all patterns failed and there is no `_`',()=>{
				let foo=Foo.Foo;
				expect(()=>{
					return match(foo,{
						Hoge:'hoge'
					});
				}).to.throw();
			});
			it('should pass (Enum object).__data to handler',()=>{
				let bar=Foo.Bar(5);
				expect(match(bar,{
					Bar:x=>x
				})).to.equal(5);
			});
			it('should returns the value of arm when matched',()=>{
				let foo=Foo.Foo;
				expect(match(foo,{
					Foo:9
				})).to.equal(9);
			});
			it('should returns _ arm when all patterns failed',()=>{
				let foo=Foo.Foo;
				expect(match(foo,{
					Bar:6,
					Hoge:'hoge',
					_:'else'
				})).to.equal('else');
			});
		});
		describe('when value does not have __data nor __rusted',()=>{
			it('should throws error when `_` was not provided',()=>{
				expect(()=>{
					return match(5,{
						0:'zero',
						5:'five'
					})
				}).to.throw();
			});
			it('should returns the value of arm when matched',()=>{
				expect(match(3,{
					0:'zero',
					1:'one',
					2:'two',
					3:'three',
					_:'else'
				})).to.equal('three');
			});
			it('should returns _ arm when all patterns failed',()=>{
				expect(match(9,{
					0:'zero',
					1:'one',
					2:'two',
					3:'three',
					_:'else'
				})).to.equal('else');
			});
		});
	});
});
