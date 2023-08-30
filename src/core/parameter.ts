/**
 * Aplenture/CoreJS
 * https://github.com/Aplenture/CoreJS
 * Copyright (c) 2023 Aplenture
 * MIT License https://github.com/Aplenture/CoreJS/blob/main/LICENSE
 */

import { CoreErrorCode } from "../enums";
import { CoreError } from "./coreError";

export abstract class Parameter<T> {
    public abstract readonly type: string;
    protected abstract readonly parser: (data: any) => T;

    public readonly optional: boolean;

    constructor(
        public readonly name: string,
        public readonly description: string,
        public readonly def?: T
    ) {
        this.optional = undefined !== def;
    }

    public parse(data: any): T {
        const result = this.parser(data);

        if (undefined == result)
            if (this.optional)
                return this.def;
            else
                throw new CoreError(CoreErrorCode.MissingParameter, { name: this.name, type: this.type });

        return result;
    }

    public toString() {
        return `${this.name} (${this.type}${this.optional ? ', optional' : ''}) - ${this.description || ''}`;
    }

    public toJSON() {
        return {
            name: this.name,
            type: this.type,
            description: this.description,
            optional: this.optional,
            default: this.def
        };
    }
}