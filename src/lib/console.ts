import { Appender } from './appender';

export class Console extends Appender {
    constructor() {
        super();
    }

    protected write(msg: string): void {
        console.log(msg);
    }
}
