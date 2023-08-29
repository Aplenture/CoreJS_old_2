/**
 * Aplenture/CoreJS
 * https://github.com/Aplenture/CoreJS
 * Copyright (c) 2023 Aplenture
 * MIT License https://github.com/Aplenture/CoreJS/blob/main/LICENSE
 */

import { SerializationType } from "../enums";
import { SerializationOptions, deserialize, serialize } from "../utils";
import { Event, EventHandler } from "./event";
import { Parameter } from "./parameter";
import { ParameterList } from "./parameterList";

export class Config extends ParameterList {
    public readonly onChange = new Event<Config, string>('Config.onChange');

    private readonly _data: NodeJS.Dict<any> = {};

    constructor(...parameters: Parameter<any>[]) {
        super();

        parameters.forEach(param => this.add(param));
    }

    protected get data(): NodeJS.ReadOnlyDict<Parameter<any>> { return this._data; };

    public get<T>(key: string): T {
        if (!this.has(key))
            throw new Error(`unknown parameter '${key}'`);

        return this._data[key];
    }

    public set(key: string, value: any): boolean {
        const parameter = this.parameters[key];

        if (!parameter)
            throw new Error(`unknown parameter '${key}'`);

        const parsedValue = parameter.parse(value);

        if (this._data[key] === parsedValue)
            return false;

        this._data[key] = parsedValue;
        this.onChange.emit(this, key);

        return true;
    }

    public reset(...parameters: string[]) {
        if (parameters.length)
            parameters.forEach(key => this.set(key, this.parameters[key] && this.parameters[key].def));
        else
            Object.values(this.parameters).forEach(param => this.set(param.name, param.def));
    }

    public add(parameter: Parameter<any>, onChange?: EventHandler<Config, string>, listener?: any): boolean {
        if (onChange)
            this.onChange.on(onChange, { sender: this, args: parameter.name, listener });

        if (!super.add(parameter))
            return false;

        this._data[parameter.name] = parameter.def;

        return true;
    }

    public write(data: NodeJS.Dict<any> = {}): NodeJS.Dict<any> {
        Object.values(this.parameters).forEach(param => data[param.name] = param.parse(this._data[param.name]));

        return data;
    }

    public serialize(options?: SerializationOptions): string {
        return serialize(this._data, options);
    }

    public deserialize(data: any) {
        const deserializedData = deserialize(data);

        for (const key in deserializedData)
            if (this.has(key))
                this.set(key, deserializedData[key]);
    }
}