let expect=require('chai').expect;

import {Ok,Err} from '../src/result';
import match from '../src/match';

describe('result.js',()=>{
	describe('Result',()=>{
		describe('#is_ok',()=>{
			it('should returns true when Ok',()=>{
				expect(Ok(-3).is_ok()).to.be.true;
			});
			it('should returns false when Err',()=>{
				expect(Err('Some error message').is_ok()).to.be.false;
			});
		});
		describe('#is_err',()=>{
			it('should returns true when Err',()=>{
				expect(Ok(-3).is_err()).to.be.false;
			});
			it('should returns false when Ok',()=>{
				expect(Err('Some error message').is_err()).to.be.true;
			});
		});
		describe('#ok',()=>{
			it('should returns Some(2)',()=>{
				let x=Ok(2);
				expect(x.ok().unwrap()).to.equal(2);
				expect(x.ok().is_some()).to.be.true;
			});
			it('should returns None',()=>{
				let x=Err('Nothing here');
				expect(x.ok().is_none()).to.be.true;
			});
		});
		describe('#err',()=>{
			it('should returns None',()=>{
				let x=Ok(2);
				expect(x.err().is_none()).to.be.true;
			});
			it('should returns Some("Nothing here")',()=>{
				let x=Err('Nothing here');
				expect(x.err().unwrap()).to.equal('Nothing here');
				expect(x.err().is_some()).to.be.true;
			});
		});
		describe('#map',()=>{
			it('should apply handler',()=>{
				expect(match(Ok(5).map(n=>n*4),{
					Ok:t=>t,
					Err:null
				})).to.equal(20);
			});
			it('should returns Err(5)',()=>{
				expect(Err(5).map(n=>n*4).unwrap_err()).to.equal(5);
			});
		});
		describe('#map_err',()=>{
			let stringify=(x)=>`error code: ${x}`;
			it('should returns Ok when Ok',()=>{
				expect(Ok(2).map_err(stringify).unwrap()).to.equal(2);
			});
			it('should returns mapped value when Err',()=>{
				expect(match(Err(13).map_err(stringify),{
					Ok:null,
					Err:e=>e
				})).to.equal('error code: 13');
			});
		});
		describe('#and',()=>{
			it('should returns Err("late error")',()=>{
				let x=Ok(2),
					y=Err('late error');
				expect(match(x.and(y),{
					Ok:null,
					Err:e=>e
				})).to.equal('late error');
			});
			it('should returns Err("early error")',()=>{
				let x=Err('early error'),
					y=Ok('foo');
				expect(match(x.and(y),{
					Ok:null,
					Err:e=>e
				})).to.equal('early error');
			});
			it('should returns Err("not a 2")',()=>{
				let x=Err('not a 2'),
					y=Err('late error');
				expect(match(x.and(y),{
					Ok:null,
					Err:e=>e
				})).to.equal('not a 2');
			});
			it('should returns Ok("different result type")',()=>{
				let x=Ok(2),
					y=Ok('different result type');
				expect(x.and(y).unwrap()).to.equal('different result type');
			});
		});
		describe('#and_then',()=>{
			let sq=x=>Ok(x*x),
				err=x=>Err(x);
			it('should returns Ok(16)',()=>{
				expect(Ok(2).and_then(sq).and_then(sq).unwrap()).to.equal(16);
			});
			it('should returns Err(16)',()=>{
				expect(Ok(2).and_then(sq).and_then(err).unwrap_err()).to.equal(4);
			});
			it('should returns Err(2)',()=>{
				expect(Ok(2).and_then(err).and_then(sq).unwrap_err()).to.equal(2);
			});
			it('should returns Err(3)',()=>{
				expect(Err(3).and_then(sq).and_then(sq).unwrap_err()).to.equal(3);
			});
		});
		describe('#or',()=>{
			it('should returns Ok(2)',()=>{
				let x=Ok(2),
					y=Err('late error');
				expect(x.or(y).unwrap()).to.equal(2);
			});
			it('should returns Ok(2)',()=>{
				let x=Err('early error'),
					y=Ok(2);
				expect(x.or(y).unwrap()).to.equal(2);
			});
			it('should returns Err("late error")',()=>{
				let x=Err('not a 2'),
					y=Err('late error');
				expect(x.or(y).unwrap_err()).to.equal('late error');
			});
			it('should returns Ok(2)',()=>{
				let x=Ok(2),
					y=Ok(100);
				expect(x.or(y).unwrap()).to.equal(2);
			});
		});
		describe('#or_else',()=>{
			let sq=x=>Ok(x*x),
				err=x=>Err(x);
			it('should returns Ok(2)',()=>{
				expect(Ok(2).or_else(sq).or_else(sq).unwrap()).to.equal(2);
			});
			it('should returns Ok(2)',()=>{
				expect(Ok(2).or_else(err).or_else(sq).unwrap()).to.equal(2);
			});
			it('should returns Ok(9)',()=>{
				expect(Err(3).or_else(sq).or_else(err).unwrap()).to.equal(9);
			});
			it('should returns Err(3)',()=>{
				expect(Err(3).or_else(err).or_else(err).unwrap_err()).to.equal(3);
			});
		});
		describe('#unwrap_or',()=>{
			let optb=2;
			it('should returns 9',()=>{
				expect(Ok(9).unwrap_or(optb)).to.equal(9);
			});
			it('should returns 2',()=>{
				expect(Err('error').unwrap_or(optb)).to.equal(2);
			});
		});
		describe('#unrwap_or_else',()=>{
			let count=x=>x.length;
			it('should returns 2',()=>{
				expect(Ok(2).unwrap_or_else(count)).to.equal(2);
			});
			it('should returns 3',()=>{
				expect(Err('foo').unwrap_or_else(count)).to.equal(3);
			});
		});
		describe('#unwrap',()=>{
			it('should returns 2',()=>{
				expect(Ok(2).unwrap()).to.equal(2);
			});
			it('should throws error',()=>{
				expect(()=>{
					Err('emergency failure').unwrap();
				}).to.throw();
			});
		});
		describe('#expect',()=>{
			it('should throws error with "Testing expect: emergency failure"',()=>{
				expect(()=>{
					Err('emergency failure').expect('Testing expect');
				}).to.throw('Testing expect: emergency failure');
			});
			it('should unwrap value of Ok',()=>{
				expect(Ok(3).expect('Testing expect')).to.equal(3);
			});
		});
		describe('#unwrap_err',()=>{
			it('should thorws error with 2',()=>{
				expect(()=>{
					Ok(2).unwrap_err();
				}).to.throw(2);
			});
			it('should returns "emergency failure"',()=>{
				expect(Err('emergency failure').unwrap_err()).to.equal('emergency failure');
			});
		});
	});
});
