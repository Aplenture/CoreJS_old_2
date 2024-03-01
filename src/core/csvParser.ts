import { ResponseType } from "../enums";
import { File } from "../interfaces";

const DEFAULT_SEPERATOR = ';';
const DEFAULT_LINEBREAK = '\r\n';

interface Options {
    readonly extension?: string;
    readonly seperator?: string;
    readonly linebreak?: string;
}

interface Serializable {
    readonly toString: () => string,
}

export class CSVParser implements File {
    public readonly extension: string;
    public readonly type = ResponseType.CSV;
    public readonly charset = 'utf-8';
    public readonly bom = '%EF%BB%BF';

    public seperator: string;
    public linebreak: string;

    private rows: Array<ReadonlyArray<Serializable>>;

    constructor(public readonly name: string, options: Options = {}) {
        this.extension = options.extension ?? "csv";
        this.seperator = options.seperator ?? DEFAULT_SEPERATOR;
        this.linebreak = options.linebreak ?? DEFAULT_LINEBREAK;

        this.clear();
    }

    public add(...rows: Serializable[][]) {
        rows.forEach(row => this.rows.push(row));
    }

    public insert(index = 0, ...rows: Serializable[][]) {
        this.rows.splice(index, 0, ...rows);
    }

    public remove(index = 0, count = 1) {
        this.rows.splice(index, count);
    }

    public replace(index = 0, ...rows: Serializable[][]) {
        this.rows.splice(index, rows.length, ...rows);
    }

    public print(): string {
        return this.rows
            .map(row => row.join(this.seperator))
            .join(this.linebreak);
    }

    public clear() {
        this.rows = [];
    }

    public toString(): string {
        return this.print();
    }
}