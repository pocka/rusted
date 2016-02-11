import {expect} from 'chai';

import panic from '../src/panic';

describe('panic.js',()=>{
	describe('#panic',()=>{
		it('should thorws an error',()=>{
			expect(()=>{
				panic('Some error');
			}).to.throw();
		});
	});
});
