'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.impl = exports.match = exports.Enum = exports.None = exports.Some = exports.Option = exports.Err = exports.Ok = exports.Result = undefined;

var _enum = require('./enum');

var _enum2 = _interopRequireDefault(_enum);

var _match = require('./match');

var _match2 = _interopRequireDefault(_match);

var _impl = require('./impl');

var _impl2 = _interopRequireDefault(_impl);

var _result = require('./result');

var _option = require('./option');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Result = _result.Result;
exports.Ok = _result.Ok;
exports.Err = _result.Err;
exports.Option = _option.Option;
exports.Some = _option.Some;
exports.None = _option.None;
exports.Enum = _enum2.default;
exports.match = _match2.default;
exports.impl = _impl2.default;
