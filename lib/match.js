'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _panic = require('./panic');

var _panic2 = _interopRequireDefault(_panic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var match = function match(value, patterns) {
	var buf = undefined,
	    rusted = value.__rusted && '__data' in value,
	    non_exhaustive_pattern = 'non-exhaustive patterns: `_` not covered',
	    name = rusted ? value.__name : value,
	    data = rusted ? value.__data : value;

	if (!rusted && !('_' in patterns)) {
		(0, _panic2.default)(non_exhaustive_pattern);
	}

	if (name in patterns) {
		buf = patterns[name];
	} else if ('_' in patterns) {
		buf = patterns._;
	} else {
		(0, _panic2.default)(non_exhaustive_pattern);
	}

	return typeof buf == 'function' ? buf(data) : buf;
};

exports.default = match;
