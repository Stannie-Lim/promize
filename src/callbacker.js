const syncCallbacker = (arg1, arg2, ...args) => {
	if (typeof arg1 !== 'function' || typeof arg2 !== 'function') {
		throw 'arguments are not functions';
	}

	if (arguments.length < 2) {
		throw 'not enough arguments';
	}

	return arg2(arg1());
};

const asyncCallbacker = (arg1, arg2, ...args) => {
	if (typeof arg1 !== 'function' || typeof arg2 !== 'function') {
		throw 'arguments are not functions';
	}

	if (arguments.length < 2) {
		throw 'not enough arguments';
	}

	const callbacks = [arg1, arg2, ...args];

	let calls = 0;
	const done = (data) => {
		calls++;

		if (callbacks.length < calls) return;

		callbacks[calls](data, done);
	};

	arg1(null, done);
};

module.exports = { syncCallbacker, asyncCallbacker };
