/**
 * Aplenture/CoreJS
 * https://github.com/Aplenture/CoreJS
 * Copyright (c) 2023 Aplenture
 * MIT License https://github.com/Aplenture/CoreJS/blob/main/LICENSE
 */

import { Parameter } from "../core/parameter";

export class DictionaryParameter<T> extends Parameter<T> {
    public readonly type = 'dictionary';
    public readonly parameters: Parameter<any>[];

    constructor(
        name: string,
        description: string,
        parameters: readonly Parameter<any>[] = [],
        def?: T
    ) {
        super(name, description, def);

        this.parameters = Object.assign([], parameters);
    }

    protected readonly parser = (data: any): T => {
        if (undefined === data)
            return undefined;

        if (0 == this.parameters.length)
            return data;

        const result = {};

        this.parameters.forEach(param => result[param.name] = param.parse(data[param.name]));

        return result as T;
    };
}