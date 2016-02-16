'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _panic = require('./panic');

var _panic2 = _interopRequireDefault(_panic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var non_exhaustive_pattern = 'non-exhaustive patterns: `_` not covered';

var select_arm = function select_arm(value, pattern) {
	return value in pattern ? pattern[value] : '_' in pattern ? pattern._ : (0, _panic2.default)(non_exhaustive_pattern);
};

var match = function match(value, patterns) {
	var rusted = value.__rusted && '__data' in value,
	    name = rusted ? value.__name : value,
	    data = rusted ? value.__data : value;

	if (!rusted && !('_' in patterns)) {
		(0, _panic2.default)(non_exhaustive_pattern);
	}

	var buf = select_arm(name, patterns);

	return typeof buf === 'function' ? buf(data) : buf;
};

exports.default = match;
