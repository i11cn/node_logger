import { Logger } from './logger';
import { LoggerImpl } from './logger-impl';

export class Loggers {
	private loggers: Map<string, Logger>;

    constructor() {
		this.loggers = new Map<string, Logger>();
	}

	getLogger(name: string): Logger {
		if(!this.loggers.has(name)) {
			let logger = new LoggerImpl(name);
			this.loggers.set(name, logger);
		}
		return this.loggers.get(name);
	}
}
