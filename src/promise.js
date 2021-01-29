const basicPromise = new Promise((res) => res('basicPromise'));

const funcPromise = () => new Promise((res) => res('funcPromise'));

const chainedPromise = (prom) => new Promise((res) => res()).then(prom);

const rejectedPromise = () =>
	new Promise((res, rej) => rej(new Error('rejectedPromise')));

module.exports = { basicPromise, chainedPromise, rejectedPromise, funcPromise };
