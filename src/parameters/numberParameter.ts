/**
 * Aplenture/CoreJS
 * https://github.com/Aplenture/CoreJS
 * Copyright (c) 2023 Aplenture
 * MIT License https://github.com/Aplenture/CoreJS/blob/main/LICENSE
 */

import { Parameter } from "../core/parameter";
import { parseToNumber } from "../utils";

export class NumberParameter extends Parameter<number> {
    public readonly type = 'number';
    protected readonly parser = parseToNumber;
} 