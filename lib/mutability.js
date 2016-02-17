"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Mutability = Mutability;
exports.mut = mut;
exports.imm = imm;
function Mutability(data, mut) {
	Object.defineProperties(this, {
		mutable: {
			value: mut,
			writable: false,
			configurable: false,
			enumerable: true
		},
		data: {
			value: data,
			writable: false,
			configurable: false,
			enumerable: true
		}
	});
}

function mut(data) {
	return new Mutability(data, true);
}

function imm(data) {
	return new Mutability(data, false);
}
