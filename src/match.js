import panic from './panic';

const non_exhaustive_pattern='non-exhaustive patterns: `_` not covered';

let select_arm=function(value,pattern){
	return (value in pattern)
			? pattern[value]
		: ('_' in pattern)
			? pattern._
			: panic(non_exhaustive_pattern) ;
};

let match=function(value,patterns){
	let rusted=value.__rusted&&'__data' in value,
		name=rusted?value.__name:value,
		data=rusted?value.__data:value;

	if((!rusted)&&!('_' in patterns)){
		panic(non_exhaustive_pattern);
	}

	let buf=select_arm(name,patterns);

	return typeof buf==='function'
		? buf(data)
		: buf;
};

export default match;
