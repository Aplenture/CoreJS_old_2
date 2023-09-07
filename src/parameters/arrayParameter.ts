/**
 * Aplenture/CoreJS
 * https://github.com/Aplenture/CoreJS
 * Copyright (c) 2023 Aplenture
 * MIT License https://github.com/Aplenture/CoreJS/blob/main/LICENSE
 */

import { Parameter } from "../core/parameter";

export class ArrayParameter<T> extends Parameter<T[]> {
    public readonly type = this.parameter.type + ' array';

    constructor(
        name: string,
        description: string,
        public readonly parameter: Parameter<T>,
        def?: T[]
    ) {
        super(name, description, def);
    }

    protected readonly parser = (data: any): T[] => {
        if (undefined === data)
            return undefined;

        return Array.isArray(data)
            ? data.map(data => this.parameter.parse(data))
            : [this.parameter.parse(data)];
    };
}