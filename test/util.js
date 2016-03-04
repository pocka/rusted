import {expect} from 'chai';

import * as util from '../src/util';

describe('util.js',()=>{
	describe('#is_static_method',()=>{
		it('should return true when "function(){}" was passed',()=>{
			expect(util.is_static_method(function(){})).to.be.true;
		});
		it('should return false when "function(self){}" was passed',()=>{
			expect(util.is_static_method(function(self){})).to.be.false;
		});
		it('should return true when "function(){self=void 0;}" was passed',()=>{
			expect(util.is_static_method(function(){self=void 0;})).to.be.true;
		});
		it('should return true when "function(self_){}" was passed',()=>{
			expect(util.is_static_method(function(self_){})).to.be.true;
		});
		it('should return true when "function foo(){}" was passed',()=>{
			expect(util.is_static_method(function foo(){})).to.be.true;
		});
		it('should return false when "function bar(self){}" was passed',()=>{
			expect(util.is_static_method(function bar(self){})).to.be.false;
		});
		it('should return false when "function bar(self,foo){}" was passed',()=>{
			expect(util.is_static_method(function bar(self,foo){})).to.be.false;
		});
	});
	describe('#is_empty_function',()=>{
		it('should return true when "function(){}" was passed',()=>{
			expect(util.is_empty_function(function(){})).to.be.true;
		});
		it('should return false when "function(){;}" was passed',()=>{
			expect(util.is_empty_function(function(){;})).to.be.false;
		});
		it('should return true when "function(foo,bar){}" was passed',()=>{
			expect(util.is_empty_function(function(foo,bar){})).to.be.true;
		});
		it('should return false when "function(foo,bar){foo(bar);}" was passed',()=>{
			expect(util.is_empty_function(function(foo,bar){foo(bar);})).to.be.false;
		});
		it('should return true when "function foo(bar){}" was passed',()=>{
			expect(util.is_empty_function(function foo(bar){})).to.be.true;
		});
		it('should return false when "function(foo){bar=void 0;}" was passed',()=>{
			expect(util.is_empty_function(function(foo){bar=void 0;})).to.be.false;
		});
	});
	describe('#format_static_method_name',()=>{
		it('should slice name when "$foo" was passed',()=>{
			expect(util.format_static_method_name('$foo')).to.equal('foo');
		});
		it('should not slice name when "foo" was passed',()=>{
			expect(util.format_static_method_name('foo')).to.equal('foo');
		});
	});
});
