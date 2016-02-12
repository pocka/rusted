import {expect} from 'chai';

import trait from '../src/trait';

describe('trait.js',()=>{
	describe('#trait',()=>{
		it('should returns object',()=>{
			let Foo=trait({});

			expect(Foo).to.be.an('object');
		});
		it('should sets methods definition',()=>{
			let Foo=trait({
				foo(self){},
				bar(){return true;}
			});

			expect(Foo).to.have.property('foo')
				.that.is.an('object');
			expect(Foo).to.have.property('bar')
				.that.is.an('object');
		});
		it('should returns object that have properties is_static,is_empty,body',()=>{
			let empty_method=(self)=>{},
				empty_static=()=>{},
				normal_method=(self)=>{return true;},
				static_method=()=>{return true;};
			let Foo=trait({
				empty_method,
				empty_static,
				normal_method,
				static_method
			});
			expect(Foo.empty_method).to.deep.equal({
				is_static:false,is_empty:true,
				body:empty_method
			});
			expect(Foo.empty_static).to.deep.equal({
				is_static:true,is_empty:true,
				body:empty_static
			});
			expect(Foo.normal_method).to.deep.equal({
				is_static:false,is_empty:false,
				body:normal_method
			});
			expect(Foo.static_method).to.deep.equal({
				is_static:true,is_empty:false,
				body:static_method
			});
		});
	});
});
