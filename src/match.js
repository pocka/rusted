let match=function(value,patterns){
	let buf,
		rusted=value.__rusted&&'__data' in value,
		non_exhaustive_pattern='non-exhaustive patterns: `_` not covered',
		name=rusted?value.__name:value,
		data=rusted?value.__data:value;

	if((!rusted)&&!('_' in patterns)){
		throw new Error(non_exhaustive_pattern);
	}

	if(name in patterns){
		buf=patterns[name];
	}else if('_' in patterns){
		buf=patterns._;
	}else{
		throw new Error(non_exhaustive_pattern);
	}

	return typeof buf=='function'?buf(data):buf;
};

export default match;
