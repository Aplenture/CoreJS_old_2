/**
 * Aplenture/CoreJS
 * https://github.com/Aplenture/CoreJS
 * Copyright (c) 2023 Aplenture
 * MIT License https://github.com/Aplenture/CoreJS/blob/main/LICENSE
 */

import { TextResponse } from "./textResponse";

export class BoolResponse extends TextResponse {
    constructor(value: boolean) {
        super(value ? "1" : "0");
    }
}