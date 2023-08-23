/**
 * Aplenture/CoreJS
 * https://github.com/Aplenture/CoreJS
 * Copyright (c) 2023 Aplenture
 * MIT License https://github.com/Aplenture/CoreJS/blob/main/LICENSE
 */

import { ResponseCode } from "../enums";
import { TextResponse } from "./textResponse";

export class NoContentResponse extends TextResponse {
    constructor() {
        super("", ResponseCode.NoContent);
    }
}

export const RESPONSE_NO_CONTENT = new NoContentResponse();