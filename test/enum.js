var expect=require('chai').expect;

var Enum=require('../src/enum');

describe('enum.js',function(){
	describe('#EnumCreator',function(){
		it('should returns Enum instance',function(){
			expect(Enum.default({})).to.be.instanceof(Enum.Enum);
		});
	});
	describe('Enum',function(){
		describe('#constructor',function(){
			it('should includes passed variants name',function(){
				var e=new Enum.Enum({
					Foo:null,
					Bar:true
				});
				expect(e).to.have.property('Foo');
				expect(e).to.have.property('Bar');
			});
			it('should sets property as a getter when null was passed',function(){
				var e=new Enum.Enum({
					Foo:null
				});
				expect(e.Foo).not.to.be.a('function');
				expect(e.Foo).to.be.an('object');
			});
			it('should sets property as a function unless null was passed',function(){
				var e=new Enum.Enum({
					Foo:0
				});
				expect(e.Foo).not.to.be.an('object');
				expect(e.Foo).to.be.a('function');
				expect(e.Foo()).to.be.an('object');
			});
		});
		describe('#__impl',()=>{
			it('should append method to prototype of EnumValue',()=>{
				let foo=Enum.default({
					Foo:null,
					Bar:0
				});
				foo.__impl('hoge',(self)=>{
					return self;
				});
				let f=foo.Foo;
				expect(f.hoge).to.be.a('function');
			});
			it('should fix first argument to EnumValue',()=>{
				let foo=Enum.default({
					Foo:null,
					Bar:0
				});
				foo.__impl('hoge',(self,someone)=>{
					expect(self).to.equal(someone);
				});
				let f=foo.Foo;
				f.hoge(f);
			});
		});
	});
	describe('EnumValue',()=>{
		describe('#constructor',()=>{
			it('should sets unique id',()=>{
				let foo=Enum.default({
					Foo:null,
					Bar:0
				});
				expect(foo.Bar(0).__id).not.to.equal(foo.Foo.__id);
			});
			it('should sets the name',()=>{
				let foo=Enum.default({
					Foo:null,
					Bar:0
				});
				expect(foo.Foo.__name).to.equal('Foo');
				expect(foo.Bar(0).__name).to.equal('Bar');
			});
		});
	});
});
