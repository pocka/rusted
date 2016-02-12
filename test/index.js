import {expect} from 'chai';

import rusted from '../src/';
import rusted_es5 from '../lib/';

describe('index.js',()=>{
	let apis=[
		'Result','Ok','Err',
		'Option','Some','None',
		'Enum','struct',
		'match','impl','trait',
		'panic'
	];
	it('should importing and exporting properly',()=>{
		expect(apis.some((api)=>!(api in rusted))).not.to.be.true;
	});
	it('should importing and exporting properly (compiled)',()=>{
		expect(apis.some((api)=>!(api in rusted_es5))).not.to.be.true;
	});
});
