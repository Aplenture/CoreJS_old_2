/**
 * Aplenture/CoreJS
 * https://github.com/Aplenture/CoreJS
 * Copyright (c) 2023 Aplenture
 * MIT License https://github.com/Aplenture/CoreJS/blob/main/LICENSE
 */

import { NumberParameter, StringParameter } from "../parameters";
import { Command } from "./command";
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

    protected get data(): NodeJS.ReadOnlyDict<any> { return this._data; };

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

        this.onChange.emit(this, null);
    }

    public add(parameter: Parameter<any>, onChange?: EventHandler<Config, string>, listener?: any): boolean {
        if (onChange)
            this.onChange.on(onChange, { sender: this, args: parameter.name, listener });

        if (!super.add(parameter))
            return false;

        this._data[parameter.name] = parameter.def;
        this.onChange.emit(this, parameter.name);

        return true;
    }

    public write(data: NodeJS.Dict<any> = {}): NodeJS.Dict<any> {
        Object.values(this.parameters).forEach(param => data[param.name] = param.parse(this._data[param.name] ?? null));

        return data;
    }

    public createCommands(): Command<string>[] {
        return [{
            name: 'config.get',
            execute: async args => this.get(args.key).toString(),
            description: 'returns a config parameter value',
            parameters: new ParameterList(
                new StringParameter('key', 'config parameter name')
            )
        }, {
            name: 'config.set',
            description: 'sets a config parameter value',
            parameters: new ParameterList(
                new StringParameter('key', 'Config parameter name.'),
                new Parameter('value', 'Config parameter value.')
            ),
            execute: async args => {
                this.set(args.key, args.value);

                return `${args.key} set to '${this.get(args.key)}'`;
            }
        }, {
            name: 'config.serialize',
            description: "returns the serialized config",
            parameters: new ParameterList(
                new NumberParameter('space', 'serialization option space', 4)
            ),
            execute: async args => JSON.stringify(this, null, args.space)
        }];
    }

    public deserialize(data: any): void {
        if (typeof data == 'string')
            return this.deserialize(JSON.parse(data));

        for (const key in data)
            if (this.has(key))
                this.set(key, data[key]);

        this.onChange.emit(this, null);
    }

    public toString() {
        return Object.keys(this._data).map(key => `${key} - ${JSON.stringify(this._data[key])}`).join('\n');
    }

    public toJSON() {
        return this.data;
    }
}