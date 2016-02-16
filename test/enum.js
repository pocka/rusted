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
		it('should check type',()=>{
			let Foo=Enum({
				Num:'number',
				Str:'string',
				Obj:'object',
				Arr:Array
			});
			expect(()=>{
				Foo.Num(0);
			}).not.to.throw();
			expect(()=>{
				Foo.Num('0');
			}).to.throw();
			expect(()=>{
				Foo.Str('foo');
			}).not.to.throw();
			expect(()=>{
				Foo.Str({});
			}).to.throw();
			expect(()=>{
				Foo.Obj({});
			}).not.to.throw();
			expect(()=>{
				Foo.Obj(undefined);
			}).to.throw();
			expect(()=>{
				Foo.Arr([]);
			}).not.to.throw();
			expect(()=>{
				Foo.Arr({0:0,1:1});
			}).to.throw();
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
