import glogg from 'glogg';
import setupLogger from '../logger';

const logger = glogg('rsg');
afterEach(() => {
	logger.removeAllListeners();
});

test('should setup custom logger function', () => {
	const info = jest.fn();
	const message = 'pizza';
	setupLogger({ info }, false);
	logger.info(message);
	expect(info).toBeCalledWith(message);
});

test('should setup debug logger in verbose mode', () => {
	const debug = jest.fn();
	const message = 'pizza';
	setupLogger({ debug }, true);
	logger.debug(message);
	expect(debug).toBeCalledWith(message);
});

test('should not setup debug logger in non-verbose mode', () => {
	const debug = jest.fn();
	const message = 'pizza';
	setupLogger({ debug }, false);
	logger.debug(message);
	expect(debug).toHaveBeenCalledTimes(0);
});

test('should accept default loggers', () => {
	const info = jest.fn();
	const message = 'pizza';
	setupLogger(undefined, false, { info });
	logger.info(message);
	expect(info).toBeCalledWith(message);
});

test('default loggers are printed in correct stream', () => {
	let consSpy = jest.spyOn(console, 'log');
	setupLogger({}, true);
	logger.info('Info message');

	logger.debug('Debug message');
	expect(consSpy).toHaveBeenCalledTimes(2);

	consSpy = jest.spyOn(console, 'warn');

	logger.warn('Warning message');
	expect(consSpy).toHaveBeenCalled();
});
