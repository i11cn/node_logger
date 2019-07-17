import { Loggers } from './loggers';
import { Appender } from './appender';

export interface Logger {
    setName(string): Logger;
    on(): Logger;
    off(): Logger;
    setLevel(number): Logger;
    addAppender(Appender): Logger;
    setTimeLayout(string): Logger;
    setSkipCallstack(n: number): Logger;

    trace(string): void;
    trace(obj: Map<string, any>): void;
    trace(object): void;
    trace(fn: ()=>string ): void;
    trace(...any): void;

    debug(string): void;
    debug(obj: Map<string, any>): void;
    debug(object): void;
    debug(fn: ()=>string ): void;
    debug(...any): void;

    info(string): void;
    info(obj: Map<string, any>): void;
    info(object): void;
    info(fn: ()=>string ): void;
    info(...any): void;

    log(string): void;
    log(obj: Map<string, any>): void;
    log(object): void;
    log(fn: ()=>string ): void;
    log(...any): void;

    warning(string): void;
    warning(obj: Map<string, any>): void;
    warning(object): void;
    warning(fn: ()=>string ): void;
    warning(...any): void;

    error(string): void;
    error(obj: Map<string, any>): void;
    error(object): void;
    error(fn: ()=>string ): void;
    error(...any): void;

    fatal(string): void;
    fatal(obj: Map<string, any>): void;
    fatal(object): void;
    fatal(fn: ()=>string ): void;
    fatal(...any): void;

    todo(string): void;
    todo(obj: Map<string, any>): void;
    todo(fn: ()=>string ): void;
    todo(object): void;
    todo(...any): void;
}

export function LoggerProxy<T extends {new(...args: any[]):{}}>(constructor: T) {
  return class extends constructor {
    todo = function(obj, ...rest): void {
      this.logger.todo(obj, ...rest);
    }
    trace = function(obj, ...rest): void {
      this.logger.trace(obj, ...rest);
    }
    debug = function(obj, ...rest): void {
      this.logger.debug(obj, ...rest);
    }
    info = function(obj, ...rest): void {
      this.logger.info(obj, ...rest);
    }
    log = function(obj, ...rest): void {
      this.logger.log(obj, ...rest);
    }
    warning = function(obj, ...rest): void {
      this.logger.warning(obj, ...rest);
    }
    error = function(obj, ...rest): void {
      this.logger.error(obj, ...rest);
    }
    fatal = function(obj, ...rest): void {
      this.logger.fatal(obj, ...rest);
    }

  };
}

export 
abstract class LoggerWrapper {

  protected logger: Logger;

  constructor(name: string) {
    this.logger = Loggers.getLogger(name);
    this.initLogger(this.logger);
  }

  protected abstract initLogger(log: Logger);

  getLogger(): Logger {
    return this.logger;
  }

  on(): LoggerWrapper {
    this.logger.on();
    return this;
  }
  off(): LoggerWrapper {
    this.logger.off();
    return this;
  }
  setLevel(level: number): LoggerWrapper {
    this.logger.setLevel(level);
    return this;
    
  }
  addAppender(apd: Appender): LoggerWrapper {
    this.logger.addAppender(apd);
    return this;
  }
  setTimeLayout(layout: string): LoggerWrapper {
    this.logger.setTimeLayout(layout);
    return this;
  }
  setSkipCallstack(n: number): LoggerWrapper {
    this.logger.setSkipCallstack(n);
    return this;
  }

  trace(string): void;
  trace(obj: Map<string, any>): void;
  trace(object): void;
  trace(fn: ()=>string ): void;
  trace(...args: any): void {
    this.logger.trace(...args);
  }

  debug(string): void;
  debug(obj: Map<string, any>): void;
  debug(object): void;
  debug(fn: ()=>string ): void;
  debug(...args: any): void {
    this.logger.trace(...args);
  }

  info(string): void;
  info(obj: Map<string, any>): void;
  info(object): void;
  info(fn: ()=>string ): void;
  info(...args: any): void {
    this.logger.trace(...args);
  }

  log(string): void;
  log(obj: Map<string, any>): void;
  log(object): void;
  log(fn: ()=>string ): void;
  log(...args: any): void {
    this.logger.trace(...args);
  }

  warning(string): void;
  warning(obj: Map<string, any>): void;
  warning(object): void;
  warning(fn: ()=>string ): void;
  warning(...args: any): void {
    this.logger.trace(...args);
  }

  error(string): void;
  error(obj: Map<string, any>): void;
  error(object): void;
  error(fn: ()=>string ): void;
  error(...args: any): void {
    this.logger.trace(...args);
  }

  fatal(string): void;
  fatal(obj: Map<string, any>): void;
  fatal(object): void;
  fatal(fn: ()=>string ): void;
  fatal(...args: any): void {
    this.logger.trace(...args);
  }

  todo(string): void;
  todo(obj: Map<string, any>): void;
  todo(fn: ()=>string ): void;
  todo(object): void;
  todo(...args: any): void {
    this.logger.trace(...args);
  }
}
