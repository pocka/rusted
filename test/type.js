import {expect} from 'chai';

import type from '../src/type';

describe('type.js',()=>{
	describe('alias for "number"',()=>{
		it('should be sets properly',()=>{
			let number='number';

			expect(type.u8).to.equal(number);
			expect(type.u16).to.equal(number);
			expect(type.u32).to.equal(number);
			expect(type.u64).to.equal(number);
			expect(type.i8).to.equal(number);
			expect(type.i16).to.equal(number);
			expect(type.i32).to.equal(number);
			expect(type.i64).to.equal(number);
			expect(type.f32).to.equal(number);
			expect(type.f64).to.equal(number);
			expect(type.usize).to.equal(number);
			expect(type.isize).to.equal(number);
		});
	});
	describe('alias for "string"',()=>{
		it('should be sets properly',()=>{
			let string='string';

			expect(type.char).to.equal(string);
			expect(type.str).to.equal(string);
		});
	});
});
