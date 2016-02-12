import {expect} from 'chai';

import {Some,None} from '../src/option';
import match from '../src/match';

describe('option.js',()=>{
	describe('Option',()=>{
		describe('#is_some',()=>{
			it('should returns true',()=>{
				let x=Some(2);
				expect(x.is_some()).to.be.true;
			});
			it('should returns false',()=>{
				let x=None;
				expect(x.is_some()).to.be.false;
			});
		});
		describe('#is_none',()=>{
			it('should returns false',()=>{
				let x=Some(2);
				expect(x.is_none()).to.be.false;
			});
			it('should returns true',()=>{
				let x=None;
				expect(x.is_none()).to.be.true;
			});
		});
		describe('#expect',()=>{
			it('should returns "value"',()=>{
				let x=Some('value');
				expect(x.expect('the world is ending')).to.equal('value');
			});
			it('should throws error with "the world is ending"',()=>{
				let x=None;
				expect(()=>{
					x.expect('the world is ending');
				}).to.throw();
			});
		});
		describe('#unwrap',()=>{
			it('should returns "air"',()=>{
				let x=Some('air');
				expect(x.unwrap()).to.equal('air');
			});
			it('should throws error',()=>{
				let x=None;
				expect(()=>{
					x.unwrap();
				}).to.throw();
			});
		});
		describe('#unwrap_or',()=>{
			it('should returns "car"',()=>{
				expect(Some('car').unwrap_or('bike')).to.equal('car');
			});
			it('should returns "bike"',()=>{
				expect(None.unwrap_or('bike')).to.equal('bike');
			});
		});
		describe('#unwrap_or_else',()=>{
			let k=10;
			it('should returns 4',()=>{
				expect(Some(4).unwrap_or_else(()=>2*k)).to.equal(4);
			});
			it('should returns 20',()=>{
				expect(None.unwrap_or_else(()=>2*k)).to.equal(20);
			});
		});
		describe('#map',()=>{
			it('should returns Some(13)',()=>{
				let maybe_some_string=Some('Hello, World!');
				let maybe_some_len=maybe_some_string.map(s=>s.length);
				expect(maybe_some_len.unwrap()).to.equal(13);
			});
			it('should returns None',()=>{
				expect(None.map(s=>s.length).is_none()).to.be.true;
			});
		});
		describe('#map_or',()=>{
			it('should returns 3',()=>{
				let x=Some('foo');
				expect(x.map_or(42,v=>v.length)).to.equal(3);
			});
			it('should returns 42',()=>{
				let x=None;
				expect(x.map_or(42,v=>v.length)).to.equal(42);
			});
		});
		describe('#map_or_else',()=>{
			let k=21;
			it('should returns 3',()=>{
				let x=Some('foo');
				expect(x.map_or_else(()=>2*k,v=>v.length)).to.equal(3);
			});
			it('should returns 42',()=>{
				let x=None;
				expect(x.map_or_else(()=>2*k,v=>v.length)).to.equal(42);
			});
		});
		describe('#ok_or',()=>{
			it('should retruns Ok("foo")',()=>{
				let x=Some('foo'),
					res=x.ok_or(0);
				expect(res.is_ok()).to.be.true;
				expect(res.unwrap()).to.equal('foo');
			});
			it('should returns Err(0)',()=>{
				let x=None,
					res=x.ok_or(0);
				expect(res.is_err()).to.be.true;
				expect(res.unwrap_err()).to.equal(0);
			});
		});
		describe('#ok_or_else',()=>{
			it('should returns Ok("foo")',()=>{
				let x=Some('foo');
				expect(x.ok_or_else(()=>0).unwrap()).to.equal('foo');
			});
			it('should returns Err(0)',()=>{
				let x=None;
				expect(x.ok_or_else(()=>0).unwrap_err()).to.equal(0);
			});
		});
		describe('#and',()=>{
			it('should returns None',()=>{
				let x=Some(2),
					y=None;
				expect(x.and(y).is_none()).to.be.true;
			});
			it('should returns None',()=>{
				let x=None,
					y=Some('foo');
				expect(x.and(y).is_none()).to.be.true;
			});
			it('should returns Some("foo")',()=>{
				let x=Some(2),
					y=Some('foo');
				expect(x.and(y).unwrap()).to.equal('foo');
			});
			it('should returns None',()=>{
				let x=None,
					y=None;
				expect(x.and(y).is_none()).to.be.true;
			});
		});
		describe('#and_then',()=>{
			let sq=x=>Some(x*x),
				nope=_=>None;
			it('should returns Some(16)',()=>{
				expect(Some(2).and_then(sq).and_then(sq).unwrap()).to.equal(16);
			});
			it('should returns None',()=>{
				expect(Some(2).and_then(sq).and_then(nope).is_none()).to.be.true;
			});
			it('should returns None',()=>{
				expect(Some(2).and_then(nope).and_then(sq).is_none()).to.be.true;
			});
			it('should returns None',()=>{
				expect(None.and_then(sq).and_then(sq).is_none()).to.be.true;
			});
		});
		describe('#or',()=>{
			it('should returns Some(2)',()=>{
				let x=Some(2),
					y=None;
				expect(x.or(y).unwrap()).to.equal(2);
			});
			it('should returns Some(100)',()=>{
				let x=None,
					y=Some(100);
				expect(x.or(y).unwrap()).to.equal(100);
			});
			it('should returns Some(2)',()=>{
				let x=Some(2),
					y=Some(100);
				expect(x.or(y).unwrap()).to.equal(2);
			});
			it('should returns None',()=>{
				let x=None,
					y=None;
				expect(x.or(y).is_none()).to.be.true;
			});
		});
		describe('#or_else',()=>{
			let nobody=()=>None,
				vikings=()=>Some('vikings');
			it('should returns Some("barbarians")',()=>{
				expect(Some('barbarians').or_else(vikings).unwrap()).to.equal('barbarians');
			});
			it('should returns Some("vikings")',()=>{
				expect(None.or_else(vikings).unwrap()).to.equal('vikings');
			});
			it('should returns None',()=>{
				expect(None.or_else(nobody).is_none()).to.be.true;
			});
		});
	});
});
