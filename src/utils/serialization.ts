/**
 * Aplenture/CoreJS
 * https://github.com/Aplenture/CoreJS
 * Copyright (c) 2023 Aplenture
 * MIT License https://github.com/Aplenture/CoreJS/blob/main/LICENSE
 */

import * as BigMath from "./bigMath";

export function fromHex(value: string): string[] {
    const byteLength = 2;
    const count = parseInt(value.slice(0, byteLength), 16);

    const result = new Array<string>(count);

    for (let i = 0, j = byteLength, length; i < count; ++i, j += byteLength + length) {
        length = parseInt(value.slice(j, j + byteLength), 16);

        result[i] = value.slice(j + byteLength, j + length + byteLength);
    }

    return result;
}

export function toHex(data: readonly string[]): string {
    const byteLength = 2;
    const count = data.length;

    let result = BigMath.toHex(count, byteLength);

    for (let i = 0; i < count; ++i) {
        result += BigMath.toHex(undefined == data[i] ? '' : data[i].length, byteLength);
        result += data[i];
    }

    return result;
}