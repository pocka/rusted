"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var Trait = function Trait() {};

var factory = function factory(block) {
	var trait = new Trait();

	for (var name in block) {
		Object.defineProperty(trait, name, {
			value: block[name],
			enumerable: true,
			writable: false,
			configurable: false
		});
	}

	return trait;
};

exports.default = factory;
exports.Trait = Trait;
