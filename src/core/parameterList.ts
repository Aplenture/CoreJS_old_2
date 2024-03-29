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

    public get parameters(): NodeJS.ReadOnlyDict<Parameter<any>> { return this._parameters; };

    public has(parameter: string): boolean {
        return !!this._parameters[parameter];
    }

    protected add(parameter: Parameter<any>): boolean {
        if (this.has(parameter.name))
            return false;

        this._parameters[parameter.name] = parameter;

        return true;
    }

    public parse(input: NodeJS.ReadOnlyDict<any> = {}, output: NodeJS.Dict<any> = {}): NodeJS.Dict<any> {
        Object.values(this._parameters).forEach(param => output[param.name] = param.parse(input[param.name]));

        return output;
    }

    public filter(input: NodeJS.ReadOnlyDict<any> = {}, output: NodeJS.Dict<any> = {}): NodeJS.Dict<any> {
        Object.values(this._parameters).forEach(param => input[param.name] !== undefined && (output[param.name] = input[param.name]));

        return output;
    }

    public toString() {
        return Object.values(this._parameters).join('\n') + '\n';
    }

    public toJSON() {
        return this.parameters;
    }
}