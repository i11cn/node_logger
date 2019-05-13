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
