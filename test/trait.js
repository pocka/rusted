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
				.that.is.an('function');
			expect(Foo).to.have.property('bar')
				.that.is.an('function');
		});
	});
});
