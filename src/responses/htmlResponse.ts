/**
 * Aplenture/CoreJS
 * https://github.com/Aplenture/CoreJS
 * Copyright (c) 2023 Aplenture
 * MIT License https://github.com/Aplenture/CoreJS/blob/main/LICENSE
 */

import { ResponseCode, ResponseType } from "../enums";
import { Response } from "../core/response";

export class HTMLResponse extends Response {
    constructor(text: string, code = ResponseCode.OK) {
        super(text, ResponseType.HTML, code);
    }
}