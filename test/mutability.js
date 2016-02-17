import {expect} from 'chai';

import {mut,imm,Mutability} from '../src/mutability';

describe('mutability.js',()=>{
	describe('Mutability',()=>{
		it('should have property `mutable:boolean` and `data:any`',()=>{
			let o={foo:'bar'},
				m=new Mutability(o,true);
			expect(m).to.have.property('mutable')
				.that.is.true;
			expect(m).to.have.property('data')
				.that.equal(o);
		});
	});
	describe('#mut',()=>{
		it('should returns Mutability instance represents mutable',()=>{
			expect(mut('foo')).to.have.property('mutable')
				.that.is.true;
		});
	});
	describe('#imm',()=>{
		it('should returns Mutability instance represents immutable',()=>{
			expect(imm('foo')).to.have.property('mutable')
				.that.is.false;
		});
	});
});
