import {expect} from 'chai';

import struct from '../src/struct';

import impl from '../src/impl';

import {imm,mut} from '../src/mutability';

import Enum from '../src/enum';

describe('struct.js',()=>{
	describe('#factory',()=>{
		it('should returns constructor',()=>{
			let Foo=struct({});
			expect(Foo).to.be.a('function');
			expect(Foo()).to.be.instanceof(Foo);
		});
	});
	describe('struct',()=>{
		it('should have properties that ones of passed arguments',()=>{
			let Foo=struct({
				bar:'any',
				hoge:'any',
				fuga:'any'
			}),
			foo=Foo({
				bar:0,
				hoge:null,
				fuga:true
			});
			expect(foo).to.have.property('bar');
			expect(foo).to.have.property('hoge');
			expect(foo).to.have.property('fuga');
		});
		it('should throws error when invalid type value was passed',()=>{
			let Foo=struct({
				bar:'any',
				hoge:'string'
			});
			expect(()=>{
				return Foo({
					bar:5,
					hoge:5
				});
			}).to.throw();
		});
		it('should works properly when constructor passed to type',()=>{
			let Person=function(name){
				this.name=name;
			};
			let Foo=struct({
				bar:'string',
				hoge:Person
			});
			let hoge=new Person('Hoge'),
				foo=Foo({
					bar:'bar',
					hoge:hoge
				});
			expect(foo.hoge.name).to.equal('Hoge');
		});
		it('should throws error when some property were lacked',()=>{
			let Foo=struct({
				bar:'any',
				hoge:'any',
				fuga:'any'
			});
			expect(()=>{
				return Foo({
					bar:1,
					h:2
				});
			}).to.throw();
		});
		it('could have both mutable and immutable property',()=>{
			let Foo=struct({
				bar:mut('string'),
				hoge:mut(Array),
				fuga:'number'
			});
			let foo=Foo({
				bar:'fooooo',
				hoge:[0,1,2],
				fuga:5
			});
			foo.bar='bar?';
			foo.hoge=[1,2,3,4];
			expect(foo.bar).to.equal('bar?');
			expect(foo.hoge).to.deep.equal([1,2,3,4]);
			expect(()=>{
				foo.fuga=9;
			}).to.throw();
		});
		it('should works properly if no arguments (Unit-like struct)',()=>{
			let Unit=struct();
			impl(Unit,{
				foo(){
					return 3;
				},
				bar(self){
					return 4;
				}
			});
			let value=Unit();

			expect(value.bar()).to.equal(4);
			expect(Unit.foo()).to.equal(3);
		});
		it('should works properly',()=>{
			let OtherStruct=struct({
				x:'number',
				y:'number'
			});
			let SomeEnum=Enum({
				Foo:null
			});
			let Foo=struct({
				bar:'any',
				hoge:'number',
				fuga:Array,
				piyo:OtherStruct,
				some:SomeEnum
			});
			let foo;
			expect(()=>{
				foo=Foo({
					bar:{x:0,y:0},
					hoge:90,
					fuga:[1,2,3],
					piyo:OtherStruct({
						x:1,
						y:2
					}),
					some:SomeEnum.Foo
				});
			}).not.to.throw();
			expect(foo.bar).to.deep.equal({x:0,y:0});
			expect(foo.hoge).to.equal(90);
			expect(foo.fuga).to.deep.equal([1,2,3]);
			expect(foo.piyo.x).to.equal(1);
			expect(foo.piyo.y).to.equal(2);
		});
		it('should be extendable',()=>{
			let Foo=struct({
				bar:'any'
			});
			Foo.prototype.hoge=function(){
				return this.bar;
			};
			expect(Foo.prototype).to.have.property('hoge');
			let foo=new Foo({
				bar:'Hello, World!'
			});
			expect(foo.hoge()).to.equal('Hello, World!');
		});
		describe('#toString',()=>{
			it('should works properly',()=>{
				let Foo=struct({
					foo:'any',
					fuga:'string'
				});
				expect(Foo.toString()).to.equal('rusted struct type: {foo: any,fuga: string }');
			});
		});
	});
});
