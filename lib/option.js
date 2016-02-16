'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Option = exports.None = exports.Some = undefined;

var _enum = require('./enum');

var _enum2 = _interopRequireDefault(_enum);

var _impl = require('./impl');

var _impl2 = _interopRequireDefault(_impl);

var _match = require('./match');

var _match2 = _interopRequireDefault(_match);

var _result = require('./result');

var _panic = require('./panic');

var _panic2 = _interopRequireDefault(_panic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Option = (0, _enum2.default)({
	Some: true,
	None: null
});

var _Some = Option.Some;
var _None = Option.None;

(0, _impl2.default)(Option, {
	is_some: function is_some(self) {
		return (0, _match2.default)(self, {
			Some: true,
			None: false
		});
	},
	is_none: function is_none(self) {
		return !self.is_some();
	},
	expect: function expect(self, msg) {
		return (0, _match2.default)(self, {
			Some: function Some(val) {
				return val;
			},
			None: function None() {
				return expect_failed(msg);
			}
		});
	},
	unwrap: function unwrap(self) {
		return (0, _match2.default)(self, {
			Some: function Some(val) {
				return val;
			},
			None: function None() {
				return (0, _panic2.default)('called `Option::unwrap()` on a `None` value');
			}
		});
	},
	unwrap_or: function unwrap_or(self, def) {
		return (0, _match2.default)(self, {
			Some: function Some(x) {
				return x;
			},
			None: function None() {
				return def;
			}
		});
	},
	unwrap_or_else: function unwrap_or_else(self, f) {
		return (0, _match2.default)(self, {
			Some: function Some(x) {
				return x;
			},
			None: function None() {
				return f();
			}
		});
	},
	map: function map(self, f) {
		return (0, _match2.default)(self, {
			Some: function Some(x) {
				return _Some(f(x));
			},
			None: function None() {
				return _None;
			}
		});
	},
	map_or: function map_or(self, def, f) {
		return (0, _match2.default)(self, {
			Some: function Some(t) {
				return f(t);
			},
			None: function None() {
				return def;
			}
		});
	},
	map_or_else: function map_or_else(self, def, f) {
		return (0, _match2.default)(self, {
			Some: function Some(t) {
				return f(t);
			},
			None: function None() {
				return def();
			}
		});
	},
	ok_or: function ok_or(self, err) {
		return (0, _match2.default)(self, {
			Some: function Some(v) {
				return (0, _result.Ok)(v);
			},
			None: function None() {
				return (0, _result.Err)(err);
			}
		});
	},
	ok_or_else: function ok_or_else(self, err) {
		return (0, _match2.default)(self, {
			Some: function Some(v) {
				return (0, _result.Ok)(v);
			},
			None: function None() {
				return (0, _result.Err)(err());
			}
		});
	},
	and: function and(self, optb) {
		return (0, _match2.default)(self, {
			Some: function Some(_) {
				return optb;
			},
			None: function None() {
				return _None;
			}
		});
	},
	and_then: function and_then(self, f) {
		return (0, _match2.default)(self, {
			Some: function Some(x) {
				return f(x);
			},
			None: function None() {
				return _None;
			}
		});
	},
	or: function or(self, optb) {
		return (0, _match2.default)(self, {
			Some: function Some(_) {
				return self;
			},
			None: function None() {
				return optb;
			}
		});
	},
	or_else: function or_else(self, f) {
		return (0, _match2.default)(self, {
			Some: function Some(_) {
				return self;
			},
			None: function None() {
				return f();
			}
		});
	}
	//take(self){
	//},
	//cloned(self){
	//},
	//unwrap_or_default(self){
	//},

});

var expect_failed = function expect_failed(msg) {
	(0, _panic2.default)(msg);
};

exports.Some = _Some;
exports.None = _None;
exports.Option = Option;
