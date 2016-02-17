import Enum from './enum';
import match from './match';
import impl from './impl';
import trait from './trait';
import panic from './panic';
import struct from './struct';
import type from './type';
import {mut,imm} from './mutability';

import {Result,Ok,Err} from './result';
import {Option,Some,None} from './option';

module.exports={
	Result,
	Ok,
	Err,
	Option,
	Some,
	None,
	Enum,
	struct,
	match,
	impl,
	trait,
	panic,
	type
};
