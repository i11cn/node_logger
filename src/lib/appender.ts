import { format } from 'date-fns';
import { LogData } from './loginfo';

export abstract class Appender {

    protected layout: string;
    protected ts_layout: string;
    private getter: ((LogData, string)=>string)[];

    constructor() {
        this.layout = null;
        this.ts_layout = null;
        this.getter = [];
    }

    private parseLayout(): void {
        if(this.layout != "") {
            let esc = false;
            let part = "";
            let get_part = function(m: string): ((d: LogData, s: string)=> string) {
                return function(d: LogData, s: string): string {
                    return m;
                }
            }
            let add_func = (fn: (LogData, string)=> string) => {
                if(part != "") {
                    this.getter.push(get_part(part));
                    part = "";
                }
                this.getter.push(fn);
            }
            for(let ch of this.layout) {
                if(esc) {
                    switch(ch) {
                    case 'T':
                        add_func(function (d: LogData, s: string): string {
                            return format(d.now, d.ts_layout);
                        })
                        break;

                    case 'N':
                        add_func(function (d: LogData, s: string): string {
                            return d.name;
                        })
                        break;

                    case 'L':
                        add_func(function (d: LogData, s: string): string {
                            return d.level;
                        })
                        break;

                    case 'f':
                        add_func(function (d: LogData, s: string): string {
                            return d.func;
                        })
                        break;

                    case 'M':
                        add_func(function (d: LogData, s: string): string {
                            return s;
                        })
                        break;

                    default:
                        part += ch;
                    }
                    esc = false;
                } else {
                    if(ch == '%') {
                        esc = true
                    } else {
                        part += ch;
                    }
                }
            }
            if(part != "") {
                this.getter.push(get_part(part));
                part = "";
            }
        }
    }

    mapToObj(obj: Map<string, any>): any {
        let ret = {};
        obj.forEach((v, k)=> {
            ret[k] = v;
        })
        return ret;
    }

    setLayout(layout: string): Appender {
        this.layout = layout;
        this.parseLayout();
        return this;
    }

    setTimeLayout(layout: string): Appender {
        this.ts_layout = layout;
        return this;
    }

    protected ready(): boolean {
        return true;
    }

    protected buildMsg(d: LogData, m: string): string {
        let ret = ""
        if(this.ts_layout != null) {
            d.ts_layout = this.ts_layout;
        }
        for(let index in this.getter) {
            ret += this.getter[index](d, m);
        }
        return ret;
    }

    output(d: LogData, obj: string): void;
    output(d: LogData, obj: Map<string, any>): void;
    output(d: LogData, obj: object): void;
    output(d: LogData, obj): void {
        if(typeof obj == "string") {
            this.write(this.buildMsg(d, obj));
        } else if(typeof obj == "object") {
            if(obj instanceof Array) {
                let msg = obj.join("");
                this.write(this.buildMsg(d, msg));
            } else if(obj instanceof Map) {
                let msg = JSON.stringify(this.mapToObj(obj));
                this.write(this.buildMsg(d, msg));
            }
        }
    }

    protected write(msg: string): void {}

}
