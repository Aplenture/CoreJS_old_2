/**
 * Aplenture/CoreJS
 * https://github.com/Aplenture/CoreJS
 * Copyright (c) 2023 Aplenture
 * MIT License https://github.com/Aplenture/CoreJS/blob/main/LICENSE
 */

import { ResponseCode } from "../enums";
import { TextResponse } from "./textResponse";

export class ErrorResponse extends TextResponse {
    constructor(code: ResponseCode, message = '') {
        super(message, code);
    }
}