/**
 * Aplenture/CoreJS
 * https://github.com/Aplenture/CoreJS
 * Copyright (c) 2023 Aplenture
 * MIT License https://github.com/Aplenture/CoreJS/blob/main/LICENSE
 */

import { SerializationType } from "../enums/serializationType";
import { parseArgsFromString, parseArgsToString } from "./text";

export interface SerializationOptions {
    readonly space?: number;
}

export function serialize(data: any, type?: SerializationType, options: SerializationOptions = {}): string {
    if (typeof data === 'string' || data instanceof String)
        return data as string;

    switch (type) {
        case SerializationType.Args:
            return parseArgsToString(data);

        case SerializationType.JSON:
            return JSON.stringify(data, null, options.space);

        default:
            return data.toString();
    }
}

export function deserialize(data: any): NodeJS.Dict<any> {
    if (typeof data === 'string' || data instanceof String) {
        try {
            return JSON.parse(data as string);
        } catch (error) {
            return parseArgsFromString(data as string);;
        }
    }

    const result = {};

    for (const key in data)
        result[key] = data[key];

    return result;
}