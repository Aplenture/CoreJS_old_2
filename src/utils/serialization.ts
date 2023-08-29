/**
 * Aplenture/CoreJS
 * https://github.com/Aplenture/CoreJS
 * Copyright (c) 2023 Aplenture
 * MIT License https://github.com/Aplenture/CoreJS/blob/main/LICENSE
 */

import { SerializationType } from "../enums/serializationType";
import { parseArgsFromString, parseArgsToString } from "./text";

export interface SerializationOptions {
    readonly type?: SerializationType;
    readonly space?: number;
}

export function serialize(data: any, options: SerializationOptions = {}): string {
    if (typeof data === 'string' || data instanceof String)
        return data as string;

    switch (options.type) {
        case SerializationType.Args:
            return parseArgsToString(data);

        case SerializationType.JSON: {
            const result = {};

            for (const key in data)
                if (typeof data[key] != 'function')
                    if (typeof data[key] == 'object' && typeof data[key].serialize == 'function')
                        result[key] = data[key].serialize(options);
                    else
                        result[key] = data[key];

            return JSON.stringify(result, null, options.space);
        }

        default:
            return data.toString();
    }
}

export function deserialize(data: any): any {
    switch (typeof data) {
        case 'string':
            if (0 == data.indexOf('--'))
                return parseArgsFromString(data as string);

            try {
                data = JSON.parse(data as string);
            } catch (error) {
                return data;
            }

        case 'object':
            for (const key in data)
                data[key] = deserialize(data[key]);

            return data;

        default:
            return data;
    }
}