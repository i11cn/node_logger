import { Appender } from './appender';
import { Logger } from './logger';
import { LogLevel, LogData } from './loginfo';

export class LoggerImpl {

    private appenders: Appender[];
    private name: string;
    private level: number;
    private ts_layout: string;
    private enable: boolean;
    private data: LogData;
    private skip_cs: number;

    constructor(name: string) {
        this.data = new LogData();
        this.appenders = [];
        this.setName(name);
        this.setLevel(LogLevel.ERROR);
        this.on();
        this.setTimeLayout("YYYY-MM-DD HH:mm:ss.SSS");
        this.skip_cs = 0;
    }

    setName(name: string): Logger {
        this.name = name;
        this.data.name = name;
        return this;
    }

    on(): Logger {
        this.enable = true
        return this;
    }
    
    off(): Logger {
        this.enable = false
        return this;
    }

    setLevel(level: number): Logger {
        this.level = level;
        return this;
    }

    addAppender(a: Appender): Logger{
        this.appenders.push(a)
        return this;
    }

    setTimeLayout(layout: string): Logger {
        this.ts_layout = layout;
        this.data.ts_layout = layout;
        return this;
    }

    setSkipCallstack(n: number): Logger {
        this.skip_cs = n;
        return this;
    }

    private getCaller(): string {
        try { throw new Error(); }
        catch(e) {
            let callers = e.stack.split("\n");
            let caller = callers[4 + this.skip_cs];
            let re = new RegExp("\\s+(@|at) (.+) \\((.+):(\\d+)\\)", "g");
            let m = re.exec(caller);
            return m[2];
        }
    }

    private write(level: string, obj: string): void;
    private write(level: string, obj: Map<string, any>): void;
    private write(level: string, obj: object): void;
    private write(level: string, obj: ()=> string): void;
    private write(level: string, ...obj: any[]): void;
    private write(level: string, obj, ...rest): void {
        if(!this.enable) {
            return;
        }
        this.data.now = new Date();
        this.data.level = level;
        this.data.func = this.getCaller();
        if(rest.length > 0) {
            let msg = obj.toString() + rest.join("");
            for(let a of this.appenders) {
                a.output(this.data, msg);
            }
        } else if(typeof obj === "string" || typeof obj === "object") {
            for(let a of this.appenders) {
                a.output(this.data, obj);
            }
        } else if(typeof obj === "function") {
            let fn = <()=>string>(obj);
            let msg = fn();
            for(let a of this.appenders) {
                a.output(this.data, msg);
            }
        }
    }

    todo(obj, ...rest): void {
        this.write("TODO", obj, ...rest);
    }

    trace(obj, ...rest): void {
        if(this.level <= LogLevel.TRACE) {
            this.write("TRACE", obj, ...rest);
        }
    }

    debug(obj, ...rest): void {
        if(this.level <= LogLevel.DEBUG) {
            this.write("DEBUG", obj, ...rest);
        }
    }

    info(obj, ...rest): void {
        if(this.level <= LogLevel.INFO) {
            this.write("INFO", obj, ...rest);
        }
    }

    log(obj, ...rest): void {
        if(this.level <= LogLevel.LOG) {
            this.write("LOG", obj, ...rest);
        }
    }

    warning(obj, ...rest): void {
        if(this.level <= LogLevel.WARN) {
            this.write("WARNING", obj, ...rest);
        }
    }

    error(obj, ...rest): void {
        if(this.level <= LogLevel.ERROR) {
            this.write("ERROR", obj, ...rest);
        }
    }

    fatal(obj, ...rest): void {
        if(this.level <= LogLevel.FATAL) {
            this.write("FATAL", obj, ...rest);
        }
    }

}
