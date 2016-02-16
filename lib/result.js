'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Result = exports.Err = exports.Ok = undefined;

var _enum = require('./enum');

var _enum2 = _interopRequireDefault(_enum);

var _impl = require('./impl');

var _impl2 = _interopRequireDefault(_impl);

var _match = require('./match');

var _match2 = _interopRequireDefault(_match);

var _option = require('./option');

var _panic = require('./panic');

var _panic2 = _interopRequireDefault(_panic);

var _type = require('./type');

var _type2 = _interopRequireDefault(_type);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Result = (0, _enum2.default)({
	Ok: _type2.default.any,
	Err: _type2.default.any
});

var _Ok = Result.Ok;
var _Err = Result.Err;

(0, _impl2.default)(Result, {
	is_ok: function is_ok(self) {
		return (0, _match2.default)(self, {
			Ok: true,
			Err: false
		});
	},
	is_err: function is_err(self) {
		return !self.is_ok();
	},
	ok: function ok(self) {
		return (0, _match2.default)(self, {
			Ok: function Ok(x) {
				return (0, _option.Some)(x);
			},
			Err: function Err(_) {
				return _option.None;
			}
		});
	},
	err: function err(self) {
		return (0, _match2.default)(self, {
			Ok: function Ok(_) {
				return _option.None;
			},
			Err: function Err(x) {
				return (0, _option.Some)(x);
			}
		});
	},
	map: function map(self, op) {
		return (0, _match2.default)(self, {
			Ok: function Ok(t) {
				return _Ok(op(t));
			},
			Err: function Err(e) {
				return _Err(e);
			}
		});
	},
	map_err: function map_err(self, op) {
		return (0, _match2.default)(self, {
			Ok: function Ok(t) {
				return _Ok(t);
			},
			Err: function Err(e) {
				return _Err(op(e));
			}
		});
	},

	//iter(self){
	//},
	and: function and(self, res) {
		return (0, _match2.default)(self, {
			Ok: function Ok(_) {
				return res;
			},
			Err: function Err(e) {
				return _Err(e);
			}
		});
	},
	and_then: function and_then(self, op) {
		return (0, _match2.default)(self, {
			Ok: function Ok(t) {
				return op(t);
			},
			Err: function Err(e) {
				return _Err(e);
			}
		});
	},
	or: function or(self, res) {
		return (0, _match2.default)(self, {
			Ok: function Ok(v) {
				return _Ok(v);
			},
			Err: function Err(_) {
				return res;
			}
		});
	},
	or_else: function or_else(self, op) {
		return (0, _match2.default)(self, {
			Ok: function Ok(t) {
				return _Ok(t);
			},
			Err: function Err(e) {
				return op(e);
			}
		});
	},
	unwrap_or: function unwrap_or(self, optb) {
		return (0, _match2.default)(self, {
			Ok: function Ok(t) {
				return t;
			},
			Err: function Err(_) {
				return optb;
			}
		});
	},
	unwrap_or_else: function unwrap_or_else(self, op) {
		return (0, _match2.default)(self, {
			Ok: function Ok(t) {
				return t;
			},
			Err: function Err(e) {
				return op(e);
			}
		});
	},
	unwrap: function unwrap(self) {
		return (0, _match2.default)(self, {
			Ok: function Ok(x) {
				return x;
			},
			Err: function Err(e) {
				return unwrap_failed('called `Result::unwrap()` on an `Err` value\n', e);
			}
		});
	},
	expect: function expect(self, msg) {
		return (0, _match2.default)(self, {
			Ok: function Ok(t) {
				return t;
			},
			Err: function Err(e) {
				return unwrap_failed(msg, e);
			}
		});
	},
	unwrap_err: function unwrap_err(self) {
		return (0, _match2.default)(self, {
			Ok: function Ok(t) {
				return unwrap_failed('called `Result::unwrap_err()` on an `Ok` value', t);
			},
			Err: function Err(e) {
				return e;
			}
		});
	}
});

var unwrap_failed = function unwrap_failed(msg, error) {
	(0, _panic2.default)(msg + ': ' + error);
};

exports.Ok = _Ok;
exports.Err = _Err;
exports.Result = Result;
