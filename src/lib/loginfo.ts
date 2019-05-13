export class LogData {
    name: string;
    now: Date;
    level: string;
    ts_layout: string;
    func: string;
}

export enum LogLevel {
    ALL = 0,
    TRACE = 10,
    DEBUG = 20,
    INFO  = 30,
    LOG   = 40,
    WARN  = 50,
    ERROR = 60,
    FATAL = 70,
    NONE  = 100
}
