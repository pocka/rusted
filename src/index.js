import Enum from './enum';
import match from './match';
import impl from './impl';
import panic from './panic';
import struct from './struct';
import type from './type';

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
	panic,
	type
};
