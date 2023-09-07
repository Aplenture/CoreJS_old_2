/**
 * Aplenture/CoreJS
 * https://github.com/Aplenture/CoreJS
 * Copyright (c) 2023 Aplenture
 * MIT License https://github.com/Aplenture/CoreJS/blob/main/LICENSE
 */

import { Parameter } from "../core/parameter";
import { parseToString } from "../utils";

export class StringParameter extends Parameter<string> {
    public readonly type = 'string';
    protected readonly parser = parseToString;
}