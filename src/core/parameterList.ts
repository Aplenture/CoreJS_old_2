/**
 * Aplenture/CoreJS
 * https://github.com/Aplenture/CoreJS
 * Copyright (c) 2023 Aplenture
 * MIT License https://github.com/Aplenture/CoreJS/blob/main/LICENSE
 */

import { Parameter } from "./parameter";

export class ParameterList {
    private readonly _parameters: NodeJS.Dict<Parameter<any>> = {};

    constructor(...parameters: Parameter<any>[]) {
        parameters.forEach(param => this.add(param));
    }

    protected get parameters(): NodeJS.ReadOnlyDict<Parameter<any>> { return this._parameters; };

    public get description(): string {
        const params = Object.values(this._parameters);

        if (0 == params.length)
            return '';

        return params
            .map(param => `${param.name}${param.optional ? ' (optional)' : ''} - ${param.description || ''}`)
            .join('\n') + '\n';
    }

    public has(parameter: string): boolean {
        return !!this.parameters[parameter];
    }

    protected add(parameter: Parameter<any>): boolean {
        if (this.has(parameter.name))
            return false;

        this._parameters[parameter.name] = parameter;

        return true;
    }

    public parse<T extends NodeJS.Dict<any>>(data: NodeJS.ReadOnlyDict<any> = {}): T {
        const result = {};

        Object.values(this._parameters).forEach(param => result[param.name] = param.parse(data[param.name]));

        return result as T;
    }
}