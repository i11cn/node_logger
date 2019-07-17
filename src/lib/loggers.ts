import { Logger } from './logger';
import { LoggerImpl } from './logger-impl';

export class Loggers {
	private static readonly loggers: Map<string, Logger> = new Map<string, Logger>();

    private constructor() {
	}

	static getLogger(name: string): Logger {
		if(!Loggers.loggers.has(name)) {
			let logger = new LoggerImpl(name);
			Loggers.loggers.set(name, logger);
		}
		return Loggers.loggers.get(name);
	}
}
