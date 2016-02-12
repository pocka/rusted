import panic from './panic';

let match=function(value,patterns){
	let rusted=value.__rusted&&'__data' in value,
		non_exhaustive_pattern='non-exhaustive patterns: `_` not covered',
		name=rusted?value.__name:value,
		data=rusted?value.__data:value;

	if((!rusted)&&!('_' in patterns)){
		panic(non_exhaustive_pattern);
	}

	let buf=(name in patterns)
			? patterns[name]
		: ('_' in patterns)
			? patterns._
			: panic(non_exhaustive_pattern);

	return typeof buf==='function'?buf(data):buf;
};

export default match;
