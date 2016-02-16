var expect=require('chai').expect;

import Enum from '../src/enum';

describe('enum.js',function(){
	describe('#Enum',function(){
		it('should returns Enum factory object',function(){
			expect(Enum({})).to.be.an('object');
		});
	});
	describe('Enum factory object returned by factory',function(){
		it('should includes passed variants name',function(){
			var e=Enum({
				Foo:null,
				Bar:'any'
			});
			expect(e).to.have.property('Foo');
			expect(e).to.have.property('Bar');
		});
		it('should sets property as a getter when null was passed',function(){
			var e=Enum({
				Foo:null
			});
			expect(e.Foo).not.to.be.a('function');
			expect(e.Foo).to.be.an('object');
		});
		it('should sets property as a function unless null was passed',function(){
			var e=Enum({
				Foo:'any'
			});
			expect(e.Foo).not.to.be.an('object');
			expect(e.Foo).to.be.a('function');
			expect(e.Foo()).to.be.an('object');
		});
	});
	describe('EnumValue',()=>{
		describe('#constructor',()=>{
			it('should sets the name',()=>{
				let foo=Enum({
					Foo:null,
					Bar:'any'
				});
				expect(foo.Foo.__name).to.equal('Foo');
				expect(foo.Bar(0).__name).to.equal('Bar');
			});
		});
	});
});
