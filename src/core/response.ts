/**
 * Aplenture/CoreJS
 * https://github.com/Aplenture/CoreJS
 * Copyright (c) 2023 Aplenture
 * MIT License https://github.com/Aplenture/CoreJS/blob/main/LICENSE
 */

import { ResponseCode, ResponseType } from "../enums";

export class Response {
    constructor(
        public readonly data: string,
        public readonly type: ResponseType,
        public readonly code: ResponseCode
    ) { }

    public static fromString(value: string): Response {
        const data = JSON.parse(value);

        return new Response(
            data.data,
            data.type,
            data.code
        );
    }

    public toString(): string {
        return JSON.stringify(this);
    }
}