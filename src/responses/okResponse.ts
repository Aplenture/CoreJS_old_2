/**
 * Aplenture/CoreJS
 * https://github.com/Aplenture/CoreJS
 * Copyright (c) 2023 Aplenture
 * MIT License https://github.com/Aplenture/CoreJS/blob/main/LICENSE
 */

import { BoolResponse } from "./boolResponse";

export class OKResponse extends BoolResponse {
    constructor() {
        super(true);
    }
}

export const RESPONSE_OK = new OKResponse();