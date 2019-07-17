import { Appender } from './appender';

export class Console extends Appender {
    constructor(layout?: string) {
        super(layout);
    }

    protected write(msg: string): void {
        console.log(msg);
    }
}
