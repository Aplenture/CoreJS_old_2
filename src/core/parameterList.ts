/**
 * Aplenture/CoreJS
 * https://github.com/Aplenture/CoreJS
 * Copyright (c) 2023 Aplenture
 * MIT License https://github.com/Aplenture/CoreJS/blob/main/LICENSE
 */

import { SerializationOptions, serialize } from "../utils";
import { Parameter } from "./parameter";

export class ParameterList {
    private readonly _parameters: NodeJS.Dict<Parameter<any>> = {};

    constructor(...parameters: Parameter<any>[]) {
        parameters.forEach(param => this.add(param));
    }

    protected get parameters(): NodeJS.ReadOnlyDict<Parameter<any>> { return this._parameters; };

    public has(parameter: string): boolean {
        return !!this.parameters[parameter];
    }

    protected add(parameter: Parameter<any>): boolean {
        if (this.has(parameter.name))
            return false;

        this._parameters[parameter.name] = parameter;

        return true;
    }

    public parse(data: NodeJS.Dict<any> = {}): NodeJS.Dict<any> {
        Object.values(this._parameters).forEach(param => data[param.name] = param.parse(data[param.name]));

        return data;
    }

    public serialize(options?: SerializationOptions): string {
        return serialize(this._parameters, options);
    }

    public toString(): string {
        return Object.values(this._parameters).join('\n') + '\n';
    }
}