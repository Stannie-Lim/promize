const status = {
	PENDING: 'PENDING',
	FULFILLED: 'FULFILLED',
	REJECTED: 'REJECTED',
};
class Promize {
	constructor(executor) {
		if (typeof executor !== 'function')
			throw new Error('executor is not a function');

		this.data = null;
		this.status = status.PENDING;
		this.successHandler = null;
		this.errorHandler = null;

		this.resolve = this.resolve.bind(this);
		this.then = this.then.bind(this);
		this.reject = this.reject.bind(this);
		this._createHandler = this._createHandler.bind(this);

		executor(this.resolve, this.reject);
	}

	/*
	 * params: data
	 * returns: void
	 */
	resolve(data) {
		this.status = status.FULFILLED;
		this.data = data;

		if (this.successHandler !== null) {
			const result = this.successHandler.callback(data);
			if (!(result instanceof Promize)) {
				this.successHandler.promise.resolve(result);
			} else {
				result.then((value) => {
					this.successHandler.promise.resolve(value);
				});
			}
		}
	}

	/*
	 * params: error
	 * returns: void
	 */
	reject(err) {
		this.status = status.REJECTED;
		this.value = err;

		if (this.errorHandler !== null) {
			const result = this.errorHandler.callback(err);
			if (!(result instanceof Promize)) {
				this.errorHandler.promise.reject(result);
			} else {
				result.then((value) => {
					this.errorHandler.promise.reject(value);
				});
			}
		}
	}

	/*
	 * params: callback function
	 * returns: promise
	 */
	then(callback) {
		const handler = this._createHandler(callback);
		this.successHandler = handler;
		return handler.promise;
	}

	/*
	 * params: error
	 * returns: void
	 */
	catch(callback) {
		const handler = this._createHandler(callback);
		this.errorHandler = handler;
		return handler.promise;
	}

	_createHandler(callback) {
		const promise = new Promize(() => {});
		const handler = {
			promise,
			callback,
		};

		return handler;
	}
}

module.exports = Promize;
